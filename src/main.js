#!/usr/bin/env node

// ESM support
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { parse } from './parser';
import { generateExcel } from './excel';
import { readFileSync } from 'fs';

const args = yargs(hideBin(process.argv))
  .command('gen <json-path>', 'generate an excel file in the current directory', {
    // command option
    output: {
      alias: 'o',
      type: 'string',
      description: 'Excel file path',
    },
  })
  // global option
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    describe: 'Run with verbose logging',
  })
  .version()
  .help()
  .alias('help', 'h')
  .demandCommand(1).argv;

const pathFromArgument = args['json-path'];
const outputFromArgument = args.output;
const verboseFromArgument = args.verbose;

if (verboseFromArgument) {
  console.info(process.platform); // aix, darwin, freebsd, linux, openbsd, sunos, win32
  console.info('>>> INPUT', pathFromArgument);
}

let swagger = readFileSync(pathFromArgument, (err, source) => {
  if (err) {
    console.error(err);
    throw new Error(`Unable to read file "${pathFromArgument}"`);
  } else {
    return source;
  }
});

let json;
try {
  json = JSON.parse(swagger);
} catch (err) {
  throw new Error(`Not a JSON Format`);
}
const apiList = parse(json);
if (!apiList) throw new Error(`Could not find a API`);

// TODO: validate a output argument and check if a file exists
const XLSX = '/swagger.xlsx';
let outputPath = (outputFromArgument || '.') + XLSX;
generateExcel(apiList, outputPath, verboseFromArgument);
