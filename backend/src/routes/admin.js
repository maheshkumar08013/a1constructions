const router = require('express').Router()
const pool = require('../config/db')
const auth = require('../middleware/auth')
const cmsRoutes = require('./cms')

// Apply auth to all admin routes
router.use(auth)

// ── Generic CRUD factory ──────────────────────────────
function crudRoutes(table, fields) {
  const r = require('express').Router()
  let cachedColumns = null
  const quoteIdentifier = (value) => `\`${String(value).replace(/`/g, '``')}\``

  async function getAvailableFields() {
    if (cachedColumns) return cachedColumns
    const [rows] = await pool.query(`SHOW COLUMNS FROM ${quoteIdentifier(table)}`)
    cachedColumns = new Set(rows.map(row => row.Field))
    return cachedColumns
  }

  r.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM ${quoteIdentifier(table)} ORDER BY sort_order ASC, created_at DESC`)
      res.json(rows)
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  r.post('/', async (req, res) => {
    try {
      const availableFields = await getAvailableFields()
      const vals = fields.reduce((acc, f) => {
        if (availableFields.has(f)) acc[f] = req.body[f] ?? null
        return acc
      }, {})
      const cols = Object.keys(vals).map(quoteIdentifier).join(', ')
      const placeholders = Object.keys(vals).map(() => '?').join(', ')
      const [result] = await pool.query(
        `INSERT INTO ${quoteIdentifier(table)} (${cols}) VALUES (${placeholders})`,
        Object.values(vals)
      )
      const [row] = await pool.query(`SELECT * FROM ${quoteIdentifier(table)} WHERE id=?`, [result.insertId])
      res.status(201).json(row[0])
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  r.put('/:id', async (req, res) => {
    try {
      const availableFields = await getAvailableFields()
      const vals = fields.reduce((acc, f) => {
        if (availableFields.has(f) && req.body[f] !== undefined) acc[f] = req.body[f]
        return acc
      }, {})
      const setClauses = Object.keys(vals).map(k => `${quoteIdentifier(k)}=?`).join(', ')
      if (!setClauses) return res.status(400).json({ error: 'No fields to update' })
      await pool.query(`UPDATE ${quoteIdentifier(table)} SET ${setClauses} WHERE id=?`, [...Object.values(vals), req.params.id])
      const [row] = await pool.query(`SELECT * FROM ${quoteIdentifier(table)} WHERE id=?`, [req.params.id])
      res.json(row[0])
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  r.delete('/:id', async (req, res) => {
    try {
      await pool.query(`DELETE FROM ${quoteIdentifier(table)} WHERE id=?`, [req.params.id])
      res.json({ success: true })
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  return r
}

// Mount CRUD routers
router.use('/slides', crudRoutes('slides', ['eyebrow','title','subtitle','image','sort_order','active']))
router.use('/projects', crudRoutes('projects', ['name','category','location','desc','content','image','gallery','year','color','featured','active','sort_order']))
router.use('/services', crudRoutes('services', ['icon','name','desc','sort_order','active']))
router.use('/cms', cmsRoutes)

// Enquiries (read + status update only)
router.get('/enquiries', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC')
    res.json(rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

router.patch('/enquiries/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    if (!['new','read','replied'].includes(status)) return res.status(400).json({ error: 'Invalid status' })
    await pool.query('UPDATE enquiries SET status=? WHERE id=?', [status, req.params.id])
    res.json({ success: true })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

module.exports = router
