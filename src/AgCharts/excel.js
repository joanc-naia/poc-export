import * as ExcelJS from 'exceljs';
import * as C from './constants';

export const createWorkbook = () => {
    const settings = {
      views: [{showGridLines: false}],
      pageSetup: { fitToPage: true, fitToWidth: 1,
        margins: {left: 0.5, right: 0.5,top: 0.75, bottom: 0.75, header: 0, footer: 0}
      }
    };
    let workbook = new ExcelJS.Workbook();
    let row, rowData, rowC, colNums, colWidths;

    let sheet1 = workbook.addWorksheet("Page1", settings);


    let sheet2 = workbook.addWorksheet("Page2", settings);


    let sheet3 = workbook.addWorksheet("Page3", settings);
    row = sheet3.addRow([]);
    row.height = 12;
    row = sheet3.addRow([]);
    row.height = 26;
    rowData = [
      [2, { value: "Client:", font: C.fontBold}],
      [5, { value: "Testing", border: C.borderBottomThin}],
      [10, { value: "Pond Name:", font: C.fontBold}],
      [15, { value: 'Testing', border: C.borderBottomThin}],
      [22, { value: 'Date:', font: C.fontBold}],
      [25, { value: 'Testing', border: C.borderBottomThin}],
      [28, { value: 'PAGE 3', font: {size: 9}, border: C.borderAllMedium, alignment: C.alignMiddleCenter}]
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, ['B2:C2','E2:H2', 'J2:M2', 'O2:T2', 'V2:W2', 'Y2:Z2', 'AB2:AD2']);
    row = sheet3.addRow([]);
    row.height = 12;
    row = sheet3.addRow([]);
    row.height = 10;
    rowData = [
      [3, {value: '', border: C.borderBottom}],
      [20, {value: '', border: C.borderBottom}],
      [14, {value:"*Insert Tag Numbers below length/weight data in 'Logged' columns",
        font: {...C.fontBold, size: 9}, border: C.borderAllMedium, alignment: C.alignMiddleCenter }]
    ]
    C.addRowFromData(row, rowData);
    row = sheet3.addRow([]);
    rowData = [
      [3, {value: '', border: C.borderLeft}],
      [12, {value: '', border: C.borderRight}],
      [20, {value: '', border: C.borderLeft}],
      [29, {value: '', border: C.borderRight}]
    ]
    C.addRowFromData(row, rowData);
    row = sheet3.addRow([]);
    rowData = [
      [3, {value: "Alkalinity", border: C.borderLeft, font: {...C.fontBold, size: 9}}],
      [6, {value: "Testing", border: C.borderBottomThin, font: {size: 9}}],
      [9, {value: "ppm", font: C.fontBold, border: C.borderRight, font: {...C.fontBold, size: 9}}],
      [20, {value: "Shock Time", font: C.fontBold, border: C.borderLeft,
        font: {...C.fontBold, size: 9}}],
      [23, {value: "Testing", border: C.borderBottomThin, font: {size: 9}}],
      [28, {value: "seconds", font: C.fontBold, border: C.borderRight,
        font: {...C.fontBold, size: 9}}]
    ]
    C.addRowFromData(row, rowData);
    row = sheet3.addRow([]);
    rowData = [
      [2, {value: '', border: C.borderRight}],
      [3, {value: '', border: C.borderBottom}],
      [13, {value: '', border: C.borderLeft}],
      [19, {value: '', border: C.borderRight}],
      [20, {value: '', border: C.borderBottom}],
      [30, {value: '', border: C.borderLeft}]
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, ['C4:L4', 'T4:AC4', 'N4:R8', 'C6:E6', 'F6:H6', 'I6:L6', 'T6:V6', 'W6:AA6', 'AB6:AC6', 'C7:L7', 'T7:AC7']);

    row = sheet3.addRow([]);
    row.height = 12;

    row = sheet3.addRow([]);
    rowData = [
      [2, {value: "Reproduction: ", font: C.fontBold}],
      [6, {value: "Testing", border: C.borderBottomThin}],
      [9, {value: "Harvested:", font: C.fontBold}],
      [13, {value: "Testing", border: C.borderBottomThin}],
      [17, {value: "Population Status:", font: C.fontBold}],
      [21, {value: "Testing", border: C.borderBottomThin}],
      [25, {value: "Other:", font: C.fontBold}],
      [28, {value: "Testing", border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, ['B10:D10', 'F10:G10', 'I10:K10', 'M10:O10', 'Q10:T10', 'U10:V10', 'Y10:Z10', 'AB10:AD10']);

    row = sheet3.addRow([]);
    row.height = 10;

    row = sheet3.addRow([]);
    rowData = [[2, {value: 'Logged LMB Details', font: {...C.fontBold, size: 9},
      border: C.borderAllMedium, fill: C.grayBG}]];
    C.addRowFromData(row, rowData);
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
      return [data[0], {...data[1], font: C.fontBold, fill: C.grayBG, border: C.borderAllMedium,
        alignment: C.alignMiddleCenter}]
    })
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, ['B14:E14', 'F14:H14', 'I14:K14', 'L14:O14', 'Q14:T14', 'U14:V14', 'W14:Z14', 'AA14:AD14'])

    rowC = 15;
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
      return [data[0], {...data[1], border: C.borderAll, alignment: C.alignMiddleCenter}]
    })
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:E${rowC}`, `F${rowC}:H${rowC}`, `I${rowC}:K${rowC}`, `L${rowC}:O${rowC}`, `Q${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Z${rowC}`, `AA${rowC}:AD${rowC}`]);

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
      return [data[0], {...data[1], border: C.borderAllMedium, font: C.fontBold, fill: C.grayBG,
        alignment: C.alignMiddleCenter}];
    });
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:G${rowC}`, `H${rowC}:N${rowC}`, `O${rowC}:S${rowC}`,
      `T${rowC}:X${rowC}`, `Y${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: ""}],
      [8, {value: ""}],
      [15, {value: ""}],
      [20, {value: ""}],
      [25, {value: ""}]
    ].map(data=>{
      return [data[0], {...data[1], border: C.borderAll, alignment: C.alignMiddleCenter}];
    });
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:G${rowC}`, `H${rowC}:N${rowC}`, `O${rowC}:S${rowC}`,
      `T${rowC}:X${rowC}`, `Y${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 12;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "Logged LMB", fill: C.grayBG, border: C.borderHeaderTop}],
    ];
    colNums = [7,8,9,11,12,14,15,16,17,18,20,21,22,23,25,26,27,28,29]
    for (let i = 10; i<=28; i++) {
      rowData.push([colNums[i-10], {value: i, border: C.borderAll}])
    }
    C.addRowFromData(row, rowData.map(data=>{
      return [data[0], {...data[1], font: C.fontBold, alignment: C.alignMiddleCenter}];
    }));
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Length (Inches)", border: C.borderHeaderBottom, fill: C.grayBG,
      alignment: C.alignMiddleCenter}]];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC-1}:F${rowC-1}`, `B${rowC}:F${rowC}`,
      `G${rowC-1}:G${rowC}`, `H${rowC-1}:H${rowC}`, `I${rowC-1}:J${rowC}`, `K${rowC-1}:K${rowC}`,
      `L${rowC-1}:M${rowC}`, `N${rowC-1}:N${rowC}`, `O${rowC-1}:O${rowC}`, `P${rowC-1}:P${rowC}`,
      `Q${rowC-1}:Q${rowC}`, `R${rowC-1}:S${rowC}`, `T${rowC-1}:T${rowC}`, `U${rowC-1}:U${rowC}`,
      `V${rowC-1}:V${rowC}`, `W${rowC-1}:X${rowC}`, `Y${rowC-1}:Y${rowC}`, `Z${rowC-1}:Z${rowC}`,
      `AA${rowC-1}:AA${rowC}`, `AB${rowC-1}:AB${rowC}`, `AC${rowC-1}:AD${rowC}`]);
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Count", border: C.borderHeaderBottom, font: C.fontBold, fill: C.grayBG,
      alignment: C.alignMiddleCenter}]];
    for (let i = 10; i<=28; i++) {
      rowData.push([colNums[i-10], {value: '', border: C.borderAll}])
    }
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:F${rowC}`, `I${rowC}:J${rowC}`, `L${rowC}:M${rowC}`, `R${rowC}:S${rowC}`,
      `W${rowC}:X${rowC}`, `AC${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "LMB (unlogged)", fill: C.grayBG, border: C.borderHeaderTop}],
    ];
    for (let i = 2; i<=20; i++) {
      rowData.push([colNums[i-2], {value: i, border: C.borderAll}])
    }
    C.addRowFromData(row, rowData.map(data=>{
      return [data[0], {...data[1], font: C.fontBold, alignment: C.alignMiddleCenter}];
    }));
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Length (Inches)", border: C.borderHeaderBottom, fill: C.grayBG,
      alignment: C.alignMiddleCenter}]];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC-1}:F${rowC-1}`, `B${rowC}:F${rowC}`,
      `G${rowC-1}:G${rowC}`, `H${rowC-1}:H${rowC}`, `I${rowC-1}:J${rowC}`, `K${rowC-1}:K${rowC}`,
      `L${rowC-1}:M${rowC}`, `N${rowC-1}:N${rowC}`, `O${rowC-1}:O${rowC}`, `P${rowC-1}:P${rowC}`,
      `Q${rowC-1}:Q${rowC}`, `R${rowC-1}:S${rowC}`, `T${rowC-1}:T${rowC}`, `U${rowC-1}:U${rowC}`,
      `V${rowC-1}:V${rowC}`, `W${rowC-1}:X${rowC}`, `Y${rowC-1}:Y${rowC}`, `Z${rowC-1}:Z${rowC}`,
      `AA${rowC-1}:AA${rowC}`, `AB${rowC-1}:AB${rowC}`, `AC${rowC-1}:AD${rowC}`]);
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Count", border: C.borderHeaderBottom, font: C.fontBold, fill: C.grayBG,
      alignment: C.alignMiddleCenter}]];
    colNums = [7,8,9,11,12,14,15,16,17,18,20,21,22,23,25,26,27,28,29]
    for (let i = 2; i<=20; i++) {
      rowData.push([colNums[i-2], {value: '', border: C.borderAll}])
    }
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:F${rowC}`, `I${rowC}:J${rowC}`, `L${rowC}:M${rowC}`, `R${rowC}:S${rowC}`,
      `W${rowC}:X${rowC}`, `AC${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [4, {value:"Reproduction:", font:C.fontBold}],
      [8, {value: "Testing", border: C.borderBottomThin}],
      [17, {value: "Bluegill Type:", font:C.fontBold}],
      [21, {value: "Testing", border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`D${rowC}:G${rowC}`, `H${rowC}:M${rowC}`, `Q${rowC}:T${rowC}`,
      `U${rowC}:AA${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: 'Logged Bluegill Details', font: {...C.fontBold, size: 9},
      border: C.borderAllMedium, fill: C.grayBG}]];
    C.addRowFromData(row, rowData);
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
      return [data[0], {...data[1], font: C.fontBold, fill: C.grayBG, border: C.borderAllMedium,
        alignment: C.alignMiddleCenter}]
    })
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:E${rowC}`, `F${rowC}:H${rowC}`, `I${rowC}:K${rowC}`, `L${rowC}:O${rowC}`, `Q${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Z${rowC}`, `AA${rowC}:AD${rowC}`]);

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
      return [data[0], {...data[1], border: C.borderAll, alignment: C.alignMiddleCenter}]
    })
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:E${rowC}`, `F${rowC}:H${rowC}`, `I${rowC}:K${rowC}`, `L${rowC}:O${rowC}`, `Q${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Z${rowC}`, `AA${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [
      [2, {value: "Logged Bluegill", fill: C.grayBG, border: C.borderHeaderTop}],
    ];
    colNums = [7,9,11,13,15,17,19,21,23,26,28]
    for (let i = 2; i<=12; i++) {
      rowData.push([colNums[i-2], {value: i, border: C.borderAll}])
    }
    C.addRowFromData(row, rowData.map(data=>{
      return [data[0], {...data[1], font: C.fontBold, alignment: C.alignMiddleCenter}];
    }));
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Length (Inches)", border: C.borderHeaderBottom, fill: C.grayBG,
      alignment: C.alignMiddleCenter}]];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC-1}:F${rowC-1}`, `B${rowC}:F${rowC}`,
      `G${rowC-1}:H${rowC}`, `I${rowC-1}:J${rowC}`, `K${rowC-1}:L${rowC}`,
      `M${rowC-1}:N${rowC}`, `O${rowC-1}:P${rowC}`, `Q${rowC-1}:R${rowC}`, `S${rowC-1}:T${rowC}`,
      `U${rowC-1}:V${rowC}`, `W${rowC-1}:Y${rowC}`, `Z${rowC-1}:AA${rowC}`, `AB${rowC-1}:AD${rowC}`]);
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Count", border: C.borderHeaderBottom, font: C.fontBold, fill: C.grayBG,
      alignment: C.alignMiddleCenter}]];
    for (let i = 2; i<=12; i++) {
      rowData.push([colNums[i-2], {value: '', border: C.borderAll}])
    }
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:F${rowC}`, `G${rowC}:H${rowC}`, `I${rowC}:J${rowC}`,
      `K${rowC}:L${rowC}`, `M${rowC}:N${rowC}`, `O${rowC}:P${rowC}`, `Q${rowC}:R${rowC}`,
      `S${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Y${rowC}`, `Z${rowC}:AA${rowC}`,
      `AB${rowC}:AD${rowC}`]);

    row = sheet3.addRow([]); rowC++;
    row.height = 10;

    row = sheet3.addRow([]); rowC++;
    row.height = 25;
    rowData = [
      [2, {value: "Bluegill (unlogged)", fill: C.grayBG, border: C.borderHeaderTop}],
    ];
    colNums = [7,9,11,13,15,17,19,21,23,26,28]
    for (let i = 2; i<=12; i++) {
      rowData.push([colNums[i-2], {value: i, border: C.borderAll}])
    }
    C.addRowFromData(row, rowData.map(data=>{
      return [data[0], {...data[1], font: C.fontBold, alignment: C.alignMiddleCenter}];
    }));
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Length (Inches)", border: C.borderHeaderBottom, fill: C.grayBG,
      alignment: C.alignMiddleCenter}]];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC-1}:F${rowC-1}`, `B${rowC}:F${rowC}`,
      `G${rowC-1}:H${rowC}`, `I${rowC-1}:J${rowC}`, `K${rowC-1}:L${rowC}`,
      `M${rowC-1}:N${rowC}`, `O${rowC-1}:P${rowC}`, `Q${rowC-1}:R${rowC}`, `S${rowC-1}:T${rowC}`,
      `U${rowC-1}:V${rowC}`, `W${rowC-1}:Y${rowC}`, `Z${rowC-1}:AA${rowC}`, `AB${rowC-1}:AD${rowC}`]);
    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: "Count", border: C.borderHeaderBottom, font: C.fontBold, fill: C.grayBG,
      alignment: C.alignMiddleCenter}]];
    for (let i = 2; i<=12; i++) {
      rowData.push([colNums[i-2], {value: '', border: C.borderAll}])
    }
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet3, [`B${rowC}:F${rowC}`, `G${rowC}:H${rowC}`, `I${rowC}:J${rowC}`,
      `K${rowC}:L${rowC}`, `M${rowC}:N${rowC}`, `O${rowC}:P${rowC}`, `Q${rowC}:R${rowC}`,
      `S${rowC}:T${rowC}`, `U${rowC}:V${rowC}`, `W${rowC}:Y${rowC}`, `Z${rowC}:AA${rowC}`,
      `AB${rowC}:AD${rowC}`]);

    colWidths = [1, 1.9, 5.5, 2.5, 2.2, 2.5, 5, 5.2, 1.3, 3.2, 5.3, 2.9, 1.9, 4.6, 5.2, 4.8, 5.5, 2.6, 1.9, 5.6, 4.6, 4.5, 3.2, 1.5, 3.8, 4.6, 4.6, 4.9, 3.8, 1];
    C.setColWidths(sheet3, colWidths);

    let sheet4 = workbook.addWorksheet("Page4", settings);
    row = sheet4.addRow([]);
    row.height = 12;
    row = sheet4.addRow([]);
    row.height = 26;
    rowData = [
      [2, {value: 'Client:', font: C.fontBold}],
      [3, {value: 'Testing', border: C.borderBottomThin}],
      [8, {value: 'Pond Name:', font: C.fontBold}],
      [10, {value: 'Testing', border: C.borderBottomThin}],
      [14, {value: 'Date:', font: C.fontBold}],
      [16, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'PAGE 4', font: {size: 9}, alignment: C.alignMiddleCenter, border: C.borderAllMedium}]
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet4, ['C2:F2', 'H2:I2', 'J2:L2', 'N2:O2', 'P2:Q2']);
    row = sheet4.addRow([]);
    row.height = 9;

    row = sheet4.addRow([]);
    rowData = [
      [2, {value: 'Shellcracker', border: C.borderHeaderTopLeft}],
      [4, {value: 'Threadfin shad', border: C.borderHeaderMiddle}],
      [6, {value: 'Crappie', border: C.borderHeaderMiddle}],
      [9, {value: 'Catfish', border: C.borderHeaderMiddle}],
      [11, {value: 'Gizzard Shad', border: C.borderHeaderMiddle}],
      [12, {value: 'Gold. Shiner', border: C.borderHeaderMiddle}],
      [15, {value: 'Other:___________', border: C.borderHeaderMiddle}],
      [17, {value: 'Other:___________', border: C.borderHeaderTopRight}]
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet4, ['B4:C4', 'D4:E4', 'F4:H4', 'I4:J4', 'L4:N4', 'O4:P4', 'Q4:S4']);

    colNums = [2,4,6,9,11,12,15,17];
    row.eachCell((cell, colNum)=>{ cell.font = {bold: true} });

    row = sheet4.addRow([]);
    colNums.forEach(num=>{
      row.getCell(num).value = 'Length(Inches)';
      row.getCell(num).font = {bold: true};
      if (num === 2) row.getCell(2).border = C.borderBodyLeft;
      else if (num === 17) row.getCell(17).border = C.borderBodyRight;
      else row.getCell(num).border = C.borderBodyMiddle;
    });
    C.mergeCellsFromData(sheet4, ['B5:C5', 'D5:E5', 'F5:H5', 'I5:J5', 'L5:N5', 'O5:P5', 'Q5:S5']);

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
        row.getCell(colNums[i]).font = {size: 9};
        if (colNums[i] === 2) row.getCell(2).border = C.borderBodyLeft;
        else if (colNums[i] === 17) row.getCell(17).border = C.borderBodyRight;
        else row.getCell(colNums[i]).border = C.borderBodyMiddle;
      });
      C.mergeCellsFromData(sheet4, [`B${6+i}:C${6+i}`, `D${6+i}:E${6+i}`, `F${6+i}:H${6+i}`,
        `I${6+i}:J${6+i}`, `L${6+i}:N${6+i}`, `O${6+i}:P${6+i}`, `Q${6+i}:S${6+i}`]);
    })

    colWidths = [1, 8.5, 2.5, 8.5, 5.9, 6.6, 1.5, 4.5, 6.5, 5.2, 11.6, 5.7, 0.9, 4.5, 1.3, 11.8, 6.6, 1.3, 8.5];
    C.setColWidths(sheet4, colWidths);

    let sheet5 = workbook.addWorksheet("Page5", settings);


    let sheet6 = workbook.addWorksheet("Page6", settings);
    rowC = 1;
    row = sheet6.addRow([]);
    row.height = 12;
    row = sheet6.addRow([]); rowC++;
    row.height = 26;
    rowData = [
      [2, { value: "Client:", font: C.fontBold}],
      [5, { value: "Testing", border: C.borderBottomThin}],
      [7, { value: "Pond Name:", font: C.fontBold}],
      [8, { value: 'Testing', border: C.borderBottomThin}],
      [12, { value: 'Date:', font: C.fontBold}],
      [14, { value: 'Testing', border: C.borderBottomThin}],
      [16, { value: 'PAGE 6', font: {size: 9}, border: C.borderAllMedium, alignment: C.alignMiddleCenter}]
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet6, [`B${rowC}:D${rowC}`, `H${rowC}:J${rowC}`, `L${rowC}:M${rowC}`]);

    row = sheet6.addRow([]); rowC++;
    row.height = 12;

    C.page6data.forEach(rowData => {
      row = sheet6.addRow([]); rowC++;
      C.addRowFromData(row, rowData)
      if (rowData.length < 4) //end
        C.mergeCellsFromData(sheet6, [`D${rowC}:G${rowC}`, `J${rowC}:M${rowC}`])
      else if (rowData.length < 5)
        C.mergeCellsFromData(sheet6, [`D${rowC}:G${rowC}`, `J${rowC}:P${rowC}`]);
      else
        C.mergeCellsFromData(sheet6, [`D${rowC}:G${rowC}`, `J${rowC}:K${rowC}`,
          `N${rowC}:P${rowC}`]);
    })

    colWidths = [1, 1.9, 3.9, 3.3, 35, 2, 13, 3.3, 4.2, 17.5, 2.9, 3.2, 3, 12.6, 1.9, 8.5]
    C.setColWidths(sheet6, colWidths);

    return workbook;
}