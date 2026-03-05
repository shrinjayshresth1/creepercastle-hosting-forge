#!/bin/bash
set -e

SUDOPASS="6lLb713wmaGl"

echo "=== Creating MongoDB admin user ==="
mongosh admin --norc --quiet << 'MONGOEOF'
try {
  db.createUser({
    user: "creeperAdmin",
    pwd: "CrAdmin@2026!",
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
    pwd: "CrApp@2026!",
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
mongosh "mongodb://creeperApp:CrApp%402026%21@127.0.0.1:27017/creepercastle" --norc --quiet --eval 'print("Auth login OK: " + db.getName())'

echo "=== All done ==="
