// https://www.npmjs.com/package/excel4node
const fontHeader = '#313131',
  fillHeader = '#d2ffce',
  fontCell = '#000000',
  fillCell = '#ffffff',
  borderCell = '#efefef';

export default {
  header: {
    alignment: {
      horizontal: 'center', // ['center', 'centerContinuous', 'distributed', 'fill', 'general', 'justify', 'left', 'right']
      vertical: 'center',
      wrapText: false,
    },
    font: {
      color: fontHeader,
      // name: "Consolas",
      name: 'Arial',
      size: 14,
    },
    border: {
      left: {
        //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
        style: 'thin',
        color: fillHeader,
      },
      right: {
        style: 'thin',
        color: fillHeader,
      },
      top: {
        style: 'thin',
        color: fillHeader,
      },
      bottom: {
        style: 'thin',
        color: fillHeader,
      },
    },
    fill: {
      type: 'pattern', // 'gradient', 'pattern', 'none'
      patternType: 'solid', // 'darkDown', 'darkGray', 'darkGrid', 'darkHorizontal', 'darkTrellis', 'darkUp', 'darkVerical', 'gray0625', 'gray125', 'lightDown', 'lightGray', 'lightGrid', 'lightHorizontal', 'lightTrellis', 'lightUp', 'lightVertical', 'mediumGray', 'none', 'solid'
      // bgColor: "#0366d6",
      fgColor: fillHeader,
    },
  },

  left: {
    alignment: {
      horizontal: 'left', // ['center', 'centerContinuous', 'distributed', 'fill', 'general', 'justify', 'left', 'right']
      vertical: 'center',
      wrapText: false,
    },
    font: {
      color: fontCell,
      name: 'Arial',
      size: 12,
    },
    border: {
      left: {
        style: 'thin',
        color: borderCell,
      },
      right: {
        style: 'thin',
        color: borderCell,
      },
      top: {
        style: 'thin',
        color: borderCell,
      },
      bottom: {
        style: 'thin',
        color: borderCell,
      },
    },
    fill: {
      type: 'pattern', // 'gradient', 'pattern', 'none'
      patternType: 'solid', // 'darkDown', 'darkGray', 'darkGrid', 'darkHorizontal', 'darkTrellis', 'darkUp', 'darkVerical', 'gray0625', 'gray125', 'lightDown', 'lightGray', 'lightGrid', 'lightHorizontal', 'lightTrellis', 'lightUp', 'lightVertical', 'mediumGray', 'none', 'solid'
      // bgColor: "#0366d6",
      fgColor: fillCell,
    },
  },

  center: {
    alignment: {
      horizontal: 'center',
      vertical: 'center',
      wrapText: false,
    },
    font: {
      color: fontCell,
      name: 'Arial',
      size: 12,
    },
    border: {
      left: {
        style: 'thin',
        color: borderCell,
      },
      right: {
        style: 'thin',
        color: borderCell,
      },
      top: {
        style: 'thin',
        color: borderCell,
      },
      bottom: {
        style: 'thin',
        color: borderCell,
      },
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      fgColor: fillCell,
    },
  },

  indent: {
    alignment: {
      indent: 1,
      vertical: 'center',
      wrapText: false,
    },
  },

  title: {
    alignment: { horizontal: 'center', vertical: 'center' },
    font: { size: 16 },
  },

  button: {
    alignment: { horizontal: 'center', vertical: 'center' },
    fill: { type: 'pattern', patternType: 'solid', fgColor: '#f6a5a6' },
  },

  // buttonStyle: wb => {
  //   return wb.createStyle({
  //     alignment: { horizontal: 'center' },
  //     fill: { type: 'pattern', patternType: 'solid', fgColor: '#f6a5a6' },
  //   });
  // },
};
