const router = require('express').Router()
const pool = require('../config/db')
const transporter = require('../config/mailer')

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

    if (process.env.ADMIN_NOTIFY_EMAIL) {
      transporter.sendMail({
        from: `"A1 Construction Website" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_NOTIFY_EMAIL,
        replyTo: email,
        subject: `New enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || '-'}`,
          `Organisation: ${organisation || '-'}`,
          `Type: ${type || '-'}`,
          '',
          message || ''
        ].join('\n')
      }).catch(err => console.error('❌ Failed to send enquiry notification email:', err.message))
    }
  } catch (e) {
    res.status(500).json({ error: 'Failed to save enquiry' })
  }
})

module.exports = router
