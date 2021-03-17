import React, { useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';
import './sample.css';
/* eslint import/no-webpack-loader-syntax: off */
import styleAsString from '!!raw-loader!./sample.css';
import * as C from './constants';

var dataElderPondPopulation = [
  { percent: 0, length: '1'},
  { percent: 0, length: '2'},
  { percent: 4, length: '3'},
  { percent: 15, length: '4'},
  { percent: 17, length: '5'},
  { percent: 6, length: '6'},
  { percent: 6, length: '7'},
  { percent: 2, length: '8'},
  { percent: 33, length: '9'},
  { percent: 8.5, length: '10'},
  { percent: 4, length: '11'},
  { percent: 2, length: '12'},
  { percent: 0, length: '13'},
  { percent: 0, length: '14'},
  { percent: 0, length: '15'},
  { percent: 0, length: '16'},
  { percent: 0, length: '17'},
  { percent: 0, length: '18'},
  { percent: 0, length: '19'},
  { percent: 0, length: '20'},
  { percent: 0, length: '21'},
  { percent: 0, length: '22'},
  { percent: 0, length: '23'},
  { percent: 0, length: '24'},
  { percent: 0, length: '25'},
  { percent: 0, length: '26'},
];

export default function ElectroevalGraph() {
  const [options, setOptions] = useState({
    autoSize: true,
    data: dataElderPondPopulation,
    title: {
      text: 'Elder Pond',
      fontSize: 13,
    },
    subtitle: {
      text: 'Bass Population - 2021',
    },
    series: [
      {
        type: 'column',
        xKey: 'length',
        xName: 'Length (inches)',
        yKeys: ['percent'],
        yNames: ['Percent'],
        fills: ['#0084e7'],
        strokes: ['#00407f'],
        shadow: {
          enabled: true,
          xOffset: 3,
        },
      },
    ],
    legend: { enabled: false },
  });
  const [open, setOpen] = useState(false);

  const exportAsExcel = async () => {
    const settings = {
      views: [{showGridLines: false}],
      pageSetup: { fitToPage: true, fitToWidth: 1,
        margins: {left: 0.25, right: 0.25,top: 0.75, bottom: 0.75, header: 0, footer: 0}
      }
    };
    let workbook = new ExcelJS.Workbook();
    let row, rowData, rowC, colNums, colWidths;

    let sheet = workbook.addWorksheet("ElectroEvalGraph", settings);

    row = sheet.addRow([]); row.height = 12;
    row = sheet.addRow([]);
    C.addRowFromData(row, [
      [2, {value: 'Sample Size', font: C.fontBold, border: C.borderAllMedium, alignment: C.alignCenter}],
      [3, {value: 'Mean Length', font: C.fontBold, border: C.borderAllMedium, alignment: C.alignCenter}],
      [5, {value: 'Shock Time', font: C.fontBold, border: C.borderAllMedium, alignment: C.alignCenter}],
      [6, {value: 'Sample Size', font: C.fontBold, border: C.borderAllMedium, alignment: C.alignCenter}],
      [7, {value: 'CPUE (#/hr)', font: C.fontBold, border: C.borderAllMedium, alignment: C.alignCenter}],
      [8, {value: 'Mean Length', font: C.fontBold, border: C.borderAllMedium, alignment: C.alignCenter}],
      [9, {value: 'Mean Weight', font: C.fontBold, border: C.borderAllMedium, alignment: C.alignCenter}],
      [10, {value: 'Mean Wr', font: C.fontBold, border: C.borderAllMedium, alignment: C.alignCenter}],
    ]);
    row = sheet.addRow([]);
    C.addRowFromData(row, [
      [2, {value: '46', border: C.borderAll, alignment: C.alignCenter}],
      [3, {value: '7.18', border: C.borderAll, alignment: C.alignCenter}],
      [5, {value: '1012', border: C.borderAll, alignment: C.alignCenter}],
      [6, {value: '6', border: C.borderAll, alignment: C.alignCenter}],
      [7, {value: '60.47', border: C.borderAll, alignment: C.alignCenter}],
      [8, {value: '10.85', border: C.borderAll, alignment: C.alignCenter}],
      [9, {value: '0.45', border: C.borderAll, alignment: C.alignCenter}],
      [10, {value: '68.83', border: C.borderAll, alignment: C.alignCenter}]
    ])

    row = sheet.addRow([]); row.height = 8;
    row = sheet.addRow([]); row.height = 170;
    row = sheet.addRow([]); row.height = 20;
    row = sheet.addRow([]); row.height = 170;

    const chart1 = document.querySelector('.chart1 canvas');
    const chart2 = document.querySelector('.chart2 canvas');
    const chart3 = document.querySelector('.chart3 canvas');
    const chart1Img = workbook.addImage({
      base64: chart1.toDataURL(),
      extension: 'png',
    });
    const chart2Img = workbook.addImage({
      base64: chart2.toDataURL(),
      extension: 'png',
    });
    const chart3Img = workbook.addImage({
      base64: chart3.toDataURL(),
      extension: 'png',
    });
    sheet.addImage(chart1Img, 'B5:C5');
    sheet.addImage(chart2Img, 'E5:J5');
    sheet.addImage(chart3Img, 'B7:C7');

    C.setColWidths(sheet, [1, 32, 32])

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), 'Chart.xlsx');
    handleButtonClick();
  }

  /** possible Word properties
   * mso-header-margin:42.55pt;
   * mso-footer-margin:49.6pt;
   * mso-paper-source:0;
   */
  const exportAsWord = async() => {
    const chart1 = document.querySelector('.chart1 canvas');
    const chart2 = document.querySelector('.chart2 canvas');
    const chart3 = document.querySelector('.chart3 canvas');

    let style = styleAsString;
    // A4 size: 841.95pt 595.35pt;
    // Letter size: 8.5in 11in;
    // Legal size: 8.5in 14in;
    style += `@page WordSection{size: 8.5in 11in;mso-page-orientation: portrait;}\
    div.Section1 {page: WordSection;}\
    table{font-size:13px;font-family:Arial;margin: 0 auto;text-align:center}`;

    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>\
      <head>\
        <meta charset='utf-8'>\
        <title>Export HTML To Doc</title>\
        <style>${style}</style>\
      </head><body style="tab-interval:.5in"><div class="Section1 chart">`;
    const postHtml = "</div></body></html>";
    const pageHTML = `<div style="width:800px;text-align:center">\
    <table width="100%" cellpadding="0" cellspacing="10">\
      <tr>\
        <td>${document.querySelector('.table1').outerHTML}</td>\
        <td>${document.querySelector('.table2').outerHTML}</td>\
      </tr>\
      <tr>\
        <td><img width="390" src="${chart1.toDataURL()}" style="border:1px solid black" /></td>\
        <td><img width="390" src="${chart2.toDataURL()}" style="border:1px solid black" /></td>\
      </tr>\
      <tr>\
        <td><img width="390" src="${chart3.toDataURL()}" style="border:1px solid black" /></td>\
      </tr>\
    </table>\
    </div>`;
    const html = `${preHtml}${pageHTML}${postHtml}`;

    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    let link = document.createElement('A');
    link.href = url;
    link.download = 'Chart.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleButtonClick();
  }

  const exportAsPdf = () => {
    const chart1 = document.querySelector('.chart1 canvas');
    const chart2 = document.querySelector('.chart2 canvas');
    const chart3 = document.querySelector('.chart3 canvas');
    const pageHTML = `<div style="width:800px;text-align:center">\
    <table width="100%" cellpadding="0" cellspacing="10">\
      <tr>\
        <td>${document.querySelector('.table1').outerHTML}</td>\
        <td>${document.querySelector('.table2').outerHTML}</td>\
      </tr>\
      <tr>\
        <td><img width="390" src="${chart1.toDataURL()}" style="border:1px solid black" /></td>\
        <td><img width="390" src="${chart2.toDataURL()}" style="border:1px solid black" /></td>\
      </tr>\
      <tr>\
        <td><img width="390" src="${chart3.toDataURL()}" style="border:1px solid black" /></td>\
      </tr>\
    </table>\
    </div>`;

    html2pdf(pageHTML, {
			filename: 'Report.pdf',
			jsPDF: { unit: 'px', format: 'letter', hotfixes: ["px_scaling"] },
			margin: [20,5]
		})
		handleButtonClick();
  }

  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (<>
    <header>
      <h1>Sample Chart Report</h1>
      <div className='dropdown-pan'>
        <button type="button" className="dropdownbut" onClick={handleButtonClick}>
          Export
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490.688 490.688" >
            <path  d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262  c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667  c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262  L472.328,120.529z"/>
            <path d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083  c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262  c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279  C250.748,372.281,248.039,373.408,245.213,373.415z"/>
          </svg>
        </button>
        {open && (
        <div className="dropdown">
          <button onClick={exportAsExcel}>Export Chart Excel</button>
          <button onClick={exportAsWord}>Export Chart Word</button>
          <button onClick={exportAsPdf}>Export Chart PDF</button>
        </div>
        )}
      </div>
    </header>

  <div className="chart">
    <table width='100%' cellPadding='0' cellSpacing='30'>
      <tr>
        <td>
          <table width='100%' cellPadding='0' cellSpacing='0'>
            <tr>
              <td>
              <table className="table1" width='100%' cellPadding='5' cellSpacing='0' border='1' bordercolor='#000'>
                <thead>
                  <tr>
                    <th>Sample Size</th>
                    <th>Mean Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>46</td><td>7.18</td></tr>
                </tbody>
              </table>
              </td>
            </tr>
            <tr>
              <td className="chart1">
                <AgChartsReact options={options} />
              </td>
            </tr>
          </table>
        </td>
        <td>
          <table width='100%' cellPadding='0' cellSpacing='0'>
            <tr>
              <td>
              <table className="table2" width='100%' cellPadding='5' cellSpacing='0' border='1' bordercolor='#000'>
                <thead>
                  <tr>
                    <th>Shock Time</th>
                    <th>Sample Size</th>
                    <th>CPUE (#/hr)</th>
                    <th>Mean Length</th>
                    <th>Mean Weight</th>
                    <th>Mean Wr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1012</td>
                    <td>6</td>
                    <td>60.47</td>
                    <td>10.85</td>
                    <td>0.45</td>
                    <td>68.83</td>
                  </tr>
                </tbody>
              </table>
              </td>
            </tr>
            <tr>
              <td className="chart2" >
              <AgChartsReact options={options} />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td className="chart3"><AgChartsReact options={options} /></td>
      </tr>
    </table>
   </div>

  </>);
}
