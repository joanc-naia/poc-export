import React, { useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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
      fontSize: 18,
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
    let workbook = new ExcelJS.Workbook();
    let sheet = workbook.addWorksheet("ElectroEvalGraph");
    let row = sheet.addRow([]);
    row = sheet.addRow([]);
    C.addRowFromData(row, [
      [2, {value: 'Sample Size', font: C.fontBold, fill: C.grayBG, border: C.borderAllMedium,
      alignment: C.alignCenter}],
      [3, {value: 'Mean Length', font: C.fontBold, fill: C.grayBG, border: C.borderAllMedium,
      alignment: C.alignCenter}]
    ]);
    row = sheet.addRow([]);
    C.addRowFromData(row, [
      [2, {value: '46', border: C.borderAll, alignment: C.alignCenter}],
      [3, {value: '7.18', border: C.borderAll, alignment: C.alignCenter}]
    ])

    const canvas=document.querySelector('.chart canvas');
    const chartImg = workbook.addImage({
      base64: canvas.toDataURL(),
      extension: 'png',
    });
    // workbook.worksheets[0].addImage(chartImg, 'B4:P15');
    sheet.addImage(chartImg, {
      tl: {col: 1, row: 5},
      ext: {width: 720, height: 300}
    });

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
    const table = document.querySelector('.chart table').outerHTML;
    const canvas = document.querySelector('.chart canvas');
    const content = `${table}<br/><img width=600 src="${canvas.toDataURL()}" />`
    const html = `${preHtml}${content}${postHtml}`;

    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    let link = document.createElement('A');
    link.href = url;
    link.download = 'Chart.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleButtonClick();
    console.log("style", style)
    console.log(html);
  }

  const exportAsPdf = () => {
    let doc = new jsPDF('p', 'mm', 'letter');

    const canvas = document.querySelector('.chart canvas');
    html2canvas(document.querySelector('.chart table')).then(tableCanv => {
      const imgData = tableCanv.toDataURL('image/png');
      const imgWidth = 50;
      const imgHeight = (tableCanv.height * imgWidth) / tableCanv.width;
      doc.addImage(imgData, 'PNG', 70, 10, imgWidth, imgHeight);
      const chartData = canvas.toDataURL('image/png');
      const chartWidth = 180;
      const chartHeight = (canvas.height * chartWidth) / canvas.width
      doc.addImage(chartData, 'PNG', 20, imgHeight + 30, chartWidth, chartHeight)
      doc.save('download.pdf');
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
    <table>
      <thead><tr>
        <th>Sample Size</th>
        <th>Mean Length</th>
      </tr></thead>
      <tbody>
        <tr><td>46</td><td>7.18</td></tr>
      </tbody>
    </table>
    <br/>
    <AgChartsReact options={options} />
  </div>

  </>);
}
