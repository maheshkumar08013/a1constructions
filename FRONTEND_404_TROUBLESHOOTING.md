# Frontend 404 Error - Troubleshooting Guide

## Quick Diagnosis

**What's happening**: When you visit `https://sunsysweb.co.in/a1construction/` or navigate to routes like `/about`, `/projects`, you get a 404 error.

**Why**: React Router routes aren't being handled. The server is looking for actual files instead of letting React handle the routing.

---

## Troubleshooting Steps (In Order)

### Step 1: Check Files Are Uploaded

**Via cPanel File Manager**:
1. Log in to cPanel
2. Go to **File Manager**
3. Navigate to `public_html/a1construction/`
4. Verify these files exist:
   - `index.html` ✓
   - `.htaccess` ✓
   - `assets/` folder with JS/CSS files ✓

**If missing**:
- Upload `frontend/dist/` contents again
- Ensure hidden files are visible (cPanel → Settings → Show Hidden Files)

---

### Step 2: Check .htaccess Permissions

**Via SSH (if available)**:
```bash
ls -la ~/public_html/a1construction/ | grep htaccess
# Should show: -rw-r--r-- .htaccess
```

**Fix permissions if needed**:
```bash
chmod 644 ~/public_html/a1construction/.htaccess
```

**Via cPanel**:
1. File Manager → select `.htaccess`
2. Right-click → Permissions
3. Set to: **644** (rw-r--r--)
4. Click OK

---

### Step 3: Verify .htaccess Content

**Via cPanel File Manager**:
1. File Manager → `public_html/a1construction/`
2. Right-click `.htaccess` → Edit
3. Content should be:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /a1construction/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^.*$ index.html [L]
</IfModule>
```

If it's empty or incorrect, copy the above content and save.

---

### Step 4: Enable mod_rewrite in Apache

**Check if mod_rewrite is enabled**:

Via cPanel (if you have WHM access):
1. Go to **WHM** → **Apache Configuration**
2. Search for `mod_rewrite`
3. Enable if disabled
4. Restart Apache

**Via SSH** (if you have root access):
```bash
a2enmod rewrite
systemctl restart apache2
```

**If you don't have access**:
- Contact your hosting provider and ask them to enable `mod_rewrite`

---

### Step 5: Check AllowOverride Settings

**This is the most common issue on shared hosting!**

**What is AllowOverride?**
- It controls whether Apache reads `.htaccess` files
- If it's set to "None", `.htaccess` is ignored

**If you have SSH/WHM access**:
1. Check: `grep AllowOverride /etc/apache2/httpd.conf`
2. Should see: `AllowOverride All`
3. If not, edit and change to: `AllowOverride All`
4. Restart: `systemctl restart apache2`

**If you DON'T have access**:
- Contact hosting provider and request: "Enable AllowOverride All for public_html"

---

### Step 6: Check Apache Error Logs

**Via cPanel**:
1. Go to **Error Log** (in cPanel dashboard)
2. Look for errors related to `a1construction` or `.htaccess`
3. Common errors:
   - `[error] mod_rewrite: [client ...] could not match...`
   - `[error] Unknown variable in condition...`

**Via SSH**:
```bash
tail -50 ~/logs/error_log | grep a1construction
```

---

### Step 7: Test Manually

**Test if .htaccess is working**:

1. **Direct access works** (should show content):
   ```
   https://sunsysweb.co.in/a1construction/index.html
   ```

2. **Route access doesn't work** (shows 404):
   ```
   https://sunsysweb.co.in/a1construction/about
   ```

3. **If test 1 works but test 2 fails**: `.htaccess` isn't being applied
   - Go back to Steps 2-5

---

## Alternative Solution: Upload Without .htaccess

If `.htaccess` isn't working and hosting provider won't enable it:

### Option A: Rename index.html (Temporary)

Temporarily serve with hash routing:
```
https://sunsysweb.co.in/a1construction/#/about
https://sunsysweb.co.in/a1construction/#/projects
```

Contact hosting provider to enable `.htaccess` support.

### Option B: Server-Side Rendering

This requires backend changes and isn't recommended for this project.

---

## cPanel-Specific Solutions

### Solution 1: Use cPanel's Built-in Configuration

Some cPanel hosts have a UI for rewrite rules:

1. cPanel → **Software** → **MultiPHP Manager** or similar
2. Look for rewrite rule options
3. Add rewrite rule: `RewriteRule ^.*$ index.html [L]`

### Solution 2: .htaccess in Parent Directory

If `.htaccess` in `a1construction/` doesn't work, try parent:

1. Create `.htaccess` in `public_html/`
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteCond %{REQUEST_URI} ^/a1construction
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^a1construction/.*$ /a1construction/index.html [L]
   </IfModule>
   ```

### Solution 3: Switch to Hash-Based Routing (Temporary)

Update frontend configuration to use hash routing:

Edit `frontend/vite.config.js`:
```javascript
export default defineConfig({
  base: '/a1construction/',
  plugins: [react()],
  // ... rest of config
})
```

Edit `frontend/src/main.jsx`:
```javascript
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
```

Then rebuild: `npm run build` and re-upload.

URLs would become: `sunsysweb.co.in/a1construction/#/about`

---

## Checklist to Fix 404

- [ ] Files uploaded to `public_html/a1construction/`
- [ ] `.htaccess` file exists and has correct permissions (644)
- [ ] `.htaccess` content is correct (use copy from Step 3)
- [ ] Direct access works: `https://sunsysweb.co.in/a1construction/index.html`
- [ ] Contacted hosting provider to ensure:
  - `mod_rewrite` is enabled
  - `AllowOverride All` is set for public_html
- [ ] Cleared browser cache (Ctrl+Shift+Del)
- [ ] Tested in incognito/private browser window
- [ ] Checked Apache error logs for mod_rewrite issues

---

## Contact Hosting Provider With These Details

If you need to escalate to support:

**Request**:
> "I need to deploy a React single-page application. It requires:
> 1. Apache mod_rewrite module enabled
> 2. AllowOverride All directive set for my document root (public_html)
> 3. .htaccess files to be processed for rewrite rules
> 
> The app is located at: public_html/a1construction/
> The .htaccess file uses: RewriteRule ^.*$ index.html [L]"

---

## Quick Fixes to Try Right Now

### Fix 1: Re-upload .htaccess

1. Delete existing `.htaccess` from `public_html/a1construction/`
2. Create new file with correct content:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /a1construction/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^.*$ index.html [L]
</IfModule>
```
3. Upload
4. Set permissions to 644
5. Test

### Fix 2: Clear Browser Cache

- Press: **Ctrl + Shift + Delete** (Windows) or **Cmd + Shift + Delete** (Mac)
- Select "All time"
- Check "Cookies and other site data"
- Clear

### Fix 3: Test in Incognito

- Open new incognito/private window
- Visit: `https://sunsysweb.co.in/a1construction/`
- If it works in incognito but not normal browser = cache issue

---

**Still not working?** Let me know:
1. What URL you're visiting
2. What error message you see (take screenshot)
3. Whether the host has enabled mod_rewrite (contact them first)
4. Whether .htaccess permissions are 644
