# A1 Construction - cPanel Reseller Hosting Deployment

## Prerequisites
- cPanel access (WHM if you're the reseller, or direct cPanel if you're a reseller's client)
- Addon domain or subdomain already pointed to your account
  - Main frontend: `sunsysweb.co.in/a1construction` (subdirectory)
  - Backend: `a1.sunsysweb.co.in` (subdomain)

---

## Step 1: Create Addon Domains in cPanel

### 1.1 Frontend Domain Setup (Subdirectory)
1. **Log in to cPanel**
2. Go to **Addon Domains** (or Domains → Addon Domains)
3. For the subdirectory `/a1construction`:
   - This typically goes in your main domain's `public_html/` folder
   - Create folder: `public_html/a1construction/`
   - (You don't need separate addon domain for subdirectories)

### 1.2 Backend Subdomain Setup
1. Go to **Addon Domains** or **Subdomains**
2. Create new addon domain: `a1.sunsysweb.co.in`
3. Set Document Root to: `public_html/a1backend/` (or similar)
4. Click **Add Domain**

---

## Step 2: Set Up Node.js via cPanel

### Option A: Using cPanel's Node.js Application Manager (Recommended)

1. **Access Node.js Application Manager**
   - Go to cPanel → **Software** → **Node.js Applications**

2. **Create New Application**
   - Click **Create Application**
   - Settings:
     ```
     Node.js Version: 18.x (or latest stable)
     Application Mode: Production
     Application Root: /home/youruser/public_html/a1backend
     Application Startup File: src/index.js
     Application URL: a1.sunsysweb.co.in
     ```

3. **Install Dependencies**
   - cPanel will handle this automatically
   - Or SSH and run: `npm install`

4. **Database Setup**
   - Via cPanel → **MySQL Databases**
   - Create database: `youruser_a1construction`
   - Create user: `youruser_a1const_user`
   - Password: `A1Construction@2024`
   - Add user to database with all privileges

5. **Update .env on Server**
   - SSH or File Manager in cPanel
   - Navigate to: `/home/youruser/public_html/a1backend/.env`
   - Update database name to: `youruser_a1construction`
   ```
   DB_HOST=localhost
   DB_USER=youruser_a1const_user
   DB_PASSWORD=A1Construction@2024
   DB_NAME=youruser_a1construction
   ```

6. **Run Migrations**
   - Via SSH:
     ```bash
     cd ~/public_html/a1backend
     npm run setup
     ```

7. **Restart Application**
   - In cPanel Node.js Applications → select your app → Restart

---

### Option B: Manual Node.js Setup (via SSH)

If Node.js isn't available in cPanel:

1. **Install Node.js**
   ```bash
   # Check if nvm (Node Version Manager) is available
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   nvm install 18
   nvm use 18
   ```

2. **Deploy Backend Files**
   ```bash
   mkdir -p ~/public_html/a1backend
   cd ~/public_html/a1backend
   # Copy backend files here via FTP or upload
   npm install
   ```

3. **Create .env File**
   ```bash
   cat > .env << EOF
   PORT=3000
   DB_HOST=localhost
   DB_USER=youruser_a1const_user
   DB_PASSWORD=A1Construction@2024
   DB_NAME=youruser_a1construction
   NODE_ENV=production
   FRONTEND_URL=https://sunsysweb.co.in/a1construction
   JWT_SECRET=A1Construction$2024#SuperSecureKey#ChangeThisInProduction
   JWT_EXPIRES_IN=7d
   EOF
   ```

4. **Run Migrations**
   ```bash
   npm run setup
   ```

5. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start src/index.js --name "a1-backend"
   pm2 save
   pm2 startup
   ```

---

## Step 3: Setup Reverse Proxy (Apache)

The Node.js app runs on port 3000, but users access via `a1.sunsysweb.co.in`.

### Method A: Using cPanel (Easiest)

**If using cPanel's Node.js Applications manager**, it automatically configures the proxy.

### Method B: Manual Apache Configuration

1. **Access .htaccess in Domain Root**
   - File Manager → `/public_html/a1backend/`
   - Create or edit `.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{HTTP:Connection} Upgrade [NC]
     RewriteCond %{HTTP:Upgrade} websocket [NC]
     RewriteRule ^/?(.*) "ws://localhost:3000/$1" [P,L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   </IfModule>
   
   <IfModule mod_proxy.c>
     ProxyPreserveHost On
     ProxyPass / http://localhost:3000/
     ProxyPassReverse / http://localhost:3000/
   </IfModule>
   ```

2. **Enable Apache Modules**
   - Via SSH (if you have root/WHM access):
   ```bash
   a2enmod rewrite
   a2enmod proxy
   a2enmod proxy_http
   systemctl restart apache2
   ```

---

## Step 4: Deploy Frontend

1. **Navigate to Frontend Directory**
   - File Manager → `public_html/a1construction/`
   - Create the folder if it doesn't exist

2. **Upload Frontend Files**
   - Extract `frontend/dist/` contents into `public_html/a1construction/`
   - Should contain:
     ```
     index.html
     assets/
       index-[hash].js
       index-[hash].css
       logo-[hash].png
     .htaccess
     ```

3. **Set File Permissions**
   - Via SSH:
   ```bash
   chmod 755 ~/public_html/a1construction
   chmod 644 ~/public_html/a1construction/index.html
   chmod 644 ~/public_html/a1construction/.htaccess
   chmod 755 ~/public_html/a1construction/assets
   find ~/public_html/a1construction/assets -type f -exec chmod 644 {} \;
   ```

4. **Verify .htaccess (React Routing)**
   - File Manager → Edit `.htaccess` in `public_html/a1construction/`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /a1construction/
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^ index.html [QSA,L]
   </IfModule>
   ```

---

## Step 5: Database Setup via cPanel

1. **Go to MySQL Databases**
   - cPanel → **Databases** → **MySQL Databases**

2. **Create Database**
   - Database name: `youruser_a1construction`
   - Click **Create Database**

3. **Create User**
   - User: `youruser_a1const_user`
   - Password: `A1Construction@2024`
   - Click **Create User**

4. **Add User to Database**
   - Select user and database
   - Check all privileges
   - Click **Add**

---

## Step 6: Verify Everything Works

### Test Backend
```bash
# Via SSH or Terminal
curl https://a1.sunsysweb.co.in/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Test Frontend
1. Visit: `https://sunsysweb.co.in/a1construction/`
2. Press F12 (Developer Tools)
3. Check Console for errors
4. Verify assets load from `/a1construction/assets/`

### Test API Connectivity
1. Go to Admin Login: `https://sunsysweb.co.in/a1construction/#/admin/login`
2. Open Network tab in DevTools
3. Try to log in
4. Check API calls go to `https://a1.sunsysweb.co.in/api/...`

---

## Troubleshooting on cPanel

### Issue: 404 on Backend Routes
**Solution**: 
1. Check Node.js app is running: cPanel → Node.js Applications → Status
2. Check .env file is correct
3. Check database connection: SSH → `npm run setup`

### Issue: 502 Bad Gateway on Backend
**Solution**:
1. Node.js might not be running on port 3000
2. Check proxy configuration in Apache
3. SSH and check: `pm2 logs a1-backend`
4. Restart Node.js app from cPanel

### Issue: Frontend 404 on Routes Like /about
**Solution**:
1. Ensure `.htaccess` is in `public_html/a1construction/`
2. Check RewriteEngine is enabled
3. Verify file permissions (755 for dirs, 644 for files)

### Issue: CSS/JS Not Loading (MIME Type Error)
**Solution**:
1. Check files exist in `public_html/a1construction/assets/`
2. Verify file permissions (644)
3. Check `.htaccess` isn't blocking asset loading
4. Go to **MIME Types** in cPanel and add:
   - `.js` → `application/javascript`
   - `.css` → `text/css`

### Issue: Database Connection Error
**Solution**:
1. Verify database name includes cPanel username prefix: `username_dbname`
2. Check credentials in .env match cPanel
3. Test connection via SSH:
   ```bash
   mysql -h localhost -u youruser_a1const_user -p a1construction
   ```

---

## Port Issues on cPanel

**Different hosting providers handle ports differently:**

### Shared/Reseller Hosting
- Node.js can run on port 3000-65535 (not 80/443)
- Apache reverse proxies public ports to Node.js port
- This is automatic in cPanel's Node.js manager

### Accessing Your App
- Always use domain: `https://a1.sunsysweb.co.in`
- Never try to access `a1.sunsysweb.co.in:3000` (usually blocked)
- Port 3000 is internal only

---

## Security on cPanel

1. **Change JWT Secret in .env**
   ```
   JWT_SECRET=YourVeryStrongRandomSecret123!@#
   ```

2. **Enable SSL/TLS**
   - cPanel → AutoSSL or Let's Encrypt
   - Both domains should have valid HTTPS

3. **File Permissions**
   - `.env` should be readable by app only: `644`
   - Never commit `.env` to git

4. **Rate Limiting**
   - Already configured in backend
   - Check logs if you get "Too many requests"

---

## Monitoring on cPanel

1. **Check Resource Usage**
   - cPanel Dashboard → Resource Usage
   - Check CPU, Memory, I/O

2. **View Error Logs**
   - cPanel → Error Log (for Apache errors)
   - SSH: `tail -f ~/logs/error_log`

3. **Monitor Node.js App**
   - SSH:
     ```bash
     pm2 logs a1-backend
     pm2 monit
     ```

---

## Useful cPanel/SSH Commands

```bash
# Check Node.js version
node --version
npm --version

# Navigate to backend
cd ~/public_html/a1backend

# View running processes
ps aux | grep node
pm2 list

# View logs
pm2 logs a1-backend
tail -f ~/logs/error_log

# Restart app
pm2 restart a1-backend

# Stop/Start app
pm2 stop a1-backend
pm2 start src/index.js

# Database operations
mysql -u youruser_a1const_user -p a1construction

# File permissions
chmod 755 ~/public_html/a1backend
chmod 644 .env
```

---

## Quick Checklist

- [ ] Addon domain `a1.sunsysweb.co.in` created
- [ ] Node.js application created via cPanel
- [ ] MySQL database and user created
- [ ] .env file uploaded with correct DB credentials
- [ ] `npm install` completed
- [ ] `npm run setup` (migrations) completed
- [ ] Node.js app running (check cPanel dashboard)
- [ ] Reverse proxy configured
- [ ] Frontend files uploaded to `public_html/a1construction/`
- [ ] Frontend `.htaccess` in place
- [ ] Both domains have SSL/HTTPS
- [ ] Test backend: `curl https://a1.sunsysweb.co.in/api/health`
- [ ] Test frontend: `https://sunsysweb.co.in/a1construction/`
- [ ] Check DevTools Console for errors

---

**Status**: Ready for cPanel Reseller Hosting
**Last Updated**: 2024
