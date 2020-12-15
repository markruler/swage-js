Write-Host "Check variables..."
Write-Host "package.json: version"
Write-Host "main.js: development, version"

Write-Host "Remove $DIST_PATH"
Set-Variable -Name "DIST_PATH" -Value "dist/"
Remove-Item $DIST_PATH -Force -Recurse
Remove-Item *.tgz -Force

Write-Host "Build..."
npm run build

Write-Host "Package..."
npm pack

Write-Host "Publish..."
npm publish --access public
