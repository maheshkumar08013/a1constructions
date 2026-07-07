const router = require('express').Router()
const pool = require('../config/db')

// GET /api/content/slides
router.get('/slides', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM slides WHERE active=1 ORDER BY sort_order ASC')
    res.json(rows)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// GET /api/content/projects
router.get('/projects', async (req, res) => {
  try {
    const { category } = req.query
    let q = 'SELECT * FROM projects WHERE active=1'
    const params = []
    if (category && category !== 'All') { q += ' AND category=?'; params.push(category) }
    q += ' ORDER BY sort_order ASC'
    const [rows] = await pool.query(q, params)
    res.json(rows)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

// GET /api/content/services
router.get('/services', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services WHERE active=1 ORDER BY sort_order ASC')
    res.json(rows)
  } catch { res.status(500).json({ error: 'Server error' }) }
})

module.exports = router
