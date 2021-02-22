import React, { Component } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import './sample.css';

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

const style = "<style>table{font-size:13px;font-family:Arial;}.bottomborder{margin:0;border-bottom:2px solid #000;color:#333;font-weight:normal; font-size:13px; font-family:Arial;}.page{border:2px solid #000;padding:5px; text-align: center; width:80px;}.title{font-size:20px; font-weight:bold;}.label{font-size:13px;}.label2{font-size:13px; font-weight:bold;}.checklabel{margin:0 5px;}.small{font-size:11px;}th{font-size:14px; font-weight:bold;}.secondtitle{	font-size:16px; font-weight:bold;}.margining{padding:2px 0 2px 22px;}.red{color:#ff0000;}.bold{font-weight:bold;}.green{color:#008000;}</style>";

export default class ChartExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
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
      },
    };
  }

  componentDidMount() {
    let workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    this.setState({ workbook: workbook });
  }

  exportAsExcel = async () => {
    const canvas=document.querySelector('#chart canvas');
    const chartImg = this.state.workbook.addImage({
      base64: canvas.toDataURL(),
      extension: 'png',
    });
    this.state.workbook.worksheets[0].addImage(chartImg, 'B4:P15');
    const buf = await this.state.workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), 'abc.xlsx');
  }

  exportAsWord = async() => {
    const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const postHtml = "</body></html>";
    const canvas = document.querySelector('#chart canvas');
    const content = `<img src="${canvas.toDataURL()}" />`
    const html = `${preHtml}${content}${postHtml}`;
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    let link = document.createElement('A');
    link.href = url;
    link.download = 'Document.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open,
      };
    });
  };
  render() {
    return (<>
        <header>
        <h1>Electrofishing Evaluation Report</h1>
        <div className='dropdown-pan'>
        <button type="button" className="dropdownbut" onClick={this.handleButtonClick}>
        Export <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490.688 490.688" >
<path  d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262  c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667  c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262  L472.328,120.529z"/>
<path d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083  c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262  c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279  C250.748,372.281,248.039,373.408,245.213,373.415z"/>
</svg>
        </button>
        {this.state.open && (
    <div className="dropdown">
      <button onClick={this.exportAsExcel}>Export Chart Excel</button>
      <button onClick={this.exportAsWord}>Export Chart Word</button>
    </div>
  )}
        </div>
    </header>
   
    
    <div id="chart" className="container">
      <AgChartsReact options={this.state.options} />
    </div>

   </>);
  }
}
