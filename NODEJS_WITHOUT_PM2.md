# Running Node.js on cPanel Without PM2

## Option 1: cPanel's Built-in Node.js Application Manager (BEST)

### Step 1: Access Node.js Applications in cPanel
1. **Log in to cPanel**
2. Go to: **Software** → **Node.js Applications**
3. Click **Create Application**

### Step 2: Configure Application
```
Node.js Version: 18.x (or latest)
Application Mode: Production
Application Root: /home/username/public_html/a1backend
Application Startup File: src/index.js
Application URL: a1.sunsysweb.co.in
Node.js Package Manager: npm
```

### Step 3: Let cPanel Handle Everything
- cPanel automatically:
  - Starts the app
  - Keeps it running (restarts if it crashes)
  - Configures reverse proxy to port 3000
  - Sets up environment variables
  - Manages node_modules

### Step 4: Restart Application
- In cPanel Node.js Applications panel
- Click your app → **Restart**

**Advantages**:
- ✅ No SSH required
- ✅ GUI management
- ✅ Auto-restart on crash
- ✅ Built-in reverse proxy
- ✅ Easy to stop/start

---

## Option 2: Using `forever` (Node.js Alternative to PM2)

### Step 1: Install forever Globally
```bash
npm install -g forever
```

### Step 2: Create Startup Script
Create file: `~/start.sh`
```bash
#!/bin/bash
cd ~/public_html/a1backend
forever start --uid "a1backend" \
  --append \
  --log ~/logs/a1backend.log \
  --error ~/logs/a1backend-error.log \
  src/index.js
```

### Step 3: Make Executable
```bash
chmod +x ~/start.sh
```

### Step 4: Run at Startup (cPanel/SSH)

**Option A: Via cPanel Cron**
1. cPanel → **Cron Jobs**
2. Create new cron:
   - Minute: `0`
   - Hour: `0`
   - Day: `1`
   - Month: `*`
   - Day of Week: `*`
   - Command: `~/start.sh`
3. This runs at server reboot

**Option B: Via SSH (if available)**
```bash
# Start forever
forever start --uid "a1backend" ~/public_html/a1backend/src/index.js

# Check status
forever list

# Stop
forever stop "a1backend"
```

### Step 5: View Logs
```bash
# Check logs
tail -f ~/logs/a1backend.log
tail -f ~/logs/a1backend-error.log
```

---

## Option 3: Using `supervisor` (If Available)

### Step 1: Check if Supervisor Installed
```bash
supervisord --version
```

### Step 2: Create Supervisor Config
```bash
sudo cat > /etc/supervisor/conf.d/a1backend.conf << EOF
[program:a1backend]
directory=/home/username/public_html/a1backend
command=/usr/bin/node src/index.js
autostart=true
autorestart=true
stderr_logfile=/var/log/a1backend.err.log
stdout_logfile=/var/log/a1backend.out.log
EOF
```

### Step 3: Reload Supervisor
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start a1backend
```

### Step 4: Check Status
```bash
sudo supervisorctl status a1backend
```

---

## Option 4: Using Systemd Service (If SSH Access)

### Step 1: Create Service File
```bash
sudo cat > /etc/systemd/system/a1backend.service << EOF
[Unit]
Description=A1 Construction Backend
After=network.target

[Service]
Type=simple
User=username
WorkingDirectory=/home/username/public_html/a1backend
ExecStart=/usr/bin/node src/index.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

### Step 2: Enable and Start
```bash
sudo systemctl enable a1backend
sudo systemctl start a1backend
sudo systemctl status a1backend
```

### Step 3: Check Logs
```bash
sudo journalctl -u a1backend -f
```

---

## Option 5: Manual SSH Command (Temporary)

If you just need to run the app quickly:

```bash
cd ~/public_html/a1backend
nohup node src/index.js > ~/logs/a1backend.log 2>&1 &
```

Check if running:
```bash
ps aux | grep node
```

Stop the process:
```bash
pkill -f "node src/index.js"
```

---

## Recommended for cPanel Reseller Hosting

| Method | Ease | Auto-Restart | GUI | Recommendation |
|--------|------|--------------|-----|-----------------|
| cPanel Node.js Manager | ⭐⭐⭐⭐⭐ | ✅ | ✅ | **BEST - Use This** |
| forever | ⭐⭐⭐ | ✅ | ❌ | Good alternative |
| supervisor | ⭐⭐⭐ | ✅ | ❌ | If available |
| systemd | ⭐⭐⭐ | ✅ | ❌ | If SSH available |
| nohup | ⭐⭐ | ❌ | ❌ | Temporary only |

---

## My Recommendation for Your Setup

### **Use cPanel's Node.js Application Manager**

**Why?**
1. No PM2 needed
2. No command line required (if you prefer GUI)
3. Built-in auto-restart on crash
4. Automatic reverse proxy setup
5. Easy to manage through cPanel dashboard

**If That Doesn't Work:**

Use `forever` with a startup script:

```bash
# Install
npm install -g forever

# Create startup script and make it executable
chmod +x ~/start.sh

# Manual start
~/start.sh

# Check status
forever list

# View logs
tail -f ~/logs/a1backend.log
```

---

## Troubleshooting

### App Not Starting
1. **Check .env file exists**
   ```bash
   cat ~/public_html/a1backend/.env
   ```

2. **Check port 3000 is available**
   ```bash
   lsof -i :3000
   ```

3. **Check logs for errors**
   ```bash
   tail -50 ~/logs/a1backend.log
   ```

4. **Test database connection**
   ```bash
   mysql -u a1const_user -p a1construction
   ```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Dependencies Not Installed
```bash
cd ~/public_html/a1backend
npm install
```

---

## Quick Start Guide

### Without SSH (Use cPanel GUI):
1. cPanel → Node.js Applications
2. Create new app pointing to `/home/username/public_html/a1backend`
3. Startup file: `src/index.js`
4. Application URL: `a1.sunsysweb.co.in`
5. Click Create
6. Done! App runs automatically

### With SSH (Use forever):
```bash
npm install -g forever
cd ~/public_html/a1backend
forever start --uid "a1backend" src/index.js
forever list          # Check status
forever logs a1backend # View logs
```

---

## Check If App Is Running

```bash
# Via SSH
curl https://a1.sunsysweb.co.in/api/health

# Should return:
# {"status":"ok","timestamp":"2024-..."}
```

---

## Final Setup Checklist

- [ ] Database created and migrations run
- [ ] .env file configured for production
- [ ] Node.js app started (via cPanel or forever)
- [ ] Frontend uploaded to public_html/a1construction/
- [ ] .htaccess file in place
- [ ] Test: `https://a1.sunsysweb.co.in/api/health` returns OK
- [ ] Test: Frontend loads and makes API calls
- [ ] Logs being written and no errors

---

**What method works best for you?** Let me know and I can provide more specific steps.
