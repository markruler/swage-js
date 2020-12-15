Write-Host "Local Build..."
npm run build

Write-Host "Execute..."
node .\dist\main.js gen .\example\example.json --output . --verbose
