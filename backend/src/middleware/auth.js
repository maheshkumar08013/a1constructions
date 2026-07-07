const jwt = require('jsonwebtoken')
const pool = require('../config/db')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token provided' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id = ?', [decoded.id])
    if (!rows.length) return res.status(401).json({ error: 'User not found' })

    req.user = rows[0]
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
