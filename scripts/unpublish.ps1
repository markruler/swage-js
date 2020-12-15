Set-Variable -Name "PKG" -Value "swage"
$VERSIONS = @(
  "0.2.0",
  "0.2.1"
)

foreach ($VERSION in $VERSIONS) {
  Write-Host "Unpublish...$PKG@$VERSION"
  npm unpublish $PKG@$VERSION
}
