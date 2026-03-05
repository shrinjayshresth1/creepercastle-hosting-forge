#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# CreeperCastle — VPS setup script for softauth.flexeere.com
# Run as the 'advps' user on 160.191.11.13
# Usage: bash setup-vps.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="softauth.flexeere.com"
APP_DIR="/var/www/creepercastle"
REPO="https://github.com/MastergamerzxD/creepercastle-hosting-forge.git"
BRANCH="feature/admin"
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
MONGODB_URI=mongodb+srv://shrinjayshresth_db_user:f3qehayXjH7mfgeJ@mycluster.kplyxx5.mongodb.net/creepercastle?appName=MyCluster

# ─── JWT Secrets ──────────────────────────────────────────────────────────────
ACCESS_TOKEN_SECRET=e6ce1744f5f660d0f9a6072499925d78005e7e2a99f85d05e333a70bac214a645db79fb13765223f5227d5939b5155d1279e289d01a49cc70a73bc2d0b31c675
REFRESH_TOKEN_SECRET=3adda260045b361238a201e76832e403ec4c6ad364cd52978834c82e041a188f673d38bdf5124914732d5f4423414f3254b480fb03bc89244a108ddbfa814696
STEP_TOKEN_SECRET=ffb295bb8deb767b406e5d14230d6766546cc8e963b0f858e1c78c95b287fc6720234b83d28cfe20c9f9ebdb08d364a57b6685142a635eeddf802df8cd5c7034

# ─── SMTP ─────────────────────────────────────────────────────────────────────
SMTP_HOST=mail.flexeere.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@flexeere.net
SMTP_PASS=73Hc0N6CKP1V
SMTP_FROM=noreply@flexeere.net

# ─── Fast2SMS ─────────────────────────────────────────────────────────────────
FAST2SMS_API_KEY=zRpbiVCdIcODFgel2j4aquSMAoEUNYy6PvBH03ntfGW8JwX1skxbzjF9VBvfECcRGroQwh5At1e4uP0m

# ─── CORS ─────────────────────────────────────────────────────────────────────
ALLOWED_ORIGINS=https://softauth.flexeere.com,https://creepercastle.cloud
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
