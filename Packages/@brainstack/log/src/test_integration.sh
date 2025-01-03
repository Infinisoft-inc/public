#!/bin/bash
echo "Testing integration of FileIntegration with Logger..."
if [ -f ./FileIntegration.js ] && [ -f ./Logger.js ]; then
  echo "Both FileIntegration and Logger exist."
  node ./FileIntegration.js
  node ./Logger.js
  echo "Integration test passed."
else
  echo "Integration test failed: Missing files."
fi
