import xl from 'excel4node';
import style from './style.js';

/**
 * @param {string} outputPath to store output
 * @param {Array.<SwaggerAPI>} apiList array of parsed Swagger API
 * @param {boolean} verbose verbose flag
 */
export function generateExcel(apiList, outputPath, verbose) {
  const wb = new xl.Workbook();
  createIndexSheet(wb, apiList);
  apiList.forEach((swaggerAPI, index) => {
    createAPISpecSheet(wb, swaggerAPI, index + 1);
  });
  // prettier-ignore
  wb.write(outputPath, (err, stats) => {
    if (err) {
      console.error(err);
      throw new Error('Failed to write excel file');
    }
    if (verbose) console.debug(stats); // Prints out an instance of a node.js fs.Stats object
    console.info('OUTPUT >>>', outputPath);
  });
}

/**
 * @param {xl.Workbook} wb excel workbook
 * @param {Array.<SwaggerAPI>} index array of parsed Swagger API
 */
function createIndexSheet(wb, apiList) {
  const ws = wb.addWorksheet('INDEX');

  ws.column(1).setWidth(10);
  ws.column(2).setWidth(10);
  ws.column(3).setWidth(10);
  ws.column(4).setWidth(40);
  ws.column(5).setWidth(50);
  ws.row(1).setHeight(20);

  ws.cell(1, 1).style(style.header).string('#');
  ws.cell(1, 2).style(style.header).string('tag');
  ws.cell(1, 3).style(style.header).string('method');
  ws.cell(1, 4).style(style.header).string('path');
  ws.cell(1, 5).style(style.header).string('summary');

  apiList.forEach((api, index) => {
    ws.cell(index + 2, 1)
      .style(style.button)
      .number(index + 1)
      .formula(`=HYPERLINK("#${index + 1}!A1","${index + 1}")`);
    ws.cell(index + 2, 2)
      .style(style.center)
      .string(api.tag);
    ws.cell(index + 2, 3)
      .style(style.center)
      .string(api.method);
    ws.cell(index + 2, 4)
      .style(style.left)
      .string(api.path);
    ws.cell(index + 2, 5)
      .style(style.left)
      .string(api.summary);
  });
}

/**
 * @deprecated
 * @param {number} index
 * @param {string} method
 * @param {string} path
 * @returns {string} replacedName
 */
const convertWorksheetName = (index, method, path) => {
  const worksheetName = `${method}${path}`;
  // https://support.microsoft.com/en-us/office/excel-specifications-and-limits-1672b34d-7043-467e-8e27-269d656771c3?ui=en-us&rs=en-us&ad=us
  const regex = /[\/]/g; // If a worksheet name contains slash(/), Excel viewer alerts "We Found A Problem With Some Content In Excel 'swagger.xlsx'. ..."
  let replacedName = worksheetName.replace(regex, '-');
  replacedName = `${index}-${replacedName}`; // To avoid the problem of duplication
  if (replacedName.length > 31) replacedName = replacedName.substring(0, 31);
  return replacedName;
};

/**
 * @param {xl.Workbook} wb excel workbook
 * @param {Array.<SwaggerAPI>} apiList array of parsed Swagger API
 */
const createAPISpecSheet = (wb, swaggerAPI, index) => {
  // console.debug(`tag : ${swaggerAPI.tag} / swaggerAPI : ${swaggerAPI.path}`);
  // const replacedName = convertWorksheetName(index, swaggerAPI.method, swaggerAPI.path);
  // const ws = wb.addWorksheet(replacedName);

  // TODO: Improve Code Readability
  /**
   * Specification
   */
  let row = 1;
  const ws = wb.addWorksheet(index);
  ws.column(1).setWidth(10);
  ws.column(2).setWidth(15);
  ws.column(6).setWidth(30);
  ws.column(7).setWidth(20);
  ws.cell(row, 7).style(style.button).formula('=HYPERLINK("#index!A1","Back to index")');

  ws.cell(row, 1).string('tag');
  ws.cell(row, 2, row, 6, true).string(`${swaggerAPI.tag}`);
  row++;

  ws.cell(row, 1).string('method');
  ws.cell(row, 2, row, 6, true).string(`${swaggerAPI.method}`);
  row++;

  ws.cell(row, 1).string('path');
  ws.cell(row, 2, row, 6, true).string(`${swaggerAPI.path}`);
  row++;

  ws.cell(row, 1).string('summary');
  ws.cell(row, 2, row, 6, true).string(`${swaggerAPI.summary}`);
  row++;

  ws.cell(row, 1).string('description');
  ws.cell(row, 2, row, 6, true).string(`${swaggerAPI.description}`);
  row++;

  /**
   * REQUEST
   */
  ws.cell(row, 1, row, 6, true).style(style.title).string('REQUEST');
  ws.row(row).setHeight(25);
  row++;
  ws.cell(row, 1).style(style.header).string('required');
  ws.cell(row, 2).style(style.header).string('parameter');
  ws.cell(row, 3).style(style.header).string('type');
  ws.cell(row, 4).style(style.header).string('level');
  ws.cell(row, 5).style(style.header).string('data');
  ws.cell(row, 6).style(style.header).string('description');
  row++;

  // start table body of request parameter
  for (let req in swaggerAPI.request) {
    let requestItem = swaggerAPI.request[req];

    ws.cell(row, 1)
      .style(style.center)
      .string(requestItem.required ? 'O' : 'X');
    if (requestItem.level > 1) {
      style.indent.alignment.indent = Number(requestItem.level) - 1;
      ws.cell(row, 2).style(style.indent);
      // ws.cell(row, 2).style(style.center);
    }
    ws.cell(row, 2).string(requestItem.name);
    ws.cell(row, 3).style(style.center).string(requestItem.paramType);
    ws.cell(row, 4).style(style.center).number(requestItem.level);
    ws.cell(row, 5).style(style.center).string(requestItem.dataType);
    ws.cell(row, 6).style(style.left).string(requestItem.description);
    row++;
  }
  row++;

  /**
   * RESPONSE
   */
  ws.cell(row, 1, row, 6, true).style(style.title).string('RESPONSE');
  ws.row(row).setHeight(25);
  row++;

  ws.cell(row, 1).style(style.header).string('required');
  ws.cell(row, 2).style(style.header).string('parameter');
  ws.cell(row, 3).style(style.header).string('type');
  ws.cell(row, 4).style(style.header).string('level');
  ws.cell(row, 5).style(style.header).string('data');
  ws.cell(row, 6).style(style.header).string('description');
  row++;

  // start table body of response parameter
  for (let res in swaggerAPI.response) {
    let responseItem = swaggerAPI.response[res];

    // ws.cell(row, 1)
    //   .style(style.center)
    //   .string(responseItem.required ? 'O' : 'X');
    if (responseItem.level > 1) {
      style.indent.alignment.indent = responseItem.level;
      ws.cell(row, 2).style(style.indent);
      // max = Math.max(a, b);
      // ws.column(2).setWidth(max);
    }
    ws.cell(row, 2).string(responseItem.name);
    ws.cell(row, 3).style(style.center).string(responseItem.paramType);
    ws.cell(row, 4).style(style.center).number(responseItem.level);
    ws.cell(row, 5).style(style.center).string(responseItem.dataType);
    ws.cell(row, 6).style(style.left).string(responseItem.description);
    row++;
  }
};
