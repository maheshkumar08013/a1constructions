# A1 Construction - Deployment Verification Checklist

## Your Setup
- **Backend Domain**: `a1.sunsysweb.co.in` ✅
- **Frontend Domain**: `sunsysweb.co.in/a1construction` ✅
- **Database**: `a1construction_db`
- **Node Version**: 18.x (recommended)

---

## Backend Deployment Checklist

### 1. Server Setup
- [ ] Subdomain `a1.sunsysweb.co.in` created in cPanel
- [ ] Document Root set to: `/home/username/public_html/a1backend/`
- [ ] Node.js 18.x installed via cPanel

### 2. Database Setup
```bash
# Via cPanel MySQL Manager or SSH
CREATE DATABASE a1construction_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'a1const_user'@'localhost' IDENTIFIED BY 'A1Construction@2024';
GRANT ALL PRIVILEGES ON a1construction_db.* TO 'a1const_user'@'localhost';
FLUSH PRIVILEGES;
```
- [ ] Database created
- [ ] User created
- [ ] Permissions granted

### 3. Application Files
- [ ] Backend folder uploaded to `/home/username/public_html/a1backend/`
- [ ] Files should include:
  ```
  a1backend/
  ├── src/
  │   ├── index.js (main entry point)
  │   ├── config/
  │   ├── routes/
  │   └── ...
  ├── package.json
  ├── .env (production config)
  └── uploads/ (if needed)
  ```
- [ ] `.env` file uploaded with production settings

### 4. Install & Setup
```bash
cd ~/public_html/a1backend
npm install
npm run setup  # Create database tables
```
- [ ] Dependencies installed
- [ ] Database migrations completed

### 5. Start Application

**Option A: Using cPanel Node.js Manager** (Recommended)
```
1. cPanel → Software → Node.js Applications
2. Create Application:
   - Node.js Version: 18.x
   - Application Mode: Production
   - Application Root: /home/username/public_html/a1backend
   - Application Startup File: src/index.js
   - Application URL: a1.sunsysweb.co.in
3. Click "Create"
```
- [ ] Application created in cPanel
- [ ] Status shows "Running"

**Option B: Using forever** (If cPanel option unavailable)
```bash
npm install -g forever
forever start --uid "a1backend" ~/public_html/a1backend/src/index.js
```
- [ ] forever installed globally
- [ ] App started: `forever list` shows running

### 6. Configure Reverse Proxy (cPanel Handles This Automatically)
- [ ] Apache is configured to route requests from `a1.sunsysweb.co.in` → `localhost:3000`
- [ ] (cPanel's Node.js manager does this automatically)

### 7. Verify Backend is Working

**Test 1: Direct Health Check**
```bash
curl https://a1.sunsysweb.co.in/api/health
# Expected response: {"status":"ok","timestamp":"..."}
```
- [ ] Health endpoint responds with 200 OK

**Test 2: Database Connection**
- [ ] Visit: `https://a1.sunsysweb.co.in/api/content/services`
- [ ] Should return service data (not 500 error)

**Test 3: Check Logs**
```bash
# Via cPanel Node.js Applications or SSH
tail -f ~/logs/a1backend.log  # if using forever
# or check cPanel logs
```
- [ ] No database connection errors
- [ ] No port errors
- [ ] No module errors

---

## Frontend Deployment Checklist

### 1. Build Production Version
```bash
cd frontend
npm run build
```
- [ ] Build completed successfully
- [ ] No errors in console
- [ ] `frontend/dist/` folder created with assets

### 2. Upload to Server
```
Upload ALL contents of frontend/dist/ to:
public_html/a1construction/

Should include:
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── vendor-[hash].js
│   ├── tanstack-[hash].js
│   ├── icons-[hash].js
│   └── logo.png
├── .htaccess
└── favicon.ico (if exists)
```
- [ ] All dist files uploaded
- [ ] `.htaccess` file included
- [ ] Folder structure preserved

### 3. Set File Permissions
```bash
# Via SSH
chmod 755 ~/public_html/a1construction
chmod 644 ~/public_html/a1construction/index.html
chmod 644 ~/public_html/a1construction/.htaccess
chmod 755 ~/public_html/a1construction/assets
find ~/public_html/a1construction/assets -type f -exec chmod 644 {} \;
```
- [ ] Permissions set correctly

### 4. Verify .htaccess Configuration

Check file: `public_html/a1construction/.htaccess`

Content should be:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /a1construction/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^.*$ index.html [L]
</IfModule>
```
- [ ] .htaccess exists
- [ ] Content is correct
- [ ] Permissions are 644

### 5. Enable mod_rewrite (Ask Hosting Provider If Not Enabled)
```bash
# Your hosting provider needs to:
# 1. Enable Apache mod_rewrite module
# 2. Set "AllowOverride All" for public_html
```
- [ ] Hosting provider confirmed mod_rewrite enabled
- [ ] AllowOverride All enabled for your domain

### 6. Test Frontend

**Test 1: Main Page Loads**
```
https://sunsysweb.co.in/a1construction/
```
- [ ] Page loads without 404 error
- [ ] CSS/JS files load (check DevTools Network tab)

**Test 2: Navigation Works**
```
https://sunsysweb.co.in/a1construction/about
https://sunsysweb.co.in/a1construction/projects
https://sunsysweb.co.in/a1construction/services
https://sunsysweb.co.in/a1construction/contact
```
- [ ] All routes work without 404
- [ ] Page doesn't reload, just content changes

**Test 3: API Connection Works**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Try admin login: `/admin/login`
4. Enter any credentials and try to login
5. Check Network tab - should see API calls to:
   ```
   https://a1.sunsysweb.co.in/api/auth/login
   ```
- [ ] API calls go to correct backend URL
- [ ] Network tab shows XHR requests (not 404)

**Test 4: Console Errors**
- [ ] DevTools Console has no red errors
- [ ] No CORS errors
- [ ] No 404 errors for assets

---

## Troubleshooting

### Backend Issues

**Issue: Backend not running**
```bash
# Check if running
forever list
ps aux | grep node

# Restart
forever restart a1backend
# Or via cPanel: Stop → Start

# Check logs
tail -50 ~/logs/a1backend.log
```

**Issue: Database connection error**
- [ ] Verify database name: `a1construction_db`
- [ ] Verify username: `a1const_user`
- [ ] Verify password: `A1Construction@2024`
- [ ] Test connection: `mysql -u a1const_user -p a1construction_db`

**Issue: Port 3000 already in use**
```bash
lsof -i :3000
kill -9 <PID>
```

**Issue: CORS errors in browser**
- [ ] Check backend `.env`: `FRONTEND_URL=https://sunsysweb.co.in/a1construction`
- [ ] Restart backend after .env change

### Frontend Issues

**Issue: Routes return 404**
1. Check `.htaccess` exists and has correct content
2. Ask hosting provider to enable `mod_rewrite`
3. Check `AllowOverride All` setting
4. Set file permissions: `chmod 644 .htaccess`

**Issue: Assets not loading (CSS/JS)**
1. Check Network tab in DevTools
2. Assets should be at: `/a1construction/assets/[filename]`
3. If returning 404: re-upload dist folder
4. Check MIME types (CSS should be `text/css`, JS should be `application/javascript`)

**Issue: API calls failing**
1. Check Network tab - what URL is being called?
2. Should be: `https://a1.sunsysweb.co.in/api/...`
3. If seeing CORS error: check backend CORS config
4. Backend `.env` should have: `FRONTEND_URL=https://sunsysweb.co.in/a1construction`

---

## Final Verification Commands

Run these to confirm everything is working:

```bash
# 1. Backend health check
curl https://a1.sunsysweb.co.in/api/health

# 2. Check if backend is running
ps aux | grep node

# 3. View backend logs
tail -50 ~/logs/a1backend.log

# 4. Test database
mysql -u a1const_user -p
USE a1construction_db;
SHOW TABLES;
EXIT;

# 5. Check frontend files
ls -la ~/public_html/a1construction/

# 6. Verify .htaccess
cat ~/public_html/a1construction/.htaccess
```

---

## Success Checklist ✅

- [ ] `https://a1.sunsysweb.co.in/api/health` returns `{"status":"ok"}`
- [ ] `https://sunsysweb.co.in/a1construction/` loads without 404
- [ ] Routes like `/about`, `/projects` work
- [ ] Admin login page loads at `/admin/login`
- [ ] CSS/JS files load properly (DevTools Network tab)
- [ ] No CORS errors in console
- [ ] No database connection errors in backend logs
- [ ] All images and fonts display correctly

---

## When Everything Works

1. **Backend**: Processing requests at `https://a1.sunsysweb.co.in/api`
2. **Frontend**: Serving React app at `https://sunsysweb.co.in/a1construction/`
3. **Database**: Connected and working
4. **API**: Communication established between frontend and backend
5. **Production**: Ready for users!

---

## Support

If something isn't working:
1. Check relevant section in this checklist
2. Run the troubleshooting commands
3. Check browser DevTools (F12) for errors
4. Check backend logs: `tail -50 ~/logs/a1backend.log`
5. Verify all files are uploaded to correct locations

**Contact your hosting provider if:**
- mod_rewrite can't be enabled
- AllowOverride can't be set
- Node.js application manager unavailable
