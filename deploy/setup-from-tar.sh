#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# CreeperCastle — setup script (files already on server via scp)
# Run from /var/www/creepercastle after extracting the tar
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="new.creepercastle.cloud"
APP_DIR="/var/www/creepercastle"
NGINX_CONF="/etc/nginx/sites-available/$DOMAIN"

echo "==> [1/8] System packages"
sudo apt-get update -y
sudo apt-get install -y curl git nginx certbot python3-certbot-nginx

echo "==> [2/8] Node.js 20 via NodeSource"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "==> [3/8] PM2"
sudo npm install -g pm2

echo "==> [4/8] Build frontend"
cd "$APP_DIR"
npm install
VITE_API_URL="" npm run build

echo "==> [5/8] Build backend"
cd "$APP_DIR/server"
npm install
npm run build

echo "==> [6/8] Nginx config"
sudo cp "$APP_DIR/deploy/nginx.conf" "$NGINX_CONF"
sudo ln -sf "$NGINX_CONF" "/etc/nginx/sites-enabled/$DOMAIN"
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

echo "==> [7/8] SSL certificate (Let's Encrypt)"
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos \
  --email noreply@flexeere.net --redirect || \
  echo "    certbot failed — run: sudo certbot --nginx -d $DOMAIN"
sudo systemctl reload nginx

echo "==> [8/8] Start API with PM2"
cd "$APP_DIR"
pm2 delete creepercastle-api 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
sudo env PATH="$PATH:/usr/bin" pm2 startup systemd -u "$USER" --hp "$HOME" | tail -1 | sudo bash || true

echo ""
echo "──────────────────────────────────────────────────────────────"
echo "  Deployment complete!"
echo "  Site  : https://$DOMAIN"
echo "  API   : https://$DOMAIN/api"
echo "  Logs  : pm2 logs creepercastle-api"
echo "──────────────────────────────────────────────────────────────"
