const router = require('express').Router()
const pool = require('../config/db')

const sendError = (res, err) => {
  console.error(err)
  return res.status(500).json({ error: 'Server error' })
}

router.get('/posts', async (req, res) => {
  try {
    const { type, search, page = 1, per_page = 20 } = req.query
    const filters = ['status = ?', 'active = ?']
    const params = ['published', 1]

    if (type) { filters.push('type = ?'); params.push(type) }
    if (search) { filters.push('(title LIKE ? OR excerpt LIKE ? OR content LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`) }

    const where = `WHERE ${filters.join(' AND ')}`
    const limit = Math.min(100, Number(per_page) || 20)
    const offset = (Math.max(Number(page) || 1, 1) - 1) * limit

    const [rows] = await pool.query(
      `SELECT * FROM posts ${where} ORDER BY menu_order DESC, published_at DESC, created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    )

    res.json(rows)
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/posts/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE slug = ? AND status = ? AND active = ?', [req.params.slug, 'published', 1])
    if (!rows.length) return res.status(404).json({ error: 'Post not found' })
    res.json(rows[0])
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/terms', async (req, res) => {
  try {
    const { taxonomy = 'category', active = 1 } = req.query
    const [rows] = await pool.query(
      'SELECT * FROM terms WHERE taxonomy = ? AND active = ? ORDER BY sort_order ASC, name ASC',
      [taxonomy, active ? 1 : 0]
    )
    res.json(rows)
  } catch (err) {
    sendError(res, err)
  }
})

router.get('/settings', async (req, res) => {
  try {
    const { key } = req.query
    if (key) {
      const [rows] = await pool.query('SELECT * FROM settings WHERE `key` = ? AND autoload = ?', [key, 1])
      if (!rows.length) return res.status(404).json({ error: 'Setting not found' })
      return res.json(rows[0])
    }
    const [rows] = await pool.query('SELECT * FROM settings WHERE autoload = ? ORDER BY id ASC', [1])
    res.json(rows)
  } catch (err) {
    sendError(res, err)
  }
})

module.exports = router
