#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# CreeperCastle — redeploy (pull latest + rebuild + restart)
# Run from /var/www/creepercastle after setup-vps.sh has been done once
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR="/var/www/creepercastle"

echo "==> Pulling latest code"
cd "$APP_DIR"
git pull origin feature/admin

echo "==> Rebuilding frontend"
npm install
VITE_API_URL="" npm run build

echo "==> Rebuilding backend"
cd "$APP_DIR/server"
npm install
npm run build

echo "==> Restarting API"
cd "$APP_DIR"
pm2 restart creepercastle-api

echo "Done! https://new.creepercastle.cloud"
