const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

transporter.verify()
  .then(() => console.log('✅ SMTP connected'))
  .catch(err => console.error('❌ SMTP connection failed:', err.message))

module.exports = transporter
