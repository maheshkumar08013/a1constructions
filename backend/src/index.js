require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path')

const authRoutes = require('./routes/auth')
const contentRoutes = require('./routes/content')
const adminRoutes = require('./routes/admin')
const cmsPublicRoutes = require('./routes/cms-public')
const enquiryRoutes = require('./routes/enquiries')

const app = express()

// Security
app.use(helmet({ crossOriginResourcePolicy: false }))

// CORS configuration - allow both main domain and subdomain
const corsOrigins = [
  'http://localhost:5173',  // Development frontend
  'https://sunsysweb.co.in',  // Production frontend (CORS uses origin without path)
  'https://a1.sunsysweb.co.in',  // Allow self if needed
]

app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' ? corsOrigins : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Rate limiting
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: 'Too many requests' } }))
app.use('/api/enquiries', rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: { error: 'Too many enquiries' } }))

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/cms', cmsPublicRoutes)
app.use('/api/enquiries', enquiryRoutes)

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// 404
app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }))

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ A1 Construction API running on port ${PORT}`))

module.exports = app
