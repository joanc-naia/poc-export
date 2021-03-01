import * as ExcelJS from 'exceljs';

const borderBottomThin = {bottom: {style: 'thin'}};
const borderAll = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
const borderAllMedium = {top: {style: 'medium'}, left: {style: 'medium'}, bottom: {style: 'medium'}, right: {style: 'medium'}};
const borderTop = {top: {style: 'medium'}};
const borderBottom = {bottom:{style:'medium'}};
const borderLeft = {left: {style:'medium'}};
const borderRight = {right: {style: 'medium'}};
const borderHeaderTop = {top: {style: 'medium'}, left: {style: 'medium'}, right: {style: 'medium'}};
const borderHeaderBottom = {bottom: {style: 'medium'}, left: {style: 'medium'}, right: {style: 'medium'}};
const borderHeaderTopLeft = {top: {style: 'medium'}, left: {style: 'medium'}, right: {style: 'thin'}};
const borderHeaderTopRight = {top: {style: 'medium'}, right: {style: 'medium'}, left: {style: 'thin'}};
const borderHeaderMiddle = {top: {style: 'medium'}, right: {style: 'thin'}, left: {style: 'thin'}};
const borderBodyLeft = {bottom: {style: 'thin'}, left: {style: 'medium'}, right: {style: 'thin'}};
const borderBodyRight = {bottom: {style: 'thin'}, right: {style: 'medium'}, left: {style: 'thin'}};
const borderBodyMiddle = {bottom: {style: 'thin'}, right: {style: 'thin'}, left: {style: 'thin'}};
const alignMiddleCenter = { vertical: 'middle', horizontal: 'center', wrapText: true };
const fontBold = {bold: true};
const grayBG = {type: 'pattern', pattern: 'solid', fgColor: {argb:'33D2D2D2'}};

const addRowFromData = (row, rowData) => {
  rowData.forEach(item=>{
    const col = item[0], data = item[1];
    row.getCell(col).value = data.value;
    if (data.font) row.getCell(col).font = data.font;
    if (data.border) row.getCell(col).border = data.border;
    if (data.alignment) row.getCell(col).alignment = data.alignment;
    if (data.fill) row.getCell(col).fill = data.fill;
  })
}
const mergeCellsFromData = (sheet, cellsToMerge) => {
  cellsToMerge.forEach(range=>sheet.mergeCells(range));
}

export const createWorkbook = () => {
    //box: Wingdings o
    //box check: Wingdings þ
    //box shaded: Wingdings n

    const settings = {
      views: [{showGridLines: false}],
      pageSetup: { fitToPage: true, fitToWidth: 1,
        margins: {left: 0.5, right: 0.5,top: 0.75, bottom: 0.75, header: 0, footer: 0}
      }
    };
    const defaultFont = {name: 'Arial', size: 8};
    let workbook = new ExcelJS.Workbook();
    let row, rowData, colNums, colWidths;

    let sheet1 = workbook.addWorksheet("Page1", settings);
    let sheet2 = workbook.addWorksheet("Page2", settings);

    let sheet3 = workbook.addWorksheet("Page3", settings);
    row = sheet3.addRow([]);
    row.height = 12;
    row = sheet3.addRow([]);
    row.height = 26;
    rowData = [
      [2, { value: "Client:", font: fontBold}],
      [5, { value: "Testing", border: borderBottomThin}],
      [10, { value: "Pond Name:", font: fontBold}],
      [15, { value: 'Testing', border: borderBottomThin}],
      [22, { value: 'Date:', font: fontBold}],
      [25, { value: 'Testing', border: borderBottomThin}],
      [28, { value: 'PAGE 3', font: {size: 9}, border: borderAllMedium, alignment: alignMiddleCenter}]
    ]
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, ['B2:C2','E2:H2', 'J2:M2', 'O2:T2', 'V2:W2', 'Y2:Z2', 'AB2:AD2'])
    sheet3.mergeCells();
    row = sheet3.addRow([]);
    row.height = 12;
    row = sheet3.addRow([]);
    row.height = 10;
    rowData = [
      [3, {value: '', border: borderBottom}],
      [20, {value: '', border: borderBottom}],
      [14, {value:"*Insert Tag Numbers below length/weight data in 'Logged' columns",
        font: fontBold, border: borderAllMedium, alignment: alignMiddleCenter }]
    ]
    addRowFromData(row, rowData);
    row = sheet3.addRow([]);
    rowData = [
      [3, {value: '', border: borderLeft}],
      [12, {value: '', border: borderRight}],
      [20, {value: '', border: borderLeft}],
      [29, {value: '', border: borderRight}]
    ]
    addRowFromData(row, rowData);
    row = sheet3.addRow([]);
    rowData = [
      [3, {value: "Alkalinity", border: borderLeft}],
      [6, {value: "Testing", border: borderBottomThin}],
      [9, {value: "ppm", font: fontBold, border: borderRight}],
      [20, {value: "Shock Time", font: fontBold, border: borderLeft}],
      [23, {value: "Testing", border: borderBottomThin}],
      [28, {value: "seconds", font: fontBold, border: borderRight}]
    ]
    addRowFromData(row, rowData);
    row = sheet3.addRow([]);
    rowData = [
      [2, {value: '', border: borderRight}],
      [3, {value: '', border: borderBottom}],
      [13, {value: '', border: borderLeft}],
      [19, {value: '', border: borderRight}],
      [20, {value: '', border: borderBottom}],
      [30, {value: '', border: borderLeft}]
    ]
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, ['C4:L4', 'T4:AC4', 'N4:R8', 'C6:E6', 'F6:H6', 'I6:L6', 'T6:V6', 'W6:AA6', 'AB6:AC6', 'C7:L7', 'T7:AC7']);

    row = sheet3.addRow([]);
    row.height = 12;

    row = sheet3.addRow([]);
    rowData = [
      [2, {value: "Reproduction: ", font: fontBold}],
      [6, {value: "Testing", border: borderBottomThin}],
      [9, {value: "Harvested:", font: fontBold}],
      [13, {value: "Testing", border: borderBottomThin}],
      [17, {value: "Population Status:", font: fontBold}],
      [21, {value: "Testing", border: borderBottomThin}],
      [25, {value: "Other:", font: fontBold}],
      [28, {value: "Testing", border: borderBottomThin}],
    ]
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, ['B10:D10', 'F10:G10', 'I10:K10', 'M10:O10', 'Q10:T10', 'U10:V10', 'Y10:Z10', 'AB10:AD10']);

    row = sheet3.addRow([]);
    row.height = 10;

    row = sheet3.addRow([]);
    rowData = [[2, {value: 'Logged LMB Details', font: fontBold, border: borderAllMedium,
      fill: grayBG}]];
    addRowFromData(row, rowData);
    sheet3.mergeCells('B12:AD12');

    row = sheet3.addRow([]);
    row.height = 10;

    row = sheet3.addRow([]);
    rowData = [
      [2, {value: "Fish #"}],
      [6, {value: "Millimeter"}],
      [9, {value: "Grams"}],
      [12, {value: "Recapture"}],
      [17, {value: "Fish #"}],
      [21, {value: "Millimeter"}],
      [23, {value: "Grams"}],
      [27, {value: "Recapture"}],
    ].map(data=>{
      return [data[0], {...data[1], font: fontBold, fill: grayBG, border: borderAllMedium,
        alignment: alignMiddleCenter}]
    })
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, ['B14:E14', 'F14:H14', 'I14:K14', 'L14:O14', 'Q14:T14', 'U14:V14', 'W14:Z14', 'AA14:AD14'])

    let rowC = 15;
    row = sheet3.addRow([]);
    rowData = [
      [2, {value: "1"}],
      [6, {value: "255"}],
      [9, {value: "196"}],
      [12, {value: "NO"}],
      [17, {value: "2"}],
      [21, {value: "260"}],
      [23, {value: "213"}],
      [27, {value: "NO"}],
    ].map(data=>{
      return [data[0], {...data[1], border: borderAll, alignment: alignMiddleCenter}]
    })
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:E${rowC}`, `F${rowC}:H${rowC}`, `I${rowC}:K${rowC}`, `L${rowC}:O${rowC}`, `Q${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Z${rowC}`, `AA${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "Fish #"}],
      [8, {value: "Millimeter"}],
      [15, {value: "Grams"}],
      [20, {value: "Tag #"}],
      [25, {value: "Recapture"}]
    ].map(data=>{
      return [data[0], {...data[1], border: borderAllMedium, font: fontBold, fill: grayBG,
        alignment: alignMiddleCenter}];
    });
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:G${rowC}`, `H${rowC}:N${rowC}`, `O${rowC}:S${rowC}`,
      `T${rowC}:X${rowC}`, `Y${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: ""}],
      [8, {value: ""}],
      [15, {value: ""}],
      [20, {value: ""}],
      [25, {value: ""}]
    ].map(data=>{
      return [data[0], {...data[1], border: borderAll, alignment: alignMiddleCenter}];
    });
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:G${rowC}`, `H${rowC}:N${rowC}`, `O${rowC}:S${rowC}`,
      `T${rowC}:X${rowC}`, `Y${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 12;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "Logged LMB", fill: grayBG, border: borderHeaderTop}],
    ];
    colNums = [7,8,9,11,12,14,15,16,17,18,20,21,22,23,25,26,27,28,29]
    for (let i = 10; i<=28; i++) {
      rowData.push([colNums[i-10], {value: i, border: borderAll}])
    }
    addRowFromData(row, rowData.map(data=>{
      return [data[0], {...data[1], font: fontBold, alignment: alignMiddleCenter}];
    }));
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Length (Inches)", border: borderHeaderBottom, fill: grayBG,
      alignment: alignMiddleCenter}]];
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC-1}:F${rowC-1}`, `B${rowC}:F${rowC}`,
      `G${rowC-1}:G${rowC}`, `H${rowC-1}:H${rowC}`, `I${rowC-1}:J${rowC}`, `K${rowC-1}:K${rowC}`,
      `L${rowC-1}:M${rowC}`, `N${rowC-1}:N${rowC}`, `O${rowC-1}:O${rowC}`, `P${rowC-1}:P${rowC}`,
      `Q${rowC-1}:Q${rowC}`, `R${rowC-1}:S${rowC}`, `T${rowC-1}:T${rowC}`, `U${rowC-1}:U${rowC}`,
      `V${rowC-1}:V${rowC}`, `W${rowC-1}:X${rowC}`, `Y${rowC-1}:Y${rowC}`, `Z${rowC-1}:Z${rowC}`,
      `AA${rowC-1}:AA${rowC}`, `AB${rowC-1}:AB${rowC}`, `AC${rowC-1}:AD${rowC}`]);
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Count", border: borderHeaderBottom, font: fontBold, fill: grayBG,
      alignment: alignMiddleCenter}]];
    for (let i = 10; i<=28; i++) {
      rowData.push([colNums[i-10], {value: '', border: borderAll}])
    }
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:F${rowC}`, `I${rowC}:J${rowC}`, `L${rowC}:M${rowC}`, `R${rowC}:S${rowC}`,
      `W${rowC}:X${rowC}`, `AC${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "LMB (unlogged)", fill: grayBG, border: borderHeaderTop}],
    ];
    for (let i = 2; i<=20; i++) {
      rowData.push([colNums[i-2], {value: i, border: borderAll}])
    }
    addRowFromData(row, rowData.map(data=>{
      return [data[0], {...data[1], font: fontBold, alignment: alignMiddleCenter}];
    }));
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Length (Inches)", border: borderHeaderBottom, fill: grayBG,
      alignment: alignMiddleCenter}]];
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC-1}:F${rowC-1}`, `B${rowC}:F${rowC}`,
      `G${rowC-1}:G${rowC}`, `H${rowC-1}:H${rowC}`, `I${rowC-1}:J${rowC}`, `K${rowC-1}:K${rowC}`,
      `L${rowC-1}:M${rowC}`, `N${rowC-1}:N${rowC}`, `O${rowC-1}:O${rowC}`, `P${rowC-1}:P${rowC}`,
      `Q${rowC-1}:Q${rowC}`, `R${rowC-1}:S${rowC}`, `T${rowC-1}:T${rowC}`, `U${rowC-1}:U${rowC}`,
      `V${rowC-1}:V${rowC}`, `W${rowC-1}:X${rowC}`, `Y${rowC-1}:Y${rowC}`, `Z${rowC-1}:Z${rowC}`,
      `AA${rowC-1}:AA${rowC}`, `AB${rowC-1}:AB${rowC}`, `AC${rowC-1}:AD${rowC}`]);
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Count", border: borderHeaderBottom, font: fontBold, fill: grayBG,
      alignment: alignMiddleCenter}]];
    colNums = [7,8,9,11,12,14,15,16,17,18,20,21,22,23,25,26,27,28,29]
    for (let i = 2; i<=20; i++) {
      rowData.push([colNums[i-2], {value: '', border: borderAll}])
    }
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:F${rowC}`, `I${rowC}:J${rowC}`, `L${rowC}:M${rowC}`, `R${rowC}:S${rowC}`,
      `W${rowC}:X${rowC}`, `AC${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [4, {value:"Reproduction:", font:fontBold}],
      [8, {value: "Testing", border: borderBottomThin}],
      [17, {value: "Bluegill Type:", font:fontBold}],
      [21, {value: "Testing", border: borderBottomThin}],
    ]
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`D${rowC}:G${rowC}`, `H${rowC}:M${rowC}`, `Q${rowC}:T${rowC}`,
      `U${rowC}:AA${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: 'Logged Bluegill Details', font: fontBold, border: borderAllMedium,
      fill: grayBG}]];
    addRowFromData(row, rowData);
    sheet3.mergeCells(`B${rowC}:AD${rowC}`);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "Fish #"}],
      [6, {value: "Millimeter"}],
      [9, {value: "Grams"}],
      [12, {value: "Recapture"}],
      [17, {value: "Fish #"}],
      [21, {value: "Millimeter"}],
      [23, {value: "Grams"}],
      [27, {value: "Recapture"}],
    ].map(data=>{
      return [data[0], {...data[1], font: fontBold, fill: grayBG, border: borderAllMedium,
        alignment: alignMiddleCenter}]
    })
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:E${rowC}`, `F${rowC}:H${rowC}`, `I${rowC}:K${rowC}`, `L${rowC}:O${rowC}`, `Q${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Z${rowC}`, `AA${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "1"}],
      [6, {value: "255"}],
      [9, {value: "196"}],
      [12, {value: "NO"}],
      [17, {value: "2"}],
      [21, {value: "260"}],
      [23, {value: "213"}],
      [27, {value: "NO"}],
    ].map(data=>{
      return [data[0], {...data[1], border: borderAll, alignment: alignMiddleCenter}]
    })
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:E${rowC}`, `F${rowC}:H${rowC}`, `I${rowC}:K${rowC}`, `L${rowC}:O${rowC}`, `Q${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Z${rowC}`, `AA${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "Logged Bluegill", fill: grayBG, border: borderHeaderTop}],
    ];
    colNums = [7,9,11,13,15,17,19,21,23,26,28]
    for (let i = 2; i<=12; i++) {
      rowData.push([colNums[i-2], {value: i, border: borderAll}])
    }
    addRowFromData(row, rowData.map(data=>{
      return [data[0], {...data[1], font: fontBold, alignment: alignMiddleCenter}];
    }));
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Length (Inches)", border: borderHeaderBottom, fill: grayBG,
      alignment: alignMiddleCenter}]];
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC-1}:F${rowC-1}`, `B${rowC}:F${rowC}`,
      `G${rowC-1}:H${rowC}`, `I${rowC-1}:J${rowC}`, `K${rowC-1}:L${rowC}`,
      `M${rowC-1}:N${rowC}`, `O${rowC-1}:P${rowC}`, `Q${rowC-1}:R${rowC}`, `S${rowC-1}:T${rowC}`,
      `U${rowC-1}:V${rowC}`, `W${rowC-1}:Y${rowC}`, `Z${rowC-1}:AA${rowC}`, `AB${rowC-1}:AD${rowC}`]);
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Count", border: borderHeaderBottom, font: fontBold, fill: grayBG,
      alignment: alignMiddleCenter}]];
    for (let i = 2; i<=12; i++) {
      rowData.push([colNums[i-2], {value: '', border: borderAll}])
    }
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:F${rowC}`, `G${rowC}:H${rowC}`, `I${rowC}:J${rowC}`,
      `K${rowC}:L${rowC}`, `M${rowC}:N${rowC}`, `O${rowC}:P${rowC}`, `Q${rowC}:R${rowC}`,
      `S${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Y${rowC}`, `Z${rowC}:AA${rowC}`,
      `AB${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    row.height = 25;
    rowData = [
      [2, {value: "Bluegill (unlogged)", fill: grayBG, border: borderHeaderTop}],
    ];
    colNums = [7,9,11,13,15,17,19,21,23,26,28]
    for (let i = 2; i<=12; i++) {
      rowData.push([colNums[i-2], {value: i, border: borderAll}])
    }
    addRowFromData(row, rowData.map(data=>{
      return [data[0], {...data[1], font: fontBold, alignment: alignMiddleCenter}];
    }));
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Length (Inches)", border: borderHeaderBottom, fill: grayBG,
      alignment: alignMiddleCenter}]];
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC-1}:F${rowC-1}`, `B${rowC}:F${rowC}`,
      `G${rowC-1}:H${rowC}`, `I${rowC-1}:J${rowC}`, `K${rowC-1}:L${rowC}`,
      `M${rowC-1}:N${rowC}`, `O${rowC-1}:P${rowC}`, `Q${rowC-1}:R${rowC}`, `S${rowC-1}:T${rowC}`,
      `U${rowC-1}:V${rowC}`, `W${rowC-1}:Y${rowC}`, `Z${rowC-1}:AA${rowC}`, `AB${rowC-1}:AD${rowC}`]);
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Count", border: borderHeaderBottom, font: fontBold, fill: grayBG,
      alignment: alignMiddleCenter}]];
    for (let i = 2; i<=12; i++) {
      rowData.push([colNums[i-2], {value: '', border: borderAll}])
    }
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet3, [`B${rowC}:F${rowC}`, `G${rowC}:H${rowC}`, `I${rowC}:J${rowC}`,
      `K${rowC}:L${rowC}`, `M${rowC}:N${rowC}`, `O${rowC}:P${rowC}`, `Q${rowC}:R${rowC}`,
      `S${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Y${rowC}`, `Z${rowC}:AA${rowC}`,
      `AB${rowC}:AD${rowC}`]);

    colWidths = [1, 1.9, 5.5, 2.5, 2.2, 2.5, 5, 5.2, 1.3, 3.2, 5.3, 2.9, 1.9, 4.6, 5.2, 4.8, 5.5, 2.6, 1.9, 5.6, 4.6, 4.5, 3.2, 1.5, 3.8, 4.6, 4.6, 4.9, 3.8, 1]
    colWidths.forEach((num, i)=>{
      sheet3.getColumn(i+1).width = num;
    })
    sheet3.columns.forEach(function (column, i) {
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        cell.font = {...defaultFont, ...cell.font};
      });
    });


    let sheet4 = workbook.addWorksheet("Page4", settings);
    row = sheet4.addRow([]);
    row.height = 12;
    row = sheet4.addRow([]);
    row.height = 26;
    rowData = [
      [2, {value: 'Client:', font: fontBold}],
      [3, {value: 'Testing', border: borderBottomThin}],
      [8, {value: 'Pond Name:', font: fontBold}],
      [10, {value: 'Testing', border: borderBottomThin}],
      [14, {value: 'Date:', font: fontBold}],
      [16, {value: 'Testing', border: borderBottomThin}],
      [19, {value: 'PAGE 4', font: {size: 9}, alignment: alignMiddleCenter, border: borderAllMedium}]
    ];
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet4, ['C2:F2', 'H2:I2', 'J2:L2', 'N2:O2', 'P2:Q2']);
    row = sheet4.addRow([]);
    row.height = 9;

    row = sheet4.addRow([]);
    rowData = [
      [2, {value: 'Shellcracker', border: borderHeaderTopLeft}],
      [4, {value: 'Threadfin shad', border: borderHeaderMiddle}],
      [6, {value: 'Crappie', border: borderHeaderMiddle}],
      [9, {value: 'Catfish', border: borderHeaderMiddle}],
      [11, {value: 'Gizzard Shad', border: borderHeaderMiddle}],
      [12, {value: 'Gold. Shiner', border: borderHeaderMiddle}],
      [15, {value: 'Other:___________', border: borderHeaderMiddle}],
      [17, {value: 'Other:___________', border: borderHeaderTopRight}]
    ];
    addRowFromData(row, rowData);
    mergeCellsFromData(sheet4, ['B4:C4', 'D4:E4', 'F4:H4', 'I4:J4', 'L4:N4', 'O4:P4', 'Q4:S4']);

    colNums = [2,4,6,9,11,12,15,17];
    row.eachCell((cell, colNum)=>{ cell.font = {bold: true} });

    row = sheet4.addRow([]);
    colNums.forEach(num=>{
      row.getCell(num).value = 'Length(Inches)';
      row.getCell(num).font = {bold: true};
      if (num === 2) row.getCell(2).border = borderBodyLeft;
      else if (num === 17) row.getCell(17).border = borderBodyRight;
      else row.getCell(num).border = borderBodyMiddle;
    });
    mergeCellsFromData(sheet4, ['B5:C5', 'D5:E5', 'F5:H5', 'I5:J5', 'L5:N5', 'O5:P5', 'Q5:S5']);

    const page4data = [
      ['2 -','','2 -','2 -','','2 -','2 -','2 -'],
      ['3 -','','3 -','3 -','','3 -','3 -','3 -'],
      ['4 -','1 -','4 -','4 -','1 -','4 -','4 -','4 -'],
      ['5 -','2 -','5 -','5 -','2 -','5 -','5 -','5 -'],
      ['6 -','3 -','6 -','6 -','3 -','6 -','6 -','6 -'],
      ['7 -','4 -','7 -','7 -','4 -','7 -','7 -','7 -'],
      ['8 -','5 -','8 -','8 -','5 -','8 -','8 -','8 -'],
      ['9 -','6 -','9 -','9 -','6 -','9 -','9 -','9 -'],
      ['10 -','7 -','10 -','10 -','7 -','10 -','10 -','10 -'],
      ['11 -','8 -','11 -','11 -','8 -','11 -','11 -','11 -'],
      ['12 -','','12 -','12 -','9 -','12 -','12 -','12 -'],
      ['','','13 -','13 -','10 -','13 -','13 -','13 -'],
      ['','','14 -','14 -','11 -','14 -','14 -','14 -'],
      ['','','15 -','15 -','12 -','15 -','15 -','15 -'],
      ['','','16 -','16 -','13 -','16 -','16 -','16 -'],
      ['','','17 -','17 -','14 -','17 -','17 -','17 -'],
      ['','','18 -','18 -','15 -','18 -','18 -','18 -'],
      ['','','19 -','19 -','16 -','19 -','19 -','19 -'],
      ['','','20 -','20 -','17 -','20 -','20 -','20 -'],
      ['','','','21 -','18 -','','21 -','21 -'],
      ['','','','22 -','19 -','','22 -','22 -'],
      ['','','','23 -','20 -','','23 -','23 -'],
      ['','','','24 -','21 -','','24 -','24 -'],
      ['','','','25 -','22 -','','25 -','25 -'],
      ['','','','26 -','','','26 -','26 -'],
      ['','','','27 -','','','27 -','27 -'],
      ['','','','','','','','']
    ];
    page4data.forEach((rowVals, i) => {
      row = sheet4.addRow([]);
      rowVals.forEach((val, i)=>{
        row.getCell(colNums[i]).value = val;
        if (colNums[i] === 2) row.getCell(2).border = borderBodyLeft;
        else if (colNums[i] === 17) row.getCell(17).border = borderBodyRight;
        else row.getCell(colNums[i]).border = borderBodyMiddle;
      });
      mergeCellsFromData(sheet4, [`B${6+i}:C${6+i}`, `D${6+i}:E${6+i}`, `F${6+i}:H${6+i}`,
        `I${6+i}:J${6+i}`, `L${6+i}:N${6+i}`, `O${6+i}:P${6+i}`, `Q${6+i}:S${6+i}`]);
    })

    colWidths = [1, 8.5, 2.5, 8.5, 5.9, 6.6, 1.5, 4.5, 6.5, 5.2, 11.6, 5.7, 0.9, 4.5, 1.3, 11.8, 6.6, 1.3, 8.5]
    colWidths.forEach((num, i)=>{
      sheet4.getColumn(i+1).width = num;
    })
    sheet4.columns.forEach(function (column, i) {
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        cell.font = {...defaultFont, ...cell.font};
      });
    });

    let sheet5 = workbook.addWorksheet("Page5", settings);
    let sheet6 = workbook.addWorksheet("Page6", settings);

    return workbook;
}