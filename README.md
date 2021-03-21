# Swage

> Deprecated: move to [cxsu/swage](https://github.com/cxsu/swage)

> CLI tool for converting Swagger API specification JSON to Excel

## Getting started

![cli](example/cli.gif)

![excel](example/excel.gif)

### Install

```bash
npm install --global swage
```

```bash
yarn global add swage
```

### Command

```bash
swage gen --help

# generate an excel file in the current directory
swage gen <json-path>
```

## Example

- [swagger.json](https://editor.swagger.io/)

```bash
swage gen example/example.json
OUTPUT >>> ./swagger.xlsx
```

### flag `--output`, `-o`

```bash
swage gen example/example.json --output example
OUTPUT >>> ./example/swagger.xlsx
```

## Development

### Build

```bash
npm install
npm run build
```

### Run

```bash
node dist/main.js gen example/example.json --output .
```

### Local Install

```bash
npm run local
# /usr/local/bin/swage -> /usr/local/lib/node_modules/swage/dist/main.js
# + swage@0.4.0
# added 1 package from 1 contributor in 0.667s
```

### Clean

```bash
npm run clean
```

## Reference

- [swagger-codegen](https://github.com/swagger-api/swagger-codegen)
- [JSDoc 3](https://jsdoc.app)
- [Jest](https://jestjs.io)
- [realworld.json](https://github.com/xesina/golang-echo-realworld-example-app)
