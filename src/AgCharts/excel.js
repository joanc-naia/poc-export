import * as ExcelJS from 'exceljs';

export const createWorkbook = async () => {
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
    let row;

    let sheet1 = workbook.addWorksheet("Page1", settings);
    let sheet2 = workbook.addWorksheet("Page2", settings);
    let sheet3 = workbook.addWorksheet("Page3", settings);
    let sheet4 = workbook.addWorksheet("Page4", settings);

    row = sheet4.addRow([]);
    row.height = 12;
    row = sheet4.addRow([], 'i');
    row.height = 26;
    row.getCell(2).value = 'Client';
    row.getCell(2).font = {bold: true};
    row.getCell(3).value = 'Testing';
    row.getCell(3).border = {bottom: {style: 'thin'}}
    row.getCell(8).value = 'Pond Name:'
    row.getCell(8).font = {bold: true};
    row.getCell(10).value = 'Testing'
    row.getCell(10).border = {bottom: {style: 'thin'}}
    row.getCell(14).value = 'Date:'
    row.getCell(14).font = {bold: true};
    row.getCell(16).value = 'Testing'
    row.getCell(16).border = {bottom: {style: 'thin'}}
    row.getCell(19).value = 'PAGE 4'
    row.getCell(19).font = {size: 9}
    row.getCell(19).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(19).border = {top: {style: 'medium'}, left: {style: 'medium'}, bottom: {style: 'medium'}, right: {style: 'medium'}}
    sheet4.mergeCells('C2:F2');
    sheet4.mergeCells('H2:I2');
    sheet4.mergeCells('J2:L2');
    sheet4.mergeCells('N2:O2');
    sheet4.mergeCells('P2:Q2');
    row = sheet4.addRow([]);
    row.height = 9;

    row = sheet4.addRow([]);
    row.getCell(2).value = 'Shellcracker';
    row.getCell(2).border = {top: {style: 'medium'}, left: {style: 'medium'}, right: {style: 'thin'}};
    row.getCell(4).value = 'Threadfin shad';
    row.getCell(4).border = {top: {style: 'medium'}, right: {style: 'thin'}, left: {style: 'thin'}};
    row.getCell(6).value = 'Crappie';
    row.getCell(6).border = {top: {style: 'medium'}, right: {style: 'thin'}, left: {style: 'thin'}};
    row.getCell(9).value = 'Catfish';
    row.getCell(9).border = {top: {style: 'medium'}, right: {style: 'thin'}, left: {style: 'thin'}};
    row.getCell(11).value = 'Gizzard Shad';
    row.getCell(11).border = {top: {style: 'medium'}, right: {style: 'thin'}, left: {style: 'thin'}};
    row.getCell(12).value = 'Gold. Shiner';
    row.getCell(12).border = {top: {style: 'medium'}, right: {style: 'thin'}, left: {style: 'thin'}};
    row.getCell(15).value = 'Other:___________';
    row.getCell(15).border = {top: {style: 'medium'}, right: {style: 'thin'}, left: {style: 'thin'}};
    row.getCell(17).value = 'Other:___________';
    row.getCell(17).border = {top: {style: 'medium'}, right: {style: 'medium'}, left: {style: 'thin'}};
    sheet4.mergeCells('B4:C4');
    sheet4.mergeCells('D4:E4');
    sheet4.mergeCells('F4:H4');
    sheet4.mergeCells('I4:J4');
    sheet4.mergeCells('L4:N4');
    sheet4.mergeCells('O4:P4');
    sheet4.mergeCells('Q4:S4');

    const colNums = [2,4,6,9,11,12,15,17];
    row.eachCell((cell, colNum)=>{
      cell.font = {bold: true}
    });

    row = sheet4.addRow([]);
    colNums.forEach(num=>{
      row.getCell(num).value = 'Length(Inches)';
      row.getCell(num).font = {bold: true};
      if (num === 2)
        row.getCell(2).border = {bottom: {style: 'thin'}, left: {style: 'medium'}, right: {style: 'thin'}};
      else if (num === 17)
        row.getCell(17).border = {bottom: {style: 'thin'}, right: {style: 'medium'}, left: {style: 'thin'}};
      else
        row.getCell(num).border = {bottom: {style: 'thin'}, right: {style: 'thin'}, left: {style: 'thin'}};
    });
    sheet4.mergeCells('B5:C5');
    sheet4.mergeCells('D5:E5');
    sheet4.mergeCells('F5:H5');
    sheet4.mergeCells('I5:J5');
    sheet4.mergeCells('L5:N5');
    sheet4.mergeCells('O5:P5');
    sheet4.mergeCells('Q5:S5');

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
        if (colNums[i] === 2)
          row.getCell(2).border = {bottom: {style: 'thin'}, left: {style: 'medium'}, right: {style: 'thin'}};
        else if (colNums[i] === 17)
          row.getCell(17).border = {bottom: {style: 'thin'}, right: {style: 'medium'}, left: {style: 'thin'}};
        else
          row.getCell(colNums[i]).border = {bottom: {style: 'thin'}, right: {style: 'thin'}, left: {style: 'thin'}};
      });
      sheet4.mergeCells(`B${6+i}:C${6+i}`);
      sheet4.mergeCells(`D${6+i}:E${6+i}`);
      sheet4.mergeCells(`F${6+i}:H${6+i}`);
      sheet4.mergeCells(`I${6+i}:J${6+i}`);
      sheet4.mergeCells(`L${6+i}:N${6+i}`);
      sheet4.mergeCells(`O${6+i}:P${6+i}`);
      sheet4.mergeCells(`Q${6+i}:S${6+i}`);
    })

    const colWidths = [1, 8.5, 2.5, 8.5, 5.9, 6.6, 1.5, 4.5, 6.5, 5.2, 11.6, 5.7, 0.9, 4.5, 1.3, 11.8, 6.6, 1.3, 8.5]
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