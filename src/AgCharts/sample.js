import React, { useRef, useState, useEffect } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import './sample.css';
import extractCSS from "component-css-extractor";

// Source: https://www.gov.uk/government/statistical-data-sets/museums-and-galleries-monthly-visits
var data = [
  { year: '2009', visitors: 40973087 },
  { year: '2010', visitors: 42998338 },
  { year: '2011', visitors: 44934839 },
  { year: '2012', visitors: 46636720 },
  { year: '2013', visitors: 48772922 },
  { year: '2014', visitors: 50800193 },
  { year: '2015', visitors: 48023342 },
  { year: '2016', visitors: 47271912 },
  { year: '2017', visitors: 47155093 },
  { year: '2018', visitors: 49441678 },
  { year: '2019', visitors: 50368190 },
];

export default function ChartExample() {
  const ref1 = useRef();
  const [options, setOptions] = useState({
    autoSize: true,
    data: data,
    title: {
      text: 'Total Visitors to Museums and Galleries',
      fontSize: 18,
    },
    subtitle: {
      text: 'Source: Department for Digital, Culture, Media & Sport',
    },
    series: [
      {
        type: 'column',
        xKey: 'year',
        yKeys: ['visitors'],
        fills: ['#0084e7'],
        strokes: ['#00407f'],
        shadow: {
          enabled: true,
          xOffset: 3,
        },
      },
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Year' },
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Total visitors' },
        label: {
          formatter: function (params) {
            return params.value / 1000000 + 'M';
          },
        },
      },
    ],
    legend: { enabled: false },
  });
  const [open, setOpen] = useState(false);

  const exportAsExcel = async () => {
    let workbook = new ExcelJS.Workbook();
    let sheet = workbook.addWorksheet("Sample Chart");

    sheet.addRow([options.title.text]);
    sheet.mergeCells(1,1,1,4);
    sheet.addRow(['','Year', 'Visitors']);
    sheet.getRow(1).font = {bold: true};
    sheet.getRow(2).font = {bold: true};

    data.forEach((val)=>{
      sheet.addRow(['',val.year, val.visitors]);
    });

    const canvas=document.querySelector('.chart canvas');
    const chartImg = workbook.addImage({
      base64: canvas.toDataURL(),
      extension: 'png',
    });
    // workbook.worksheets[0].addImage(chartImg, 'B4:P15');
    sheet.addImage(chartImg, {
      tl: {col: 2, row: data.length + 3},
      ext: {width: 720, height: 300}
    });

    const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), 'chart.xlsx');
    handleButtonClick();
  }

  /** possible Word properties
   * mso-header-margin:42.55pt;
   * mso-footer-margin:49.6pt;
   * mso-paper-source:0;
   */
  const exportAsWord = async() => {
    let style = extractCSS(ref1.current);
    // A4 size: 841.95pt 595.35pt;
    // Letter size: 8.5in 11in;
    // Legal size: 8.5in 14in;
    style += `@page WordSection{size: 8.5in 11in;mso-page-orientation: portrait;}\
    div.Section1 {page: WordSection;}\
    table{font-size:13px;font-family:Arial;margin: 0 auto;text-align:center}`;
    console.log("style", style);

    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>\
      <head>\
        <meta charset='utf-8'>\
        <title>Export HTML To Doc</title>\
        <style>${style}</style>\
      </head><body style="tab-interval:.5in"><div class="Section1">`;
    const postHtml = "</div></body></html>";
    const table = document.querySelector('.chart table').innerHTML;
    const canvas = document.querySelector('.chart canvas');
    const content = `<table>${table}</table><br/><img src="${canvas.toDataURL()}" />`
    const html = `${preHtml}${content}${postHtml}`;

    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    let link = document.createElement('A');
    link.href = url;
    link.download = 'Document.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        </div>
        )}
      </div>
    </header>

  <div className="chart" ref={ref1}>
    <table>
      <thead>
        <tr><th colSpan="2">{options.title.text}</th></tr>
        <tr><th>Year</th><th>Visitors</th></tr>
      </thead>
      <tbody>
        {data.map((item,index)=>
          <tr key={index}><td>{item.year}</td><td>{item.visitors}</td></tr>
        )}
      </tbody>
    </table>
    <br/>
    <AgChartsReact options={options} />
  </div>

  </>);
}
