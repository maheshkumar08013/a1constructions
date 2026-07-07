const router = require('express').Router()
const pool = require('../config/db')

// POST /api/enquiries
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, organisation, type, message } = req.body
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })

    const [result] = await pool.query(
      'INSERT INTO enquiries (name, email, phone, organisation, type, message) VALUES (?,?,?,?,?,?)',
      [name, email, phone || null, organisation || null, type || null, message || null]
    )
    res.status(201).json({ success: true, id: result.insertId, message: 'Enquiry received. We\'ll get back to you shortly.' })
  } catch (e) {
    res.status(500).json({ error: 'Failed to save enquiry' })
  }
})

module.exports = router
