#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
cd /Users/hienhv/Downloads/WebMoMo_Tracking/profile-hienho
exec npx next dev --port "${PORT:-3000}"
