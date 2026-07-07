const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs').promises
const pool = require('../config/db')

const uploadDir = path.join(__dirname, '../uploads')
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase()
    cb(null, `${base}-${Date.now()}${ext}`)
  }
})
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

const sendError = (res, err) => {
  console.error(err)
  return res.status(500).json({ error: 'Server error' })
}

const savePostTerms = async (postId, termIds) => {
  if (!Array.isArray(termIds)) return
  await pool.query('DELETE FROM term_relationships WHERE object_id = ?', [postId])
  if (!termIds.length) return
  const promises = termIds.map(termId => pool.query('INSERT IGNORE INTO term_relationships (object_id, term_id) VALUES (?, ?)', [postId, termId]))
  await Promise.all(promises)
}

const getTermIds = async objectId => {
  const [rows] = await pool.query('SELECT term_id FROM term_relationships WHERE object_id = ?', [objectId])
  return rows.map(r => r.term_id)
}

router.get('/dashboard', async (req, res) => {
  try {
    const [[{ posts }], [{ pages }], [{ media }], [{ users }]] = await Promise.all([
      pool.query('SELECT COUNT(*) as posts FROM posts WHERE type = ? AND status = ?', ['post', 'published']),
      pool.query('SELECT COUNT(*) as pages FROM posts WHERE type = ? AND status = ?', ['page', 'published']),
      pool.query('SELECT COUNT(*) as media FROM media'),
      pool.query('SELECT COUNT(*) as users FROM users')
    ])

    res.json({ posts, pages, media, users })
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/posts', async (req, res) => {
  try {
    const { type, status, search, page = 1, per_page = 20 } = req.query
    const filters = []
    const params = []

    if (type) { filters.push('type = ?'); params.push(type) }
    if (status) { filters.push('status = ?'); params.push(status) }
    if (search) { filters.push('(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`) }

    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
    const limit = Math.min(100, Number(per_page) || 20)
    const offset = (Math.max(Number(page) || 1, 1) - 1) * limit

    const [rows] = await pool.query(
      `SELECT * FROM posts ${where} ORDER BY menu_order DESC, published_at DESC, created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    )

    const results = await Promise.all(rows.map(async post => ({ ...post, term_ids: await getTermIds(post.id) })))
    res.json(results)
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/posts/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id])
    if (!rows.length) return res.status(404).json({ error: 'Post not found' })
    const post = rows[0]
    post.term_ids = await getTermIds(post.id)
    res.json(post)
  } catch (err) {
    sendError(res, err)
  }
})

router.post('/posts', async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      type = 'page',
      status = 'draft',
      author_id,
      featured_image,
      active = 1,
      menu_order = 0,
      published_at,
      term_ids = []
    } = req.body

    if (!title) return res.status(400).json({ error: 'Title is required' })
    const finalSlug = slug ? slug.trim().toLowerCase().replace(/\s+/g, '-') : title.trim().toLowerCase().replace(/\s+/g, '-')
    const [existing] = await pool.query('SELECT id FROM posts WHERE slug = ?', [finalSlug])
    if (existing.length) return res.status(400).json({ error: 'Slug already exists' })

    const [result] = await pool.query(
      `INSERT INTO posts (title, slug, excerpt, content, type, status, author_id, featured_image, active, menu_order, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, finalSlug, excerpt || null, content || null, type, status, author_id || null, featured_image || null, active, menu_order, published_at || null]
    )

    await savePostTerms(result.insertId, term_ids)
    const [row] = await pool.query('SELECT * FROM posts WHERE id = ?', [result.insertId])
    const post = row[0]
    post.term_ids = await getTermIds(post.id)
    res.status(201).json(post)
  } catch (err) {
    sendError(res, err)
  }
})

router.put('/posts/:id', async (req, res) => {
  try {
    const fields = [
      'title', 'slug', 'excerpt', 'content', 'type', 'status', 'author_id', 'featured_image', 'active', 'menu_order', 'published_at'
    ]
    const updates = {}
    for (const field of fields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field]
    }

    if (updates.slug) updates.slug = updates.slug.trim().toLowerCase().replace(/\s+/g, '-')
    if (!Object.keys(updates).length && req.body.term_ids === undefined) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    if (updates.slug) {
      const [existing] = await pool.query('SELECT id FROM posts WHERE slug = ? AND id != ?', [updates.slug, req.params.id])
      if (existing.length) return res.status(400).json({ error: 'Slug already exists' })
    }

    if (Object.keys(updates).length) {
      const set = Object.keys(updates).map(key => `${key} = ?`).join(', ')
      await pool.query(`UPDATE posts SET ${set} WHERE id = ?`, [...Object.values(updates), req.params.id])
    }

    if (Array.isArray(req.body.term_ids)) {
      await savePostTerms(req.params.id, req.body.term_ids)
    }

    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id])
    if (!rows.length) return res.status(404).json({ error: 'Post not found' })
    const post = rows[0]
    post.term_ids = await getTermIds(post.id)
    res.json(post)
  } catch (err) {
    sendError(res, err)
  }
})

router.delete('/posts/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM posts WHERE id = ?', [req.params.id])
    await pool.query('DELETE FROM term_relationships WHERE object_id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/terms', async (req, res) => {
  try {
    const { taxonomy, active } = req.query
    const filters = []
    const params = []
    if (taxonomy) { filters.push('taxonomy = ?'); params.push(taxonomy) }
    if (active !== undefined) { filters.push('active = ?'); params.push(active ? 1 : 0) }

    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
    const [rows] = await pool.query(`SELECT * FROM terms ${where} ORDER BY sort_order ASC, name ASC`, params)
    res.json(rows)
  } catch (err) {
    sendError(res, err)
  }
})

router.post('/terms', async (req, res) => {
  try {
    const { name, slug, description, taxonomy = 'category', parent = 0, active = 1, sort_order = 0 } = req.body
    if (!name) return res.status(400).json({ error: 'Name is required' })
    const finalSlug = slug ? slug.trim().toLowerCase().replace(/\s+/g, '-') : name.trim().toLowerCase().replace(/\s+/g, '-')
    const [existing] = await pool.query('SELECT id FROM terms WHERE slug = ? AND taxonomy = ?', [finalSlug, taxonomy])
    if (existing.length) return res.status(400).json({ error: 'Term slug already exists' })

    const [result] = await pool.query(
      `INSERT INTO terms (name, slug, description, taxonomy, parent, active, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, finalSlug, description || null, taxonomy, parent || 0, active, sort_order]
    )
    const [rows] = await pool.query('SELECT * FROM terms WHERE id = ?', [result.insertId])
    res.status(201).json(rows[0])
  } catch (err) {
    sendError(res, err)
  }
})

router.put('/terms/:id', async (req, res) => {
  try {
    const fields = ['name', 'slug', 'description', 'taxonomy', 'parent', 'active', 'sort_order']
    const updates = {}
    for (const field of fields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field]
    }
    if (!Object.keys(updates).length) return res.status(400).json({ error: 'No fields to update' })

    if (updates.slug) updates.slug = updates.slug.trim().toLowerCase().replace(/\s+/g, '-')
    if (updates.slug) {
      const [existing] = await pool.query('SELECT id FROM terms WHERE slug = ? AND id != ?', [updates.slug, req.params.id])
      if (existing.length) return res.status(400).json({ error: 'Term slug already exists' })
    }

    const set = Object.keys(updates).map(key => `${key} = ?`).join(', ')
    await pool.query(`UPDATE terms SET ${set} WHERE id = ?`, [...Object.values(updates), req.params.id])
    const [rows] = await pool.query('SELECT * FROM terms WHERE id = ?', [req.params.id])
    res.json(rows[0])
  } catch (err) {
    sendError(res, err)
  }
})

router.delete('/terms/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM term_relationships WHERE term_id = ?', [req.params.id])
    await pool.query('DELETE FROM terms WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/media', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM media ORDER BY created_at DESC')
    res.json(rows)
  } catch (err) {
    sendError(res, err)
  }
})

router.post('/media', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'File upload required' })
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    const { alt_text, caption, type = req.file.mimetype, size = req.file.size, uploaded_by = null } = req.body
    const [result] = await pool.query(
      `INSERT INTO media (filename, url, alt_text, caption, type, size, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.file.filename, url, alt_text || null, caption || null, type, size, uploaded_by]
    )
    const [rows] = await pool.query('SELECT * FROM media WHERE id = ?', [result.insertId])
    res.status(201).json(rows[0])
  } catch (err) {
    sendError(res, err)
  }
})

router.delete('/media/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT filename FROM media WHERE id = ?', [req.params.id])
    if (!rows.length) return res.status(404).json({ error: 'Media not found' })
    const filePath = path.join(uploadDir, rows[0].filename)
    await fs.unlink(filePath).catch(() => {})
    await pool.query('DELETE FROM media WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/settings', async (req, res) => {
  try {
    const { key } = req.query
    if (key) {
      const [rows] = await pool.query('SELECT * FROM settings WHERE `key` = ?', [key])
      if (!rows.length) return res.status(404).json({ error: 'Setting not found' })
      return res.json(rows[0])
    }
    const [rows] = await pool.query('SELECT * FROM settings ORDER BY id ASC')
    res.json(rows)
  } catch (err) {
    sendError(res, err)
  }
})

router.post('/settings', async (req, res) => {
  try {
    const { key, value, autoload = 1 } = req.body
    if (!key) return res.status(400).json({ error: 'Key is required' })
    const [existing] = await pool.query('SELECT id FROM settings WHERE `key` = ?', [key])
    if (existing.length) return res.status(400).json({ error: 'Setting already exists' })
    const [result] = await pool.query('INSERT INTO settings (`key`, `value`, autoload) VALUES (?, ?, ?)', [key, value || '', autoload])
    const [rows] = await pool.query('SELECT * FROM settings WHERE id = ?', [result.insertId])
    res.status(201).json(rows[0])
  } catch (err) {
    sendError(res, err)
  }
})

router.put('/settings/:id', async (req, res) => {
  try {
    const updates = {}
    if (req.body.key !== undefined) updates.key = req.body.key
    if (req.body.value !== undefined) updates.value = req.body.value
    if (req.body.autoload !== undefined) updates.autoload = req.body.autoload
    if (!Object.keys(updates).length) return res.status(400).json({ error: 'No fields to update' })
    const setClause = Object.keys(updates).map(key => key === 'key' ? '`key` = ?' : `${key} = ?`).join(', ')
    await pool.query(`UPDATE settings SET ${setClause} WHERE id = ?`, [...Object.values(updates), req.params.id])
    const [rows] = await pool.query('SELECT * FROM settings WHERE id = ?', [req.params.id])
    res.json(rows[0])
  } catch (err) {
    sendError(res, err)
  }
})

router.delete('/settings/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM settings WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    sendError(res, err)
  }
})

module.exports = router
