const router = require('express').Router()
const pool = require('../config/db')
const auth = require('../middleware/auth')
const cmsRoutes = require('./cms')

// Apply auth to all admin routes
router.use(auth)

// ── Generic CRUD factory ──────────────────────────────
function crudRoutes(table, fields) {
  const r = require('express').Router()

  r.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM ${table} ORDER BY sort_order ASC, created_at DESC`)
      res.json(rows)
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  r.post('/', async (req, res) => {
    try {
      const vals = fields.reduce((acc, f) => { acc[f] = req.body[f] ?? null; return acc }, {})
      const cols = Object.keys(vals).join(', ')
      const placeholders = Object.keys(vals).map(() => '?').join(', ')
      const [result] = await pool.query(
        `INSERT INTO ${table} (${cols}) VALUES (${placeholders})`,
        Object.values(vals)
      )
      const [row] = await pool.query(`SELECT * FROM ${table} WHERE id=?`, [result.insertId])
      res.status(201).json(row[0])
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  r.put('/:id', async (req, res) => {
    try {
      const vals = fields.reduce((acc, f) => { if (req.body[f] !== undefined) acc[f] = req.body[f]; return acc }, {})
      const setClauses = Object.keys(vals).map(k => `${k}=?`).join(', ')
      if (!setClauses) return res.status(400).json({ error: 'No fields to update' })
      await pool.query(`UPDATE ${table} SET ${setClauses} WHERE id=?`, [...Object.values(vals), req.params.id])
      const [row] = await pool.query(`SELECT * FROM ${table} WHERE id=?`, [req.params.id])
      res.json(row[0])
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  r.delete('/:id', async (req, res) => {
    try {
      await pool.query(`DELETE FROM ${table} WHERE id=?`, [req.params.id])
      res.json({ success: true })
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  return r
}

// Mount CRUD routers
router.use('/slides', crudRoutes('slides', ['eyebrow','title','subtitle','image','sort_order','active']))
router.use('/projects', crudRoutes('projects', ['name','category','location','desc','image','color','featured','active','sort_order']))
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
