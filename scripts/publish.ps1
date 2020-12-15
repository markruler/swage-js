$ErrorActionPreference = "Stop"

Write-Host "Clean..."
Set-Variable -Name "DIST_PATH" -Value "dist/"
Remove-Item $DIST_PATH -Force -Recurse
Remove-Item *.tgz -Force

Write-Host "Build..."
npm run build
npm version patch

Write-Host "Package..."
npm pack

Write-Host "Publish..."
npm publish --access public
