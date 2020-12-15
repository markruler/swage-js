#!/usr/bin/env bash

set -e

package=swage
versions=(
  "0.3.4"
  "0.3.5"
  "0.3.6"
)

for version in "${versions[@]}"; do
  echo "Unpublish...$package@$version"
  npm unpublish $package@$version
done

# npm ERR! code E405
# npm ERR! 405 Method Not Allowed - PUT https://registry.npmjs.org/swage/-rev/20-56f5eac293f8a2b70d474e0f2dcc00b4 - You can no longer unpublish this package.
# npm ERR! Failed criteria:
# npm ERR! has too many downloads
# npm ERR!
# npm ERR! Please deprecate it instead:
# npm ERR! npm deprecate -f 'swage@0.3.4' "this package has been deprecated"
