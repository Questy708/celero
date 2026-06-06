#!/bin/bash
cd /home/z/my-project
npx next dev -p 3000 &
echo "Server PID: $!"
# Wait for it to be ready
for i in $(seq 1 30); do
  if curl -s --connect-timeout 1 http://127.0.0.1:3000/ > /dev/null 2>&1; then
    echo "Server is ready!"
    exit 0
  fi
  sleep 1
done
echo "Server failed to start"
exit 1
