import * as ExcelJS from 'exceljs';
import * as C from './constants';

export const createWorkbook = () => {
    const settings = {
      views: [{showGridLines: false}],
      pageSetup: { fitToPage: true, fitToWidth: 1,
        margins: {left: 0.25, right: 0.25,top: 0.75, bottom: 0.75, header: 0, footer: 0}
      }
    };
    let workbook = new ExcelJS.Workbook();
    let row, rowData, rowC, colNums, colWidths;

    let sheet1 = workbook.addWorksheet("Page1", settings);
    row = sheet1.addRow([]); row.height = 12;
    row = sheet1.addRow([]); row.height = 30;
    rowData = [
      [2, {value: 'Electrofishing Evaluation Datasheet', font: {...C.fontBold, size:15},
      alignment: C.alignMiddleCenter}],
      [24, {value: 'PAGE 1', font: {size:9}, border: C.borderAllMedium,
        alignment: C.alignMiddleCenter}]
    ];
    C.addRowFromData(row, rowData)
    C.mergeCellsFromData(sheet1, [`B2:W2`, `X2:Y2`]);
    row = sheet1.addRow([]); row.height = 12;

    row = sheet1.addRow([]); row.height = 8;
    C.addRowFromData(row, [[2, {value: '', border:C.borderHeaderTop}]]);
    C.mergeCellsFromData(sheet1, [`B4:Y4`]);

    row = sheet1.addRow([]);
    rowData = [
      [2, {value: "", border: C.borderLeft}],
      [3, {value: "Data Recorded By:"}], [7, {value: "Testing", border: C.borderBottomThin}],
      [9, {value: "Data Entered By:", alignment: C.alignCenter}],
      [12, {value: "Testing", border: C.borderBottomThin}],
      [14, {value: "Plan Finisher:"}], [17, {value: "Testing", border: C.borderBottomThin}],
      [21, {value: "Follow Up By:"}], [23, {value: "Testing", border: C.borderBottomThin}],
      [25, {value: "", border: C.borderRight}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`C5:F5`, `G5:H5`, `I5:K5`, `N5:P5`, `Q5:R5`, `U5:V5`, `W5:X5`])

    row = sheet1.addRow([]);
    rowData = [
      [2, {value: "", border: C.borderLeft}],
      [3, {value: "Management Type:"}], [7, {value: "Testing", border: C.borderBottomThin}],
      [14, {value: "Correspondence Type:"}], [18, {value: "Testing", border: C.borderBottomThin}],
      [25, {value: "", border: C.borderRight}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`C6:F6`, `G6:L6`, `N6:Q6`, `R6:X6`]);

    row = sheet1.addRow([]); row.height = 8;
    C.addRowFromData(row, [[2, {value: '', border:C.borderHeaderBottom}]]);
    C.mergeCellsFromData(sheet1, [`B7:Y7`]);

    row = sheet1.addRow([]); row.height = 12;

    row = sheet1.addRow([]); row.height = 8;
    C.addRowFromData(row, [[2, {value: '', border:C.borderHeaderTop}]]);
    C.mergeCellsFromData(sheet1, [`B9:Y9`]);
    [
      ["Customer:", "Testing", "Date:", "Testing"],
      ["Primary Contact:", "Testing", "Property Name:", "Testing"],
      ["Primary Contact Type:", "Testing", "State/County:", "Testing"],
      ["Work Phone:", "Testing", "Ext:", "Testing", "Primary Uses:", "Testing"],
      ["Home Phone:", "Testing", "Fishing Goals:", "Testing"],
      ["Cell Phone:", "Testing", "Property Type:", "Testing"],
      ["Email:", "Testing"],
    ].forEach(data=>{
      row = sheet1.addRow([]);
      rowData = [
        [2, {value: "", border: C.borderLeft}],
        [3, {value: data[0], font: C.fontBold}],
        [7, {value: data[1], border: C.borderBottomThin}]
      ]
      if (data.length>2) {
        if (data.length<6) {
          rowData = rowData.concat([
            [15, {value: data[2], font: C.fontBold}],
            [18, {value: data[3], border: C.borderBottomThin}],
          ])
        } else {
          rowData = rowData.concat([
            [10, {value: data[2], font: C.fontBold}],
            [12, {value: data[3], border: C.borderBottomThin}],
            [15, {value: data[4], font: C.fontBold}],
            [18, {value: data[5], border: C.borderBottomThin}],
          ])
        }
      }
      rowData.push([25, {value: "", border: C.borderRight}])
      C.addRowFromData(row, rowData);
    })
    for (let i=10; i<=15; i++) {
      if (i===13) continue;
      C.mergeCellsFromData(sheet1, [`C${i}:F${i}`, `G${i}:M${i}`, `O${i}:Q${i}`, `R${i}:X${i}`])
    }
    C.mergeCellsFromData(sheet1, [`C13:F13`, `G13:I13`, `J13:K13`, `L13:M13`, `O13:Q13`,
      `R13:X13`, `C16:F16`, `G16:M16`]);

    row = sheet1.addRow([]); row.height = 8;
    C.addRowFromData(row, [[2, {value: '', border:C.borderHeaderBottom}]]);
    C.mergeCellsFromData(sheet1, [`B17:Y17`]);

    row = sheet1.addRow([]); row.height = 12;

    row = sheet1.addRow([]); row.height = 8;
    C.addRowFromData(row, [
      [2, {value: '', border:C.borderHeaderTop}], [21, {value: '', border:C.borderHeaderTop}]
    ]);
    C.mergeCellsFromData(sheet1, [`B19:S19`, `U19:Y19`]);

    row = sheet1.addRow([]);
    rowData = [
      [2, {value: "", border: C.borderLeft}],
      [3, {value: "Pond Name:", font: C.fontBold}],
      [7, {value: "Testing", border: C.borderBottomThin}],
      [11, {value: "Acres:", font: C.fontBold, alignment: C.alignMiddleCenter}],
      [13, {value: "Testing", border: C.borderBottomThin}],
      [19, {value: "", border: C.borderRight}],
      [21, {value: "GPS Coordinates", border:{...C.borderLeft, ...C.borderRight},
        font: C.fontBold, alignment: C.alignMiddleCenter}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet1.addRow([]); row.height = 8;
    C.addRowFromData(row, [[2, {value: '', border:C.borderHeaderBottom}]]);
    C.mergeCellsFromData(sheet1, [`C20:F20`, `G20:J20`, `K20:L20`, `M20:R20`, `B21:S21`,
      `U20:Y21`])

    row = sheet1.addRow([]); row.height = 12;
    C.addRowFromData(row, [[21, {value: '', border:{...C.borderLeft, ...C.borderRight}}]]);
    C.mergeCellsFromData(sheet1, [`U22:Y22`])
    row = sheet1.addRow([]); row.height = 8;
    C.addRowFromData(row, [
      [2, {value: '', border:C.borderHeaderTop}],
      [21, {value: '', border:{...C.borderLeft, ...C.borderRight}}]
    ]);
    C.mergeCellsFromData(sheet1, [`B23:S23`, `U23:Y23`]);

    row = sheet1.addRow([]);
    rowData = [
      [2, {value: "", border: C.borderLeft}],
      [3, {value: "Recommended BG Harvest:", font: C.fontBold}],
      [8, C.boxChecked], [9, {value: "Suspend"}],
      [11, C.box], [12, {value: "Consumptive"}],
      [14, C.box], [15, {value: "Unlimited"}],
      [19, {value: "", border: C.borderRight}],
      [21, {value: "N:", border:C.borderLeft, font: C.fontBold, alignment: C.alignMiddleCenter}],
      [22, {value: "Testing", border: C.borderBottomThin}],
      [25, {value: "", border: C.borderRight}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`C24:G24`, `I24:J24`, `O24:Q24`, `V24:X24`]);

    row = sheet1.addRow([]);
    rowData = [
      [2, {value: "", border: C.borderLeft}],
      [3, {value: "Recommended LMB Harvest:", font: C.fontBold}],
      [8, C.boxChecked], [9, {value: "Yes"}],
      [10, C.box], [11, {value: "No"}],
      [12, {value: "Inch Group:", alignment: C.alignCenter}],
      [13, {value: "Testing", border: C.borderBottomThin}],
      [16, {value: "Lbs/Acre:", alignment: C.alignCenter}],
      [18, {value: "Testing", border: C.borderBottomThin}],
      [19, {value: "", border: C.borderRight}],
      [21, {value: "W:", border:C.borderLeft, font: C.fontBold, alignment: C.alignMiddleCenter}],
      [22, {value: "Testing", border: C.borderBottomThin}],
      [25, {value: "", border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`C25:G25`, `M25:O25`, `P25:Q25`, `V25:X25`]);

    row = sheet1.addRow([]); row.height = 8;
    C.addRowFromData(row, [
      [2, {value: '', border:C.borderHeaderBottom}], [21, {value: '', border:C.borderHeaderBottom}]
    ]);
    C.mergeCellsFromData(sheet1, [`B26:S26`, `U26:Y26`]);

    row = sheet1.addRow([]); row.height = 12;

    row = sheet1.addRow([]);
    C.addRowFromData(row, [
      [2, {value: {richText:[
        {font: {...C.defaultFont, ...C.fontRed}, text:'*'},
        {font: C.defaultFont, text:'Level:Management Priority Level (1, 2, or 3) / '},
        {font: {...C.defaultFont, ...C.fontRed}, text:'**'},
        {font: C.defaultFont, text:'Status:Confirmed (C); Not Confirmed (NC); Done (DONE); Owner Responsibility (OR); Declined (D)'}
      ]}, alignment: C.alignMiddleCenter}]
    ]);
    C.mergeCellsFromData(sheet1, [`B28:Y28`]);
    row = sheet1.addRow([]); row.height = 8;

    row = sheet1.addRow([]);
    let header = {font: {...C.fontBold, size:10}, border: C.borderAllMedium}
    rowData = [
      [2,{value: 'Order', ...header}],
      [5,{value: 'Date', ...header}],
      [7,{value: 'Recommended Activity', ...header}],
      [16, {value: 'Qty', ...header}],
      [18, {value: 'Unit', ...header}],
      [20, {value: 'Price', ...header}],
      [22, {value: 'Level *', ...header}],
      [24, {value: 'Status **', ...header}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`B30:D30`, `E30:F30`,`G30:O30`, `P30:Q30`, `R30:S30`, `T30:U30`,
      `V30:W30`, `X30:Y30`]);

    row = sheet1.addRow([]); rowC=31;
    rowData = [
      [2,{value: 'Testing', border: C.borderBodyLeft}],
      [5,{value: 'Testing', border: C.borderBodyMiddle}],
      [7,{value: 'Testing', border: C.borderBodyMiddle}],
      [16, {value: 'Testing', border: C.borderBodyMiddle}],
      [18, {value: 'Testing', border: C.borderBodyMiddle}],
      [20, {value: 'Testing', border: C.borderBodyMiddle}],
      [22, {value: 'Testing', border: C.borderBodyMiddle}],
      [24, {value: 'Testing', border: C.borderBodyRight}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`B${rowC}:D${rowC}`, `E${rowC}:F${rowC}`,`G${rowC}:O${rowC}`,
      `P${rowC}:Q${rowC}`, `R${rowC}:S${rowC}`, `T${rowC}:U${rowC}`, `V${rowC}:W${rowC}`,
      `X${rowC}:Y${rowC}`]);

    row = sheet1.addRow([]); rowC++; row.height = 12;

    row = sheet1.addRow([]); rowC++; row.height = 25
    C.addRowFromData(row, [[2, {value: 'Send Management Plan To Information', fill: C.grayBG,
      font: {...C.fontBold, size:11}, alignment: C.alignMiddleCenter, border: C.borderAllMedium}]]);
    C.mergeCellsFromData(sheet1, [`B${rowC}:Y${rowC}`]);

    row = sheet1.addRow([]); rowC++;
    rowData = [
      [2, {value: "Send To:", font: {...C.fontBold, size: 10}, border: C.borderAllMedium}],
      [13, {value: "Send To:", font: {...C.fontBold, size: 10}, border: C.borderAllMedium}]
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`B${rowC}:L${rowC}`, `M${rowC}:Y${rowC}`]);

    row = sheet1.addRow([]); rowC++; row.height = 36;
    rowData = [
      [2, {value: "Mr. Grady  Elder, 4397 Bahia Ln., Destin, FL  32541", font: {size: 9},
        border: C.borderAllMedium, alignment: C.alignMiddle}],
      [13, {value: "", font: {size: 9}, border: C.borderAllMedium}]
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`B${rowC}:L${rowC}`, `M${rowC}:Y${rowC}`]);

    row = sheet1.addRow([]); rowC++;
    rowData = [
      [2, {value: '', border: C.borderLeft}],
      [3, C.boxChecked], [4, {value: 'Bound'}],
      [6, C.box], [7, {value: 'Unbound'}],
      [8, C.box], [9, {value: 'Email PDF?'}],
      [11, C.box], [12, {value: 'Cover Letter?', border: C.borderRight}],
      [14, C.boxChecked], [15, {value: 'Bound'}],
      [17, C.box], [18, {value: 'Unbound'}],
      [20, C.box], [21, {value: 'Email PDF?'}],
      [23, C.box], [24, {value: 'Cover Letter?', border: C.borderRight}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet1, [`D${rowC}:E${rowC}`, `I${rowC}:J${rowC}`, `O${rowC}:P${rowC}`,
      `U${rowC}:V${rowC}`, `X${rowC}:Y${rowC}`]);

    row = sheet1.addRow([]); rowC++;
    C.addRowFromData(row, [
      [2, {value: 'Consulter With: Testing', border: C.borderAllMedium,
        font: {...C.fontBold, size:9}}]
    ])
    C.mergeCellsFromData(sheet1, [`B${rowC}:Y${rowC}`])

    colWidths = [1.4, 0.7, 3, 2.9, 9, 3.7, 8.5, 3.2, 5.2, 3.9, 3.3, 12.5, 1, 2.9, 2.7, 7.3, 3.7, 10, 0.9, 3, 7.2, 4.7, 3.9, 11.1, 0.9];
    C.setColWidths(sheet1, colWidths)


    let sheet2 = workbook.addWorksheet("Page2", settings);
    row = sheet2.addRow([]); row.height = 12;
    row = sheet2.addRow([]); row.height = 26;
    rowData = [
      [2, { value: "Client:", font: C.fontBold}],
      [3, { value: "Testing", border: C.borderBottomThin}],
      [6, { value: "Pond Name:", font: C.fontBold, alignment: C.alignCenter}],
      [10, { value: 'Testing', border: C.borderBottomThin}],
      [17, { value: 'Date:', font: C.fontBold}],
      [18, { value: 'Testing', border: C.borderBottomThin}],
      [23, { value: 'PAGE 2', font: {size: 9}, border: C.borderAllMedium, alignment: C.alignMiddleCenter}]
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet2, ['C2:E2','F2:I2', 'J2:O2', 'R2:U2', 'W2:X2']);

    row = sheet2.addRow([]); row.height = 12;
    row = sheet2.addRow([]);
    C.addRowFromData(row, [[2, {value: 'Pond Assessment / Water Control / Physical Characteristics',
      font: {...C.fontBoldUnderline, size: 11}}]]);
    C.mergeCellsFromData(sheet2, ['B4:X4']);
    row = sheet2.addRow([]); row.height = 12;

    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Date of Impoundment:', font: C.fontBold}],
      [6, {value: 'Testing', border: C.borderBottomThin}],
      [11, {value: 'Dam Type:', font: C.fontBold}],
      [14, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'Condition:', font: C.fontBold}],
      [22, {value: 'Testing', border: C.borderBottomThin}]
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet2, [`B6:E6`, `F6:I6`, `K6:M6`, `N6:Q6`, `S6:U6`, `V6:X6`]);

    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Emergency Spillway:', font: C.fontBold}],
      [6, C.boxChecked], [7, {value:'Yes'}],
      [8, C.box], [9, {value:'No'}],
      [12, {value: 'Spillway Material:', font: C.fontBold}],
      [15, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'Condition:', font: C.fontBold, alignment: C.alignCenter}],
      [22, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet2, [`B7:E7`, `L7:N7`, `O7:R7`, `S7:U7`, `V7:X7`]);

    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Mechanical Spillway:', font: C.fontBold}],
      [6, C.boxChecked], [7, {value:'Yes'}],
      [8, C.box], [9, {value:'No'}],
      [11, {value: 'Diameter (in):', font: C.fontBold}],
      [14, {value: 'Testing', border: C.borderBottomThin}],
      [15, {value: 'Material:', font: C.fontBold, alignment: C.alignCenter}],
      [18, {value: 'Testing', border: C.borderBottomThin}],
      [21, {value: 'Condition:', font: C.fontBold}],
      [24, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet2, [`B8:E8`, `K8:M8`, `O8:Q8`, `R8:S8`, `U8:W8`]);

    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Trash Rack:', font: C.fontBold}],
      [6, C.boxChecked], [7, {value:'Yes'}],
      [8, C.box], [9, {value:'No'}],
      [11, {value: 'Diameter (in):', font: C.fontBold}],
      [14, {value: 'Testing', border: C.borderBottomThin}],
      [15, {value: 'Material:', font: C.fontBold, alignment: C.alignCenter}],
      [18, {value: 'Testing', border: C.borderBottomThin}],
      [21, {value: 'Condition:', font: C.fontBold}],
      [24, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet2, [`B9:E9`, `K9:M9`, `O9:Q9`, `R9:S9`, `U9:W9`]);
    row = sheet2.addRow([]); row.height = 12;

    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Water Source:', font: C.fontBold}],
      [4, {value: 'Testing', border: C.borderBottomThin}],
      [9, {value: 'Water Characteristics', font: {...C.fontBoldUnderline, size: 11},
        alignment: C.alignMiddleCenter}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Depth:', font: C.fontBold}],
      [4, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Topography:', font: C.fontBold}],
      [4, {value: 'Testing', border: C.borderBottomThin}],
      [9, {value: 'Fertility Level:', font: C.fontBold}],
      [15, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Soil Type:', font: C.fontBold}],
      [4, {value: 'Testing', border: C.borderBottomThin}],
      [9, {value: 'Plankton Bloom:', font: C.fontBold}],
      [15, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Landscape:', font: C.fontBold}],
      [4, {value: 'Testing', border: C.borderBottomThin}],
      [9, {value: 'Suspended Solids:', font: C.fontBold}],
      [15, {...C.boxChecked, alignment: C.alignRightMiddle}], [17, {value:'Yes'}],
      [19, {...C.box, alignment: C.alignRightMiddle}], [21, {value:'No'}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Soil Condition:', font: C.fontBold}],
      [4, {value: 'Testing', border: C.borderBottomThin}],
      [9, {value: 'Water Level:', font: C.fontBold}],
      [15, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    for (let i=11; i<=16; i++) {
      C.mergeCellsFromData(sheet2, [`B${i}:C${i}`, `D${i}:F${i}`])
      if (i>12) {
        C.mergeCellsFromData(sheet2, [`I${i}:N${i}`]);
        if (i!==15) C.mergeCellsFromData(sheet2, [`O${i}:V${i}`]);
      }
    }
    C.mergeCellsFromData(sheet2, [`I11:V12`, `O15:P15`, `S15:T15`]);

    row = sheet2.addRow([]); row.height = 12;
    row = sheet2.addRow([]);
    C.addRowFromData(row, [[2, {value: 'Pond Management History',
      font: {...C.fontBoldUnderline, size: 11}}]]);
    C.mergeCellsFromData(sheet2, ['B18:X18']);
    row = sheet2.addRow([]); row.height = 12;

    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Fish Harvest:', font: C.fontBold}],
      [4, {value: 'Bass', font: C.fontBold}],
      [8, {value: 'Testing', border: C.borderBottomThin}],
      [15, {value: 'Annual Pounds Removed:', font: C.fontBold}],
      [23, {value: 'Testing', border: C.borderBottomThin}]
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [4, {value: 'Bluegill', font: C.fontBold}],
      [8, {value: 'Testing', border: C.borderBottomThin}]
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [4, {value: 'Other (specify)', font: C.fontBold}],
      [8, {value: 'Testing', border: C.borderBottomThin}],
      [12, {value: 'None / Limited / Moderate / Adequate / Excessive'}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Liming:', font: C.fontBold}],
      [3, {value: 'Testing', border: C.borderBottomThin}],
      [6, {value: 'Last Limed (year):', alignment: C.alignCenter}],
      [11, {value: 'Testing', border: C.borderBottomThin}],
      [14, {value: 'Qty (tons):', alignment: C.alignRight}],
      [17, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'Did we apply lime?', alignment: C.alignRight}],
      [24, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Fertilizing:', font: C.fontBold}],
      [3, {value: 'Testing', border: C.borderBottomThin}],
      [14, {value: 'Type:', alignment: C.alignRight}],
      [17, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'Do we fertilize?', alignment: C.alignRight}],
      [24, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Feeding:', font: C.fontBold}],
      [3, {value: 'Testing', border: C.borderBottomThin}],
      [14, {value: 'Type:', alignment: C.alignRight}],
      [17, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'Qty (feeders):', alignment: C.alignRight}],
      [24, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Structure:', font: C.fontBold}],
      [3, {value: 'Testing', border: C.borderBottomThin}],
      [14, {value: 'Type:', alignment: C.alignRight}],
      [17, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'Qty (feeders):', alignment: C.alignRight}],
      [24, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Initial Fish Stocking:', font: C.fontBold}],
      [6, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Recent Fish Stocking:', font: C.fontBold}],
      [8, {value: 'Year:', font: C.fontBold, alignment: C.alignRight}],
      [11, {value: 'Testing', border: C.borderBottomThin}],
      [14, {value: 'Source:', font: C.fontBold, alignment: C.alignRight}],
      [17, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'Species:', font: C.fontBold, alignment: C.alignRight}],
      [23, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet2.addRow([]);
    C.addRowFromData(row, [[2, {value: '(from sources other than SEPM)', font: {size:7}}]]);
    row = sheet2.addRow([]); row.height = 12;
    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Grass Carp:', font: C.fontBold}],
      [5, {value: 'Testing', border: C.borderBottomThin}],
      [8, {value: 'Number Stocked:', font: C.fontBold, alignment: C.alignCenter}],
      [14, {value: 'Testing', border: C.borderBottomThin}],
      [19, {value: 'When:', font: C.fontBold, alignment: C.alignCenter}],
      [22, {value: 'Testing', border: C.borderBottomThin}],
    ]
    C.addRowFromData(row, rowData);

    C.mergeCellsFromData(sheet2, [`B20:C20`, `D20:G20`, `H20:J20`, `O20:U20`, `W20:X20`,
    `D21:G21`, `H21:J21`, `D22:G22`, `H22:J22`, `L22:U22`,
    `C23:E23`, `F23:J23`, `K23:L23`, `N23:O23`, `Q23:R23`, `S23:V23`,
    `C24:L24`, `N24:O24`, `Q24:R24`, `S24:V24`,
    `C25:L25`, `N25:O25`, `Q25:R25`, `S25:V25`, `C26:L26`, `N26:O26`, `Q26:X26`,
    `B27:E27`, `F27:X27`, `B28:G28`, `H28:I28`, `K28:L28`, `N28:O28`, `S28:U28`, `W28:X28`,
    `B29:G29`, `B31:D31`, `E31:G31`, `H31:M31`, `N31:Q31`, `S31:U31`, `V31:X31`
    ])

    row = sheet2.addRow([]); row.height = 12;

    row = sheet2.addRow([]);
    rowData = [
      [2, {value: 'Aquatic Weeds Observed', font: C.fontBold, border: C.borderHeaderTopLeft,
        alignment: C.alignMiddleCenter}],
      [11, {value: 'Coverage', font: C.fontBold, border: C.borderHeaderMiddle,
        alignment: C.alignMiddleCenter}],
      [18, {value: '% Percentage', font: C.fontBold, border: C.borderHeaderTopRight,
        alignment: C.alignMiddleCenter}],
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet2, [`B33:J33`, `K33:Q33`, `R33:X33`]);
    rowC =  34;
    for (let i=0;i<8;i++) {
      row = sheet2.addRow([]);
      C.addRowFromData(row, [
        [2, {value: '', border: C.borderAll}],
        [11, {value: '', border: C.borderAll}],
        [18, {value: '', border: C.borderAll}]
      ]);
      C.mergeCellsFromData(sheet2, [
        `B${rowC}:J${rowC}`, `K${rowC}:Q${rowC}`, `R${rowC}:X${rowC}`]);
      rowC++;
    }

    colWidths = [2, 10, 4, 3, 3, 3, 6, 4, 2, 1.5, 2.5, 5, 5, 7, 2, 2, 7, 2, 6, 3, 5, 3, 2, 8]
    C.setColWidths(sheet2, colWidths)


    let sheet3 = workbook.addWorksheet("Page3", settings);
    row = sheet3.addRow([]); row.height = 12;
    row = sheet3.addRow([]); row.height = 26;
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
    row = sheet3.addRow([]); row.height = 12;
    row = sheet3.addRow([]); row.height = 10;
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

    row = sheet3.addRow([]); row.height = 12;

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

    row = sheet3.addRow([]); row.height = 10;

    row = sheet3.addRow([]);
    rowData = [[2, {value: 'Logged LMB Details', font: {...C.fontBold, size: 9},
      border: C.borderAllMedium, fill: C.grayBG}]];
    C.addRowFromData(row, rowData);
    sheet3.mergeCells('B12:AD12');

    row = sheet3.addRow([]); row.height = 10;

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

    row = sheet3.addRow([]); rowC++; row.height = 10;

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

    row = sheet3.addRow([]); rowC++; row.height = 12;

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

    row = sheet3.addRow([]); rowC++; row.height = 10;

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

    row = sheet3.addRow([]); rowC++; row.height = 10;

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

    row = sheet3.addRow([]); rowC++; row.height = 10;

    row = sheet3.addRow([]); rowC++;
    rowData = [[2, {value: 'Logged Bluegill Details', font: {...C.fontBold, size: 9},
      border: C.borderAllMedium, fill: C.grayBG}]];
    C.addRowFromData(row, rowData);
    sheet3.mergeCells(`B${rowC}:AD${rowC}`);

    row = sheet3.addRow([]); rowC++; row.height = 10;

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

    row = sheet3.addRow([]); rowC++; row.height = 10;

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

    row = sheet3.addRow([]); rowC++; row.height = 10;

    row = sheet3.addRow([]); rowC++; row.height = 25;
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
    row = sheet4.addRow([]); row.height = 12;
    row = sheet4.addRow([]); row.height = 26;
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
    row = sheet4.addRow([]); row.height = 9;

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
    row = sheet5.addRow([]); row.height = 12;
    row = sheet5.addRow([]); row.height = 26;
    rowData = [
      [2, { value: "Client:", font: C.fontBold}],
      [5, { value: "Testing", border: C.borderBottomThin}],
      [10, { value: "Pond Name:", font: C.fontBold, alignment: C.alignCenter}],
      [15, { value: 'Testing', border: C.borderBottomThin}],
      [21, { value: 'Date:', font: C.fontBold}],
      [22, { value: 'Testing', border: C.borderBottomThin}],
      [26, { value: 'PAGE 5', font: {size: 9}, border: C.borderAllMedium, alignment: C.alignMiddleCenter}]
    ]
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B2:D2', 'E2:I2', 'J2:N2', 'O2:T2', 'V2:X2', 'Z2:AB2']);
    row = sheet5.addRow([]); row.height = 12;
    row = sheet5.addRow([]);
    C.addRowFromData(row, [[2, {value: 'EVALUATION SUMMARY / NOTES', font: C.fontBold}]]);
    row = sheet5.addRow([]); row.height = 55;
    row = sheet5.addRow([]); row.height = 12;
    row = sheet5.addRow([]);
    C.addRowFromData(row, [[2, {value: 'RECOMMENDED MANAGEMENT ACTIVITIES', font: C.fontBold,
      alignment: C.alignMiddleCenter}]]);
    C.mergeCellsFromData(sheet5, [`B4:AB4`, `B5:AB5`, `B7:AB7`]);
    row = sheet5.addRow([]); row.height = 12;

    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderTop}],
      [18, {value:'', border: C.borderHeaderTop}]
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, [`B9:P9`, `R9:AB9`]);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {value:'Lime Application', font: C.fontBold}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, {value:'Recreational Stoking Options', font: C.fontBold}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, [`C10:O10`, `S10:AA10`]);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.boxChecked, border: C.borderLeft}], [4, {value: 'Agricultural lime application:'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: 'tons/acre'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, [`B11:C11`, `D11:J11`, `L11:N11`]);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {...C.boxChecked, alignment: C.alignCenter}], [5, {value: 'Tum-key'}],
      [6, C.box], [7, {value: 'Application Only'}],
      [13, C.box], [14, {value: 'They Load'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Trout'}],
      [24, {value: '', border: C.borderBottomThin}],
      [27, {value: '/acre'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, [`C12:D12`, `G12:L12`, 'N12:O12', 'T12:V12', 'X12:Z12']);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderBottom}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Hybrid striped bass'}],
      [24, {value: '', border: C.borderBottomThin}],
      [27, {value: '/acre'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    C.addRowFromData(row, [
      [18, {value:'', border: C.borderLeft}], [28, {value:'', border: C.borderRight}],
    ])
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderTop}],
      [18, {value:'', border: C.borderLeft}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, [`B13:P13`, 'S13:S14', 'T13:V14', 'X13:Z14', 'AA13:AA14',
      'B15:P15']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {value:'Fertilization', font: C.fontBold}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Channel catfish'}],
      [24, {value: '', border: C.borderBottomThin}],
      [27, {value: '/acre'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['C16:O16', 'T16:V16', 'X16:Z16']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Fertilizer (bulk)'}],
      [8, {...C.box, alignment: C.alignRight}], [10, {value: 'Fertilizer (route)'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Feed-trained LMB'}],
      [24, {value: '', border: C.borderBottomThin}],
      [27, {value: '/acre'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B17:C17', 'D17:G17', 'H17:I17', 'J17:O17', 'T17:V17', 'X17:Z17']);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderBottom}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Crappie'}],
      [24, {value: '', border: C.borderBottomThin}],
      [27, {value: '/acre'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [18, {value:'', border: C.borderLeft}], [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderTop}],
      [18, {value:'', border: C.borderLeft}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B18:P18', 'S18:S19', 'T18:V19', 'X18:Z19', 'AA18:AA19',
      'B20:P20']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {value:'Supplemental Forage Options', font: C.fontBold}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Smallmouth bass'}],
      [24, {value: '', border: C.borderBottomThin}],
      [27, {value: '/acre'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['C21:O21', 'T21:V21', 'X21:Z21']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Intermediate coppernose bluegill'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: '/acre'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Jumbo LMB'}],
      [24, {value: '', border: C.borderBottomThin}],
      [27, {value: 'lbs'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B22:C22', 'D22:J22', 'L22:N22', 'T22:V22', 'X22:Z22']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Crawfish'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: 'lbs/acre'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Shellcracker'}],
      [24, {value: '', border: C.borderBottomThin}],
      [27, {value: '/acre'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B23:C23', 'D23:J23', 'L23:N23', 'T23:V23', 'X23:Z23']);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Golden shiners'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: '/acre'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderHeaderBottom}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderLeft}], [16, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderLeft}], [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderHeaderTop}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B24:C25', 'D24:J25', 'L24:N25', 'O24:O25', 'R24:AB24',
      'R26:AB26']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Tilapia'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: 'lbs/acre'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, {value:'Fish Harvest', font: C.fontBold}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B27:C27', 'D27:J27', 'L27:N27', 'S27:AA27']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Threadfin shad'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: 'loads'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Harvest'}],
      [21, {value: '', border: C.borderBottomThin}], [22, {value: 'inch'}],
      [23, {value: '', border: C.borderBottomThin}], [24, {value: '@'}],
      [25, {value: '', border: C.borderBottomThin}],
      [26, {value: 'lbs/acre', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B28:C28', 'D28:J28', 'L28:N28', 'Z28:AB28' ]);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Gizzard sad'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: 'loads/acre'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Harvest'}],
      [21, {value: '', border: C.borderBottomThin}], [22, {value: 'inch'}],
      [23, {value: '', border: C.borderBottomThin}], [24, {value: '@'}],
      [25, {value: '', border: C.borderBottomThin}],
      [26, {value: 'lbs/acre', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B29:C29', 'D29:J29', 'L29:N29', 'Z29:AB29' ]);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Other:'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: '/acre'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Harvest'}],
      [21, {value: '', border: C.borderBottomThin}], [22, {value: 'inch'}],
      [23, {value: '', border: C.borderBottomThin}], [24, {value: '@'}],
      [25, {value: '', border: C.borderBottomThin}],
      [26, {value: 'lbs/acre', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B30:C30', 'D30:J30', 'L30:N30', 'Z30:AB30' ]);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderBottom}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Suspend Harvest'}],
      [21, {value: '', border: C.borderBottomThin}], [22, {value: '(species)'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [18, {value:'', border: C.borderLeft}], [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderTop}],
      [18, {value:'', border: C.borderLeft}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B31:P31', 'S31:S32', 'T31:T32', 'U31:U32', 'V31:W32',
      'B33:P33']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {value:'Weed Control', font: C.fontBold}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Electrofishing'}],
      [21, {value: '', border: C.borderBottomThin}], [22, {value: 'hours'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['C34:O34']);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Herbicide Application'}],
      [11, {value: '', border: C.borderBottomThin}],
      [14, {value: '(chemical name)', border: C.borderRight}],
      [18, {value:'', border: C.borderHeaderBottom}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderLeft}], [16, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderLeft}], [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderHeaderTop}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B35:C36', 'D35:I36', 'K35:M36', 'N35:P36', 'R35:AB35',
      'R37:AB37']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Grass carp: diploid / triploid'}],
      [12, {value: '', border: C.borderBottomThin}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, {value:'Aeration/Destratification', font: C.fontBold}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B38:C38', 'D38:J38', 'L38:N38', 'S38:AA38']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Aquashade:'}],
      [12, {value: '', border: C.borderBottomThin}],
      [15, {value: 'gallons'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Destrat System:'}],
      [23, {value: '', border: C.borderBottomThin}],
      [26, {value: 'size/type', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B39:C39', 'D39:J39', 'L39:N39', 'W39:Y39', 'Z39:AB39' ]);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderBottom}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Install fountain:'}],
      [23, {value: '', border: C.borderBottomThin}],
      [26, {value: 'size/type', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [18, {value:'', border: C.borderLeft}], [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderTop}],
      [18, {value:'', border: C.borderLeft}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B40:P40', 'S40:S41', 'T40:T41', 'W40:Y41', 'Z40:AB41',
      'B42:P42']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {value:'Supplemental Feeding', font: C.fontBold}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Install aerator:'}],
      [23, {value: '', border: C.borderBottomThin}],
      [26, {value: 'size/type', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['C43:O43', 'W43:Y43', 'Z43:AB43']);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Begin program:'}],
      [7, {value: '', border: C.borderBottomThin}], [9, {value: 'feeders'}],
      [12, {value: 'Model', alignment: C.alignCenter}],
      [15, {value: '', border: C.borderBottomThin}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderHeaderBottom}],
    ]
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderLeft}], [16, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderLeft}], [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderHeaderTop}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B44:C45', 'D44:F45', 'G44:H45', 'I44:J45', 'L44:N45', 'O44:O45',
      'R44:AB44', 'R46:AB46']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Maintain program'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, {value:'Recreational Stoking Options', font: C.fontBold}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B47:C47', 'D47:J47', 'S47:AA47']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Intensify program:'}],
      [7, {value: '', border: C.borderBottomThin}], [9, {value: 'feeders'}],
      [12, {value: 'Model', alignment: C.alignCenter}],
      [15, {value: '', border: C.borderBottomThin}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Add Structure'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B48:C48', 'D48:F48', 'G48:H48', 'I48:J48', 'L48:N48',
    'T48:AA48']);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderBottom}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Drain pond--? Re-stock letter'}],
      [28, {value: '', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [18, {value:'', border: C.borderLeft}], [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderTop}],
      [18, {value:'', border: C.borderLeft}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B49:P49', 'S49:S50', 'T49:AA50', 'B51:P51']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {value:'Trash Rack', font: C.fontBold}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'PondToon information requested'}],
      [28, {value: '', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['C52:O52', 'T52:AA52']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Standpipe diameter'}],
      [7, {value: '', border: C.borderBottomThin}], [9, {value: 'inches'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Deliver fish food'}],
      [22, {value: '', border: C.borderBottomThin}], [23, {value: '(type)'}],
      [25, {value: '', border: C.borderBottomThin}],
      [27, {value: '(#bags)', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B53:C53', 'D53:F53', 'G53:H53', 'I53:J53', 'T53:U53', 'W53:X53',
    'Y53:Z53', 'AA53:AB53']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Install trash rack'}],
      [7, {value: '', border: C.borderBottomThin}], [9, {value: 'inches'}],
      [11, {value: '', border: C.borderBottomThin}], [12, {value: 'up'}],
      [13, {value: '', border: C.borderBottomThin}], [15, {value: 'down'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Install fish barrier:'}],
      [22, {value: '', border: C.borderBottomThin}], [23, {value: '(typespillway width)'}],
      [28, {value: '', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B54:C54', 'D54:F54', 'G54:H54', 'I54:J54', 'M54:N54',
    'T54:U54', 'W54:AA54']);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderBottom}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Nuisance animal control:'}],
      [22, {value: '', border: C.borderBottomThin}],
      [23, {value: '(species)'}],
      [28, {value: '', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [18, {value:'', border: C.borderLeft}], [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderTop}],
      [18, {value:'', border: C.borderLeft}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B55:P55', 'S55:S56', 'T55:U56', 'V55:V56', 'W55:Y56', 'B57:P57']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {value:'Corrective re-stocking/genetics', font: C.fontBold}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Dam and shoreline maintenance'}],
      [28, {value: '', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['C58:O58', 'T58:AA58']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Adult LMB'}],
      [6, {value: '', border: C.borderBottomThin}], [8, {value: '(type)'}],
      [10, {value: '', border: C.borderBottomThin}], [11, {value: '(size)'}],
      [13, {value: '', border: C.borderBottomThin}], [15, {value: '(quanity)'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Install siphon system'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B59:C59', 'D59:E59', 'F59:G59', 'H59:I59', 'K59:L59',
    'M59:N59', 'T59:AA59']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Fing. LMB'}],
      [6, {value: '', border: C.borderBottomThin}], [8, {value: '(type)'}],
      [10, {value: '', border: C.borderBottomThin}], [11, {value: '(size)'}],
      [13, {value: '', border: C.borderBottomThin}], [15, {value: '(quanity)'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Rotenone application (control shad)'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B60:C60', 'D60:E60', 'F60:G60', 'H60:I60', 'K60:L60',
    'M60:N60', 'T60:AA60']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Coppernose Bluegill'}],
      [10, {value: '', border: C.borderBottomThin}], [11, {value: '(size)'}],
      [13, {value: '', border: C.borderBottomThin}], [15, {value: '(quanity)'}],
      [16, {value:'', border: C.borderRight}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Rotenone application (complete renovation)'}],
      [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B61:C61', 'D61:H61', 'K61:L61', 'M61:N61', 'T61:AA61']);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderBottom}],
      [18, {value:'', border: C.borderLeft}],
      [19, C.box], [20, {value: 'Siltation/turbidity control'}],
      [28, {value: '', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [18, {value:'', border: C.borderLeft}], [28, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    row = sheet5.addRow([]); row.height = 8;
    rowData = [
      [2, {value:'', border: C.borderHeaderTop}],
      [18, {value:'', border: C.borderHeaderBottom}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B62:P62', 'S62:S63', 'T62:AA63', 'B64:P64', 'R64:AB64']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {value:'', border: C.borderLeft}],
      [3, {value:'Maintenance', font: C.fontBold}],
      [16, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['C65:O65']);
    row = sheet5.addRow([]);
    rowData = [
      [2, {...C.box, border: C.borderLeft}], [4, {value: 'Annual Evaluation'}],
      [11, {value: '', border: C.borderBottomThin}], [14, {value: '(Month/Year)'}],
      [16, {value:'', border: C.borderRight}],
    ];
    C.addRowFromData(row, rowData);
    C.mergeCellsFromData(sheet5, ['B66:C66', 'D66:I66', 'K66:M66', 'N66:O66']);
    row = sheet5.addRow([]); row.height = 8;
    C.addRowFromData(row, [[2, {value:'', border: C.borderHeaderBottom}]]);
    C.mergeCellsFromData(sheet5, ['B67:P67']);

    colWidths = [1.3, 0.7, 3, 3, 10, 4, 1, 3, 3, 4, 3, 3, 3, 3, 9, 0.7, 0.7, 0.7, 4, 13, 6, 7, 4, 3, 5, 2, 6, 1]
    C.setColWidths(sheet5, colWidths);

    let sheet6 = workbook.addWorksheet("Page6", settings);
    rowC = 1;
    row = sheet6.addRow([]); row.height = 12;
    row = sheet6.addRow([]); rowC++; row.height = 26;
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

    row = sheet6.addRow([]); rowC++; row.height = 12;

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