#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# CreeperCastle — VPS setup script for new.creepercastle.cloud
# Run as the 'advps' user on 103.124.208.13
# Usage: bash setup-vps.sh
#
# !! SECURITY WARNING !!
# All secret values in this file have been replaced with CHANGE_ME placeholders.
# NEVER commit real credentials to git. Fill in values only on the server itself.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="new.creepercastle.cloud"
APP_DIR="/var/www/creepercastle"
REPO="https://github.com/flexeere/creeper-web.git"
BRANCH="main"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"

echo "==> [1/9] System packages"
sudo apt-get update -y
sudo apt-get install -y curl git nginx certbot python3-certbot-nginx ufw

echo "==> [2/9] Node.js 20 via NodeSource"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "==> [3/9] PM2"
sudo npm install -g pm2

echo "==> [4/9] Clone / pull repo"
if [ -d "$APP_DIR/.git" ]; then
  echo "    Repo exists — pulling latest"
  cd "$APP_DIR"
  git fetch origin
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
else
  sudo mkdir -p "$APP_DIR"
  sudo chown "$USER":"$USER" "$APP_DIR"
  git clone --branch "$BRANCH" "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

echo "==> [5/9] Create server/.env (edit values if needed)"
# Only write if it doesn't already exist on the server
if [ ! -f "$APP_DIR/server/.env" ]; then
cat > "$APP_DIR/server/.env" << 'ENVEOF'
# ─── Server ───────────────────────────────────────────────────────────────────
PORT=5000
NODE_ENV=production

# ─── MongoDB ──────────────────────────────────────────────────────────────────
# CHANGE_ME: replace with your actual MongoDB connection string
MONGODB_URI=mongodb://127.0.0.1:27017/creepercastle

# ─── JWT Secrets ──────────────────────────────────────────────────────────────
# CHANGE_ME: generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
ACCESS_TOKEN_SECRET=CHANGE_ME_64_BYTE_HEX
REFRESH_TOKEN_SECRET=CHANGE_ME_64_BYTE_HEX
STEP_TOKEN_SECRET=CHANGE_ME_64_BYTE_HEX

# ─── SMTP ─────────────────────────────────────────────────────────────────────
SMTP_HOST=CHANGE_ME
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=CHANGE_ME
SMTP_PASS=CHANGE_ME
SMTP_FROM=CHANGE_ME

# ─── Fast2SMS ─────────────────────────────────────────────────────────────────
# CHANGE_ME: get from fast2sms.com dashboard
FAST2SMS_API_KEY=CHANGE_ME

# ─── CORS ─────────────────────────────────────────────────────────────────────
ALLOWED_ORIGINS=https://new.creepercastle.cloud,https://creepercastle.cloud
ENVEOF
  echo "    server/.env written"
else
  echo "    server/.env already exists — skipping"
fi

echo "==> [6/9] Install dependencies and build"
# Frontend
cd "$APP_DIR"
npm install
VITE_API_URL="" npm run build

# Backend
cd "$APP_DIR/server"
npm install
npm run build   # runs tsc → outputs to server/dist/

echo "==> [7/9] Nginx config"
sudo cp "$APP_DIR/deploy/nginx.conf" "$NGINX_CONF"
sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$DOMAIN"
# Remove default site if still enabled
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "==> [8/9] SSL certificate (Let's Encrypt)"
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos \
  --email noreply@flexeere.net --redirect || \
  echo "    certbot failed — run manually if DNS isn't propagated yet"
sudo systemctl reload nginx

echo "==> [9/9] Start backend with PM2"
cd "$APP_DIR"
pm2 delete creepercastle-api 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
# Register PM2 to start on system boot
sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$USER" --hp "$HOME" | tail -1 | sudo bash || true

echo ""
echo "──────────────────────────────────────────────────────────────"
echo "  Deployment complete!"
echo "  Frontend : https://$DOMAIN"
echo "  API      : https://$DOMAIN/api"
echo "  PM2 log  : pm2 logs creepercastle-api"
echo "──────────────────────────────────────────────────────────────"
