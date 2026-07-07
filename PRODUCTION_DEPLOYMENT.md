# A1 Construction - Production Deployment Guide

## Overview
- **Backend**: Running on `a1.sunsysweb.co.in` (Node.js app)
- **Frontend**: Deployed to `public_html/a1construction/` (React static build)
- **Database**: MySQL on shared hosting

---

## Phase 1: Backend Setup on Server

### 1.1 Database Setup
```bash
# SSH into your server and create the database
mysql -u root -p
CREATE DATABASE a1construction_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'a1const_user'@'localhost' IDENTIFIED BY 'A1Construction@2024';
GRANT ALL PRIVILEGES ON a1construction_db.* TO 'a1const_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 1.2 Deploy Backend Files
1. Copy the entire `backend/` folder to your server:
   - Via FTP to: `/home/username/a1.sunsysweb.co.in/public_html/` (or appropriate directory)
   - Or via SSH: `scp -r backend/ user@server:/path/to/domain/`

### 1.3 Install Dependencies
```bash
cd /path/to/backend
npm install
```

### 1.4 Environment Configuration
The `.env` file is already configured for production:
```
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_USER=a1const_user
DB_PASSWORD=A1Construction@2024
DB_NAME=a1construction_db
FRONTEND_URL=https://sunsysweb.co.in/a1construction
JWT_SECRET=A1Construction$2024#SuperSecureKey#ChangeThisInProduction
```

⚠️ **IMPORTANT**: Change `JWT_SECRET` to a unique, strong value in production.

### 1.5 Run Database Migrations
```bash
npm run setup
# This will create tables: admins, content, enquiries, etc.
```

### 1.6 Start the Backend
**Option A: Using PM2 (Recommended)**
```bash
npm install -g pm2
pm2 start src/index.js --name "a1-backend"
pm2 save
pm2 startup
```

**Option B: Using cPanel/DirectAdmin**
1. Go to Node.js/Ruby application settings in cPanel
2. Create new Node.js application
3. Point to: `/path/to/backend/src/index.js`
4. Set PORT to 3000
5. Install dependencies and restart

### 1.7 Configure Reverse Proxy (cPanel)
If using cPanel, create a reverse proxy for the Node.js app:
- Domain: `a1.sunsysweb.co.in`
- Proxy to: `http://localhost:3000`

---

## Phase 2: Frontend Setup on Server

### 2.1 Upload Built Files
1. Ensure you've run `npm run build` locally (already done)
2. Upload the contents of `frontend/dist/` to:
   ```
   public_html/a1construction/
   ```
   Files should include:
   - `index.html`
   - `assets/` folder (CSS, JS, images)
   - `.htaccess` (for React routing)

### 2.2 Verify File Permissions
```bash
# SSH into server
chmod 755 public_html/a1construction
chmod 644 public_html/a1construction/index.html
chmod 644 public_html/a1construction/.htaccess
chmod 755 public_html/a1construction/assets
```

### 2.3 Test the Frontend
Visit: `https://sunsysweb.co.in/a1construction/`

---

## Phase 3: Verification Checklist

### Backend Health Check
```bash
curl https://a1.sunsysweb.co.in/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Frontend Assets Loading
- Open browser DevTools (F12)
- Check Console for errors
- Verify CSS/JS files load from `/a1construction/assets/`
- MIME types should show as `text/css` and `application/javascript`

### API Connectivity
- Navigate to Admin Login: `/a1construction/#/admin/login`
- Try logging in (should make API call to backend)
- Check Network tab in DevTools
- API calls should go to `https://a1.sunsysweb.co.in/api/...`

### Database Connection
- Check backend logs for database connection success
- Test with `/api/content/services` endpoint

---

## Phase 4: Troubleshooting

### Issue: 404 on Frontend Routes
**Solution**: Ensure `.htaccess` is in `public_html/a1construction/`
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /a1construction/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

### Issue: Assets Returning 404 or Wrong MIME Type
**Check**:
- File paths in `dist/index.html` should have `/a1construction/assets/`
- Server MIME types configured correctly
- Files actually exist in `public_html/a1construction/assets/`

### Issue: API Calls Failing (CORS Error)
**Solution**: CORS is configured in backend based on `FRONTEND_URL` env var
- Ensure `FRONTEND_URL=https://sunsysweb.co.in/a1construction`
- Restart backend: `pm2 restart a1-backend`

### Issue: Database Connection Error
**Check**:
- Database name: `a1construction_db`
- Username: `a1const_user`
- Password: `A1Construction@2024`
- Host: `localhost`
- Run `npm run setup` to create tables

---

## Phase 5: Security Best Practices

1. **Change JWT Secret**
   - Edit `.env` on server with a unique value
   - Restart backend: `pm2 restart a1-backend`

2. **Enable HTTPS**
   - Use Let's Encrypt (free SSL in cPanel)
   - Both domains should be HTTPS

3. **Database Backups**
   - Set up automated backups in cPanel
   - Test restore procedure

4. **Rate Limiting**
   - Backend has rate limiting enabled
   - Auth: 20 requests per 15 minutes
   - Enquiries: 10 per hour

5. **Keep Dependencies Updated**
   - Regularly check for security updates
   - Run `npm audit` periodically

---

## Phase 6: Monitoring & Logs

### View Backend Logs
```bash
pm2 logs a1-backend
pm2 monit
```

### Check Database Size
```bash
mysql -u a1const_user -p
USE a1construction_db;
SHOW TABLE STATUS;
```

### Monitor Frontend
- Check browser console for errors
- Use Google Analytics for traffic
- Set up uptime monitoring service

---

## Quick Command Reference

```bash
# Backend deployment
npm install
npm run setup           # Initialize database
npm run start          # Start server
pm2 restart a1-backend # Restart running app

# Frontend deployment
npm run build          # Build production files
# Then FTP/SCP dist/ contents to public_html/a1construction/

# Check services
curl https://a1.sunsysweb.co.in/api/health
# Visit https://sunsysweb.co.in/a1construction/
```

---

## Support & Emergency

If something breaks:
1. Check backend logs: `pm2 logs a1-backend`
2. Check browser console (F12)
3. Check cPanel error logs
4. Verify database connection
5. Check API endpoint manually: `curl https://a1.sunsysweb.co.in/api/health`

---

**Last Updated**: 2024
**Version**: 1.0
