#!/bin/bash

set -e

# Source NVM scripts
source /usr/local/nvm/nvm.sh

# Start services and loggers.
# ---------------------------

sudo service nginx restart > /tmp/nginx.log

# Ensure permissions are correct.
# -------------------------------

sudo chmod -R 775 /taller/site/

echo ""
echo "--------------------------------------"
echo "------- Machine ready to work! -------"
echo "--------------------------------------"
echo ""
echo "Access your site at http://$(hostname -i)"
echo ""

exec "$@"
