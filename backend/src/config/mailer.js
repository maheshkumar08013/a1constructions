const nodemailer = require('nodemailer')

const port = Number(process.env.SMTP_PORT) || 465
console.log({
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS ? "Loaded" : "Missing",
  SMTP_PASS_LENGTH: process.env.SMTP_PASS?.length
});


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port,
  secure: port === 465, // implicit TLS on 465, STARTTLS on 587/others
  family: 4, // force IPv4 - some hosts have no outbound IPv6 route to Gmail
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

transporter.verify()
  .then(() => console.log('✅ SMTP connected'))
  .catch(err => console.error('❌ SMTP connection failed:', err.message))

module.exports = transporter
