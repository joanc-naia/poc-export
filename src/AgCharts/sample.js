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

  exportAsExcel2 = async () => {
    const preHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><head>${style}</head><body><table><tbody>`;
    const postHtml = `</tbody></table></body></html>`;
    const table = document.querySelector('#reportbody');
    const canvas = document.querySelector('#chart canvas');
    const testImgRow = `<tr><td><img src="${canvas.toDataURL()}"></td></tr>`;
    const html = `${preHtml}${table.innerHTML}${testImgRow}${postHtml}`;
    const url = 'data:application/vnd.ms-excel;base64,' + window.btoa(unescape(encodeURIComponent(html)));
    let link = document.createElement('A');
    link.href = url;
    link.download = 'Document';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportAsWord2 = async () => {
    const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title>${style}</head><body>`;
    const postHtml = "</body></html>";
    const html = `${preHtml}${document.getElementById('report').innerHTML}${postHtml}`;
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    let link = document.createElement('A');
    link.href = url;
    link.download = 'Document.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    return (<>
    <button onClick={this.exportAsExcel}>Export Chart Excel</button>
    <button onClick={this.exportAsWord}>Export Chart Word</button>
    <div id="chart" className="container">
      <AgChartsReact options={this.state.options} />
    </div>

    <button onClick={this.exportAsExcel2}>Export Report Excel</button>
    <button onClick={this.exportAsWord2}>Export Report Word</button>
    <div id="report">

      <table border='0' width='100%' cellpadding='5' cellspacing='0'>
        <tbody id="reportbody">
          <tr>
            <td valign='middle'>
              <table border='0' width='100%' cellpadding='0' cellspacing='0'><tbody>
                <tr>
                  <td align='center' valign='middle'><b class='title'>Electrofishing Evaluation Datasheet</b></td>
                  <td align='right' valign='middle' class='page'>PAGE 1</td>
                </tr>
              </tbody></table>
            </td>
          </tr>
          <tr>
            <td>
              <table border='2' bordercolor='#000' width='100%' cellpadding='0' cellspacing='0'><tbody>
                <tr>
                  <td>
                    <table border='0' width='100%' cellpadding='2' cellspacing='15'><tbody>
                      <tr>
                        <td width='125' valign='bottom' class='label'>Data Recorded By:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' class='label'>Data Entered By:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' class='label' align='right'>Plan Finisher:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' align='right' class='label'>Follow Up By:</td>
                        <td class='bottomborder'>Testing</td>
                      </tr>
                      <tr>
                        <td width='125' class='label'>Management Type:</td>
                        <td colspan='3' class='bottomborder'>Testing</td>
                        <td width='145' align='right' class='label' >Correspondence Type:</td>
                        <td colspan='3' class='bottomborder'>Testing</td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
          <tr>
            <td>
              <table border='2' bordercolor='#000' width='100%' cellpadding='0' cellspacing='0'><tbody>
                <tr>
                  <td>
                    <table border='0' width='100%' cellpadding='2' cellspacing='15'><tbody>
                      <tr>
                        <td width='125' valign='bottom' class='label2'>Customer:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' class='label2'>Date:</td>
                        <td class='bottomborder'>Testing</td>
                      </tr>
                      <tr>
                        <td width='125' valign='bottom' class='label2'>Primary Contact:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' class='label2'>Property Name:</td>
                        <td class='bottomborder'>Testing</td>
                      </tr>
                      <tr>
                        <td width='145' valign='bottom' class='label2'>Primary Contact Type:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' class='label2'>State/County:</td>
                        <td class='bottomborder'>Testing</td>
                      </tr>
                      <tr>
                        <td width='125' valign='bottom' class='label2'>Work Phone:</td>
                        <td><table width='100%' cellpadding='0' cellspacing='0'><tbody>
                          <tr><td class='bottomborder'>Testing</td><td class='label2' width='40' align='center'>Ext:</td><td class='bottomborder'>Testing</td></tr>
                        </tbody></table></td>
                        <td width='125' valign='bottom' class='label2'>Primary Uses:</td>
                        <td class='bottomborder'>Testing</td>
                      </tr>
                      <tr>
                        <td width='125' valign='bottom' class='label2'>Home Phone:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' class='label2'>Fishing Goals:</td>
                        <td class='bottomborder'>Testing</td>
                      </tr>
                      <tr>
                        <td width='125' valign='bottom' class='label2'>Cell Phone:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' class='label2'>Property Type:</td>
                        <td class='bottomborder'>Testing</td>
                      </tr>
                      <tr>
                        <td width='125' valign='bottom' class='label2'>Email:</td>
                        <td class='bottomborder'>Testing</td>
                        <td width='125' valign='bottom' class='label2'></td>
                        <td></td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
          <tr>
            <td valign="middle">
              <table border='0' width='100%' cellpadding='0' cellspacing='0'><tbody>
                <tr>
                  <td align='center' valign='top'>
                    <table border='0' width='100%'  cellpadding='2' cellspacing='0'><tbody>
                      <tr>
                        <td>
                          <table border='2' bordercolor='#000' width='100%' cellpadding='2' cellspacing='15'><tbody>
                            <tr>
                              <td style={{border:'none'}}>
                                <table border='0'  width='100%' cellpadding='0' cellspacing='0'><tbody>
                                  <tr>
                                    <td width='125' valign='bottom' class='label2'>Pond Name:</td>
                                    <td class='bottomborder'>Testing</td>
                                    <td width='60' valign='bottom' align='center' class='label2'>Acres:</td>
                                    <td class='bottomborder'>Testing</td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                          </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table border='2' bordercolor='#000' width='100%' cellpadding='0' cellspacing='0'><tbody>
                            <tr>
                              <td style={{border:'none'}}>
                                <table border='0'  width='100%'  cellpadding='0' cellspacing='15'><tbody>
                                  <tr>
                                    <td width='185' valign='bottom' class='label2'>Recommended BG Harvest:</td>
                                    <td><table border='0' width='100%' cellpadding='0' cellspacing='0'><tbody>
                                      <tr><td><input type='checkbox'/><label class='checklabel'>Suspend</label></td><td><input type='checkbox'/><label class='checklabel'>Consumptive</label></td><td><input type='checkbox'/><label class='checklabel'>Unlimited</label></td></tr>
                                    </tbody></table></td>
                                  </tr>
                                  <tr>
                                    <td width='185' valign='bottom' class='label2'>Recommended LMB Harvest:</td>
                                    <td>
                                      <table border='0' width='100%' cellpadding='0' cellspacing='0'><tbody>
                                        <tr>
                                          <td><input type='checkbox'/><label class='checklabel'>Yes</label></td>
                                          <td><input type='checkbox'/><label class='checklabel'>No</label></td>
                                          <td align='right'><label class='checklabel'>Inch Group:</label></td>
                                          <td class='bottomborder'>Testing</td>
                                          <td align='right'><label class='checklabel'>Lbs/Acre:</label></td>
                                          <td class='bottomborder'>Testing</td>
                                        </tr>
                                      </tbody></table>
                                    </td>
                                  </tr>
                                </tbody></table>
                              </td>
                            </tr>
                          </tbody></table>
                        </td>
                      </tr>
                    </tbody></table>
                  </td>
                  <td align='right' valign='top'>
                    <table border='2' bordercolor='#000' width='100%' cellpadding='2' cellspacing='15'><tbody>
                      <tr>
                        <td style={{border:'none'}}>
                          <table border='0'  width='100%' cellpadding='9' cellspacing='0'><tbody>
                            <tr>
                              <td colspan='2' align='center'><b>GPS Coordinates</b></td>
                            </tr>
                            <tr>
                              <td width='20' valign='bottom' class='label2'>N:</td>
                              <td class='bottomborder'>Testing</td>
                            </tr>
                            <tr>
                              <td width='20' valign='bottom' class='label2'>W:</td>
                              <td class='bottomborder'>Testing</td>
                            </tr>
                          </tbody></table>
                        </td>
                      </tr>
                    </tbody></table>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
          <tr height='20'><td></td></tr>
          <tr>
            <td class='small' align='center'><span style={{color:'#ff0000'}}>*</span>Level:Management Priority Level (1, 2, or 3) / <span style={{color:'#ff0000'}}>**</span>Status:Confirmed (C); Not Confirmed (NC); Done (DONE); Owner Responsibility (OR); Declined (D)</td>
          </tr>
          <tr>
            <td>
              <table border='2' bordercolor='#000' width='100%' cellpadding='10' cellspacing='0'><tbody>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Recommended Activity</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Level *</th>
                  <th>Status **</th>
                </tr>
                <tr>
                  <td>Testing</td>
                  <td>Testing</td>
                  <td>Testing</td>
                  <td>Testing</td>
                  <td>Testing</td>
                  <td>Testing</td>
                  <td>Testing</td>
                  <td>Testing</td>
                </tr>
              </tbody></table>
            </td>
          </tr>
          <tr>
            <td>
              <table border='2' bordercolor='#000' width='100%' cellpadding='10' cellspacing='0'><tbody>
                <tr>
                  <td colspan='2' align='center' class='title' bgcolor='#bfbfbf'>Send Management Plan To Information</td>
                </tr>
                <tr>
                  <td class='secondtitle'>Send To:</td>
                  <td class='secondtitle'>Send To:</td>
                </tr>
                <tr height='100'>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td><table border='0' width='100%' cellpadding='0' cellspacing='0'><tbody>
                    <tr><td><input type='checkbox'/><label class='checklabel'>Bound</label></td><td><input type='checkbox'/><label class='checklabel'>Unbound</label></td><td><input type='checkbox'/><label class='checklabel'>Email PDF?</label></td><td><input type='checkbox'/><label class='checklabel'>Cover Letter?</label></td></tr>
                  </tbody></table></td>
                  <td><table border='0' width='100%' cellpadding='0' cellspacing='0'><tbody>
                    <tr><td><input type='checkbox'/><label class='checklabel'>Bound</label></td><td><input type='checkbox'/><label class='checklabel'>Unbound</label></td><td><input type='checkbox'/><label class='checklabel'>Email PDF?</label></td><td><input type='checkbox'/><label class='checklabel'>Cover Letter?</label></td></tr>
                  </tbody></table></td>
                </tr>
                <tr>
                  <td colspan='2' class='secondtitle'>Consulter With: <label class='label'>Testing</label></td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </>);
  }
}
