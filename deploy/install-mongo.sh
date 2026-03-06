#!/bin/bash
# !! SECURITY WARNING !!
# All secret values in this file have been replaced with CHANGE_ME placeholders.
# NEVER commit real passwords to git. Edit these values only on the server itself.
set -e

# CHANGE_ME: your sudo password (or use a sudoers NOPASSWD rule instead)
SUDOPASS="CHANGE_ME"

echo "=== Creating MongoDB admin user ==="
mongosh admin --norc --quiet << 'MONGOEOF'
try {
  db.createUser({
    user: "creeperAdmin",
    pwd: "CHANGE_ME_ADMIN_PASSWORD",
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase"]
  });
  print("Admin user created OK");
} catch(e) {
  print("Admin user: " + e.message);
}
MONGOEOF

echo "=== Creating MongoDB app user ==="
mongosh creepercastle --norc --quiet << 'MONGOEOF'
try {
  db.createUser({
    user: "creeperApp",
    pwd: "CHANGE_ME_APP_PASSWORD",
    roles: [{ role: "readWrite", db: "creepercastle" }]
  });
  print("App user created OK");
} catch(e) {
  print("App user: " + e.message);
}
MONGOEOF

echo "=== Enabling MongoDB authentication ==="
if ! grep -q "^security:" /etc/mongod.conf; then
  echo "$SUDOPASS" | sudo -S bash -c 'printf "\nsecurity:\n  authorization: enabled\n" >> /etc/mongod.conf'
  echo "Authentication enabled"
else
  echo "Security block already present"
fi

echo "$SUDOPASS" | sudo -S systemctl restart mongod
sleep 3
echo "$SUDOPASS" | sudo -S systemctl status mongod --no-pager | head -5

echo "=== Verifying login with app credentials ==="
mongosh "mongodb://creeperApp:CHANGE_ME_APP_PASSWORD_URLENCODED@127.0.0.1:27017/creepercastle" --norc --quiet --eval 'print("Auth login OK: " + db.getName())'

echo "=== All done ==="
