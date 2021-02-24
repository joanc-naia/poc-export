import React, { useRef, useState, useEffect } from 'react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './sample.css';
import extractCSS from "component-css-extractor";
import html2pdf from 'html2pdf.js';

export default function Electroeval() {
  const ref1 = useRef();
	const [open, setOpen] = useState(false);

	const exportAsExcel2 = async () => {
		const style = extractCSS(ref1.current);
		const preHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">\
		<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>\
			<x:Name>Page1</x:Name>\
			<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>\
		</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>\
		<head><style>${style}</style></head>\
		<body><table>`;
		const postHtml = `</table></body></html>`;
		const table = document.querySelector('#report table');
		const html = `${preHtml}${table.innerHTML}${postHtml}`;

		// const url = 'data:application/vnd.ms-excel;base64,' + window.btoa(unescape(encodeURIComponent(html)));
		// let link = document.createElement('A');
		// link.href = url;
		// link.download = 'Document';
		// document.body.appendChild(link);
		// link.click();
		// document.body.removeChild(link);

		var blob = new Blob([table.innerHTML], {type: "application/vnd.ms-excel" });
		saveAs(blob, "Report.xls");
		handleButtonClick();
	}

	const exportAsExcel = async () => {
		//box: Wingdings o
		//box check: Wingdings þ
		//box shaded: Wingdings n

		const settings = {views: [{showGridLines: false}]};
		const defaultFont = {name: 'Arial'}
		let workbook = new ExcelJS.Workbook();
    let sheet1 = workbook.addWorksheet("Page1", settings);
		sheet1.getCell('AO2').value = 'Electrofishing Evaluation Datasheet';
		sheet1.getCell('AO2').font = { ...defaultFont, size: 14, bold: true, underline: true }
		sheet1.getCell('DR3').value = 'PAGE 1';
		sheet1.getCell('DR3').font = { ...defaultFont, size: 9 }


		let sheet2 = workbook.addWorksheet("Page2", settings);
		let sheet3 = workbook.addWorksheet("Page3", settings);
		let sheet4 = workbook.addWorksheet("Page4", settings);
		let sheet5 = workbook.addWorksheet("Page5", settings);
		let sheet6 = workbook.addWorksheet("Page6", settings);

		const buf = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), 'Report.xlsx');
    handleButtonClick();
	}

	const exportAsWord2 = async () => {
		let style = extractCSS(ref1.current);
		// A4 size: 841.95pt 595.35pt;
  	// Letter size: 8.5in 11in;
		// Legal size: 8.5in 14in;
		style += `@page WordSection{size: 8.5in 11in;mso-page-orientation: portrait;\
			margin: 1in 0.5in 1in 0.5in}\
			div.Section1 {page: WordSection;}\
			font-family: Arial, Helvetica, sans-serif;`
		//TODO: fix page-breaks, etc -- need to convert inline styles to .css

		const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>\
			<head>\
				<meta charset='utf-8'>\
				<title>Electrofishing Evaluation Datasheet</title>\
				<xml>\
					<w:worddocument xmlns:w="#unknown">\
						<w:view>Print</w:view>\
						<w:zoom>90</w:zoom>\
						<w:donotoptimizeforbrowser />\
					</w:worddocument>\
				</xml>\
				<style>${style}</style>\
			</head><body style="tab-interval:.5in"><div class="Section1">`;
		const postHtml = "</div></body></html>";

		const html = `${preHtml}${document.getElementById('report').innerHTML}${postHtml}`;

		const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
		let link = document.createElement('A');
		link.href = url;
		link.download = 'Report.doc';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		handleButtonClick();
		// console.log(html)
	}

	const exportAsPdfImages2 = () => {
    let doc = new jsPDF({
			orientation: 'p',
			unit: 'px',
			format: 'letter',
			hotfixes: ["px_scaling"]
		});
		const aspectRatio = 11/8.5;

		// generate all pages
		window.scrollTo(0,0);
		Promise.allSettled([
			html2canvas(document.querySelector('.page1'), {width: 990}),
			html2canvas(document.querySelector('.page2'), {width: 990}),
			html2canvas(document.querySelector('.page3'), {width: 990}),
			html2canvas(document.querySelector('.page4'), {width: 990}),
			html2canvas(document.querySelector('.page5'), {width: 990}),
			html2canvas(document.querySelector('.page6'), {width: 990})
		]).then(results => {
			results.forEach((result, index)=>{
				if (result.status === "fulfilled") {
					const imgData = result.value.toDataURL('image/png');
					const pageAspect = result.value.height/result.value.width;
					let imgHeight, imgWidth;
					if (pageAspect > aspectRatio) {
						imgHeight = 1020
						imgWidth = (result.value.width * imgHeight) / result.value.height;
					} else  {
						imgWidth = 780
						imgHeight = (result.value.height * imgWidth) / result.value.width;
					}

					if (index>0) doc.addPage();
					doc.addImage(imgData, 'PNG', 10, 8, imgWidth, imgHeight)
				} else {
					console.log("error", result.reason);
				}
			});
			doc.save('Report.pdf');
		});

	}

	const exportAsPdfImages = () => {
		const pageHTML = `<div style="width:800px">\
			<table>${document.querySelector('.page1').innerHTML}</table>\
			<div class="page-break"></div>\
			<table>${document.querySelector('.page2').innerHTML}</table>\
			<div class="page-break"></div>\
			<table>${document.querySelector('.page3').innerHTML}</table>\
			<div class="page-break"></div>\
			<table>${document.querySelector('.page4').innerHTML}</table>\
			<div class="page-break"></div>\
			<table>${document.querySelector('.page5').innerHTML}</table>\
			<div class="page-break"></div>\
			<table>${document.querySelector('.page6').innerHTML}</table>\
		</div>`;
		html2pdf(pageHTML, {
			filename: 'Report.pdf',
			jsPDF: { unit: 'px', format: 'letter', hotfixes: ["px_scaling"] },
			margin: [20,5]
		})
		handleButtonClick();
	}

	const exportAsPdfText = () => {
		let doc = new jsPDF({
			orientation: 'p',
			unit: 'px',
			format: 'letter',
			hotfixes: ["px_scaling"]
		});

		// TODO: fix page breaks etc
		const pageHTML = document.querySelector(`.report-container`).outerHTML;
		doc.html(pageHTML, {
			callback: doc=>{
				doc.save('ReportText.pdf');
			}
		});
		handleButtonClick();
	}

	const handleButtonClick = () => {
		setOpen(!open);
	};

	return (<>
		<header>
			<h1>Electrofishing Evaluation Report</h1>
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

					<button onClick={exportAsWord2}>Export to Word</button>
					<button onClick={exportAsPdfText}>Export to PDF text without page breaks</button>
					<button onClick={exportAsPdfImages}>Export Report PDF image with page breaks</button>
					<button onClick={exportAsExcel2}>Export Report Excel (in progress)</button>
				</div>
				)}
			</div>
		</header>
		<div className='report-container'>
			<div id="report" ref={ref1}>
    		<table border='0' width='100%' cellPadding='5' cellSpacing='0' className="page1">
	<tr>
		<td valign='middle'>
			<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
				<tr>
					<td align='center' valign='middle'><b style={{fontSize:"20px", fontFamily:"Arial", fontWeight:"bold"}}>Electrofishing Evaluation Datasheet</b></td>
					<td align='right' valign='middle' style={{fontSize:"13px",fontFamily:"Arial", border:"2px solid #000",padding:"5px", textAlign:"center", width:"80px"}}>PAGE 1</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='0' cellSpacing='0'>
			<tr>
				<td>
					<table border='0' width='100%' cellPadding='3' cellSpacing='5'>
						<tr>
							<td width='145' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}}>Data Recorded By:</td>
							<td className='bottomborder'>Testing</td>
							<td width='145' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}}>Data Entered By:</td>
							<td className='bottomborder'>Testing</td>
							<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} align='right'>Plan Finisher:</td>
							<td className='bottomborder'>Testing</td>
							<td width='135' valign='bottom' align='right' style={{fontSize:"11px", fontFamily:"Arial"}}>Follow Up By:</td>
							<td className='bottomborder'>Testing</td>
						</tr>
						<tr>
							<td width='155' style={{fontSize:"11px", fontFamily:"Arial"}}>Management Type:</td>
							<td colSpan='3' className='bottomborder'>Testing</td>
							<td colSpan='2' align='right' style={{fontSize:"11px", fontFamily:"Arial"}} >Correspondence Type:</td>
							<td colSpan='2' className='bottomborder'>Testing</td>
						</tr>
					</table>
				</td>
				</tr>

			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='0' cellSpacing='0'>
				<tr>
					<td>
						<table border='0' width='100%' cellPadding='2' cellSpacing='5'>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Customer:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Date:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Primary Contact:</td>
								<td className='bottomborder'>Testing</td>
								<td width='135' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Property Name:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='165' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Primary Contact Type:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>State/County:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Work Phone:</td>
								<td width='35%'><table width='100%' cellPadding='0' cellSpacing='0'><tr><td className='bottomborder'>Testing</td><td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='40' align='center'>Ext:</td><td className='bottomborder'>Testing</td></tr></table></td>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Primary Uses:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Home Phone:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Fishing Goals:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Cell Phone:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Property Type:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Email:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}></td>
								<td></td>
							</tr>
						</table>
					</td>
				</tr>

			</table>
		</td>
	</tr>
	<tr>
		<td valign="middle">
			<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
				<tr>
					<td align='center' valign='top'>
						<table border='0' width='100%'  cellPadding='2' cellSpacing='0'>
							<tr>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='2' cellSpacing='5'>
										<tr>
											<td style={{border:"none"}}>
												<table border='0'  width='100%' cellPadding='0' cellSpacing='0'>
													<tr>
														<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Pond Name:</td>
														<td className='bottomborder'>Testing</td>
														<td width='60' valign='bottom' align='center' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Acres:</td>
														<td className='bottomborder'>Testing</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>

								</td>
							</tr>
							<tr>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='0' cellSpacing='0'>
										<tr>
											<td style={{border:"none"}}>
												<table border='0'  width='100%'  cellPadding='0' cellSpacing='5'>
													<tr>
														<td>
															<table border='0'  width='100%'  cellPadding='0' cellSpacing='0'>
																<tr>
																	<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Recommended BG Harvest:</td>
																	<td><table border='0' width='100%' cellPadding='0' cellSpacing='0'><tr>
																		<td>
																			<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
																				<tr>
																					<td width='21'><input type='checkbox'/></td>
																					<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Suspend</span></td>

																				</tr>
																			</table>
																			</td>
																			<td>
																				<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
																					<tr>
																						<td width='21'><input type='checkbox'/></td>
																						<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Consumptive</span></td>

																					</tr>
																				</table>
																				</td>
																				<td>
																					<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
																						<tr>
																							<td width='21'><input type='checkbox'/></td>
																							<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Unlimited</span></td>

																						</tr>
																					</table>

																					</td></tr></table></td>

																</tr>
															</table>
														</td>
														</tr>
													<tr>
														<td>
															<table border='0'  width='100%'  cellPadding='0' cellSpacing='0'>
																<tr>
																	<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial", fontWeight:"bold"}}>Recommended LMB Harvest:</td>
																	<td><table border='0' width='100%' cellPadding='0' cellSpacing='0'><tr><td>
																		<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
																						<tr>
																							<td width='21'><input type='checkbox'/></td>
																							<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Yes</span></td>

																						</tr>
																					</table>
																		</td>
																		<td>
																			<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
																						<tr>
																							<td width='21'><input type='checkbox'/></td>
																							<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>No</span></td>

																						</tr>
																					</table>
																			</td><td align='right'><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Inch Group:</span></td><td className='bottomborder'>Testing</td><td align='right'><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Lbs/Acre:</span></td><td className='bottomborder'>Testing</td></tr></table></td>

																</tr>
															</table>
														</td>
														</tr>
												</table>
											</td>
										</tr>
									</table>

								</td>
							</tr>
						</table>
					</td>
					<td align='right' valign='top'>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='2' cellSpacing='5'>
							<tr>
								<td style={{border:"none"}}>
									<table border='0'  width='100%' cellPadding='5' cellSpacing='0'>
										<tr>
											<td colSpan='2' align='center'><b style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>GPS Coordinates</b></td>
										</tr>
										<tr>
											<td width='20' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>N:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
										<tr>
											<td width='20' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>W:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr height='20'><td></td></tr>
	<tr>
		<td className='small' align='center'><span style={{color:"#ff0000"}}>*</span>Level:Management Priority Level (1, 2, or 3) / <span style={{color:"#ff0000"}}>**</span>Status:Confirmed (C); Not Confirmed (NC); Done (DONE); Owner Responsibility (OR); Declined (D)</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='8' cellSpacing='0'>
				<tr>
					<th style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Order</th>
					<th style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Date</th>
					<th style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Recommended Activity</th>
					<th style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Qty</th>
					<th style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Unit</th>
					<th style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Price</th>
					<th style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Level *</th>
					<th style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Status **</th>
				</tr>
				<tr>
					<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='8' cellSpacing='0'>
				<tr>
					<td colSpan='2' align='center' style={{fontSize:"16px",fontFamily:"Arial", fontWeight:"bold"}} bgcolor='#bfbfbf'>Send Management Plan To Information</td>
				</tr>
				<tr>
					<td style={{fontSize:"12px",fontFamily:"Arial", fontWeight:"bold", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Send To:</td>
					<td style={{fontSize:"12px",fontFamily:"Arial", fontWeight:"bold", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Send To:</td>
				</tr>
				<tr height='60'>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}><table border='0' width='100%' cellPadding='0' cellSpacing='0'><tr>
						<td valign='center'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
									<tr>
										<td width='21'><input type='checkbox'/></td>
										<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Bound</span></td>

									</tr>
								</table>
							</td>
						<td>
							<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
									<tr>
										<td width='21'><input type='checkbox'/></td>
										<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Unbound</span></td>

									</tr>
								</table>
						</td>
						<td>

							<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
									<tr>
										<td width='21'><input type='checkbox'/></td>
										<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Email PDF?</span></td>

									</tr>
								</table>
							</td>
						<td>
						<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
									<tr>
										<td width='21'><input type='checkbox'/></td>
										<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Cover Letter?</span></td>

									</tr>
								</table>
						</td>
						</tr></table>
						</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>
					<table border='0' width='100%' cellPadding='0' cellSpacing='0'><tr>
						<td valign='center'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
									<tr>
										<td width='21'><input type='checkbox'/></td>
										<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Bound</span></td>

									</tr>
								</table>
							</td>
						<td>
							<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
									<tr>
										<td width='21'><input type='checkbox'/></td>
										<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Unbound</span></td>

									</tr>
								</table>
						</td>
						<td>

							<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
									<tr>
										<td width='21'><input type='checkbox'/></td>
										<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Email PDF?</span></td>

									</tr>
								</table>
							</td>
						<td>
						<table width='100%' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
									<tr>
										<td width='21'><input type='checkbox'/></td>
										<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Cover Letter?</span></td>

									</tr>
								</table>
						</td>
						</tr></table>
						</td>
				</tr>
				<tr>
					<td colSpan='2' style={{borderTop:"1px solid #000", fontSize:"12px",fontFamily:"Arial", fontWeight:"bold"}}>Consulter With: <span style={{fontSize:"12px", fontFamily:"Arial"}}>Testing</span></td>
				</tr>
			</table>
		</td>
	</tr>
</table>

			<pre className="page-break"><br clear="all" className="page-break"/></pre>
			<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px"}} className="page2">
				<tr>
					<td valign='middle'>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
							<tr>
								<td align='center' valign='middle'>
									<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>Client</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120' align='center'>Pond Name:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'  align='center'>Date:</td>
											<td className='bottomborder' width='110'>Testing</td>
										</tr>
									</table>
								</td>
								<td width='10'></td>
								<td align='right' valign='middle' style={{fontSize:"13px",fontFamily:"Arial", border:"2px solid #000",padding:"5px", textAlign:"center", width:"80px"}}>PAGE 2</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style={{fontSize:"14px",fontFamily:"Arial", fontWeight:"bold"}}><u>Pond Assessment / Water Control / Physical Characteristics</u></td>
				</tr>
				<tr>
					<td>
						<table width='100%' cellPadding='4' cellSpacing='3' border='0'>
							<tr>
								<td>
									<table  width='100%' cellPadding='0' cellSpacing='0' border='0'>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='200'>Date of Impoundment:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='120' align='center'>Dam Type:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Condition:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
									</table>
								</td>


							</tr>
							<tr>
								<td>
									<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
										<tr>
											<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='200'>Emergency Spillway:</td>
											<td align='left'>
												<table width='120' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
															<tr>
																<td width='21'><input type='checkbox'/></td>
																<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Yes</span></td>
																<td width="30"></td>
																<td width='21'><input type='checkbox'/></td>
																<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>No</span></td>

															</tr>
														</table>
												</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' align='center' colSpan=''>Spillway Material:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Condition:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
									</table>
								</td>

							</tr>
							<tr>
								<td>
									<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
										<tr>
											<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='200'>Mechanical Spillway:</td>
											<td align='left'>
												<table width='120' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
															<tr>
																<td width='21'><input type='checkbox'/></td>
																<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Yes</span></td>
																<td width="30"></td>
																<td width='21'><input type='checkbox'/></td>
																<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>No</span></td>

															</tr>
														</table>
												</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' align='center'>Diameter (in):</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Material:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Condition:</td>
											<td className='bottomborder'>Testing</td>

										</tr>
									</table>
								</td>
							</tr>
							<tr>
								<td>
									<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
										<tr>
											<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='200'>Trash Rack:</td>
											<td align='left'>
												<table width='120' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
															<tr>
																<td width='21'><input type='checkbox'/></td>
																<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Yes</span></td>
																<td width="30"></td>
																<td width='21'><input type='checkbox'/></td>
																<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>No</span></td>

															</tr>
														</table>
												</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' align='center'>Diameter (in):</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Material:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Condition:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
									</table>
								</td>

							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
							<tr>
								<td>
									<table width='100%' cellPadding='5' cellSpacing='4' border='0'>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Water Source:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Depth:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Topography:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Soil Type:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Landscape:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Soil Condition:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
									</table>
								</td>
								<td width='80'></td>
								<td width='400'>
									<table width='100%' cellPadding='5' cellSpacing='10' border='0'>
										<tr>
											<td colSpan='2' style={{fontSize:"16px",fontFamily:"Arial", fontWeight:"bold"}} align='center'><u>Water Characteristics</u></td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Fertility Level:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Plankton Bloom:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Suspended Solids:</td>
											<td align='left'>
												<table width='120' cellSpacing='0' cellSpacing='0' border='0' style={{margin:"0"}}>
															<tr>
																<td width='21'><input type='checkbox'/></td>
																<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Yes</span></td>
																<td width="30"></td>
																<td width='21'><input type='checkbox'/></td>
																<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>No</span></td>

															</tr>
														</table>
												</td>
										</tr>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Water Level:</td>
											<td className='bottomborder'>Testing</td>
										</tr>
									</table>
								</td>
								<td width='80'></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style={{fontSize:"16px",fontFamily:"Arial", fontWeight:"bold"}}><u>Pond Management History</u></td>
				</tr>
				<tr>
					<td>
						<table width='100%' cellPadding='5' cellSpacing='5' border='0'>
							<tr>
								<td width='150' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Fish Harvest:</td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='100'>Bass</td>
								<td className='bottomborder'>Testing</td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='350' align='right'>Annual Pounds Removed:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='150'></td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Bluegill</td>
								<td className='bottomborder'>Testing</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td width='150'></td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Other (specify)</td>
								<td className='bottomborder'>Testing</td>
								<td style={{fontSize:"12px", fontFamily:"Arial"}}>None  /  Limited  /  Moderate  /  Adequate  /  Excessive</td>
								<td></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table width='100%' cellPadding='5' cellSpacing='5' border='0'>
							<tr>
								<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Liming:</td>
								<td className='bottomborder'>Testing</td>
								<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} width='120'>Last Limed (year):</td>
								<td className='bottomborder'>Testing</td>
								<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} align='right' width='100'>Qty (tons):</td>
								<td className='bottomborder'>Testing</td>
								<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} align='right' width='120'>Did we apply lime?</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Fertilizing: </td>
								<td className='bottomborder' colSpan='3'>Testing</td>
								<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} align='right' width='100'>Type:</td>
								<td className='bottomborder'>Testing</td>
								<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} align='right' width='120'>Do we fertilize?</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Feeding:  </td>
								<td className='bottomborder' colSpan='3'>Testing</td>
								<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} align='right' width='100'>Type:</td>
								<td className='bottomborder'>Testing</td>
								<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} align='right' width='120'>Qty (feeders):</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Structure: </td>
								<td className='bottomborder' colSpan='3'>Testing</td>
								<td valign='bottom' style={{fontSize:"11px", fontFamily:"Arial"}} align='right' width='100'>Type:</td>
								<td className='bottomborder' colSpan='3'>Testing</td>

							</tr>
							<tr>
								<td  align='left' colSpan='9'>
								<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
									<tr>
										<td width='200' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Initial Fish Stocking:</td>
										<td className='bottomborder'>Testing</td>
									</tr>
								</table>
								</td>


							</tr>
							<tr>
								<td colSpan='9' align='left'>
									<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
										<tr>
										<td width='230' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Recent Fish Stocking:<br /><small style={{fontSize:"9px", fontWeight:"normal"}}>(from sources other than SEPM)</small></td>
										<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} align='right' width='110'>Year:</td>
										<td className='bottomborder'>Testing</td>
										<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}  align='right' width='110'>Source:</td>
										<td className='bottomborder'>Testing</td>
										<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}  align='right' width='110'>Species:</td>
										<td className='bottomborder'>Testing</td>
										</tr>
									</table>
								</td>

							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table width='100%' cellPadding='5' cellSpacing='5' border='0'>
							<tr>
								<td width='120' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Grass Carp:</td>
								<td className='bottomborder' colSpan='3'>Testing</td>
								<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} align='right' width='180'>Number Stocked:</td>
								<td className='bottomborder'>Testing</td>
								<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}  align='right' width='120'>When:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table width='100%' style={{border:"2px solid #000"}} cellPadding='5' cellSpacing='0'>
							<tr>
								<th style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Aquatic Weeds Observed</th>
								<th style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Coverage</th>
								<th style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>% Percentage</th>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<pre><br clear="all" className="page-break"/></pre>
			<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px"}} className="page3">
				<tr>
					<td valign='middle'>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
							<tr>
								<td align='center' valign='middle'>
									<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>Client</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120' align='center'>Pond Name:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'  align='center'>Date:</td>
											<td className='bottomborder' width='110'>Testing</td>
										</tr>
									</table>
								</td>
								<td width='10'></td>
								<td align='right' valign='middle' style={{fontSize:"13px",fontFamily:"Arial", border:"2px solid #000",padding:"5px", textAlign:"center", width:"80px"}}>PAGE 3</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border='0' width='100%' cellPadding='0' cellSpacing='10'>
							<tr>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='2' cellSpacing='15'>
										<tr>
											<td style={{border:"none"}}>
												<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
													<tr>
														<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>Alkalinity</td>
														<td className='bottomborder' align='center'>Testing</td>
														<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>ppm</td>
													</tr>
												</table>
											</td>
										</tr>

									</table>
								</td>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='2' cellSpacing='15'>
										<tr>
											<td style={{border:"none"}}>
												<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
													<tr>
														<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60' align='center'>*Insert Tag Numbers below
														length/weight data in
														'Logged' columns</td>
													</tr>
												</table>
											</td>
										</tr>

									</table>
								</td>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='2' cellSpacing='15'>
										<tr>
											<td style={{border:"none"}}>
												<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
													<tr>
														<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>Alkalinity</td>
														<td className='bottomborder' align='center'>Testing</td>
														<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>ppm</td>
													</tr>
												</table>
											</td>
										</tr>

									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border='0' width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='100'>Reproduction:</td>
								<td className='bottomborder'>Testing</td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='90' align="right">Harvested:</td>
								<td className='bottomborder'>Testing</td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='180' align="right">Population Status:</td>
								<td className='bottomborder'>Testing</td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='80' align="right">Other:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<td colSpan='2' align='left' style={{fontSize:"12px",fontFamily:"Arial", fontWeight:"bold"}} bgcolor='#d2d2d2'>Logged LMB Details</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
							<tr>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
										<tr>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Fish #</th>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Millimeter</th>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Grams</th>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Recapture</th>
										</tr>
										<tr>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
										</tr>
									</table>
								</td>
								<td width='20'></td>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
										<tr>
											<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Fish #</th>
											<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Millimeter</th>
											<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Grams</th>
											<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Recapture</th>
										</tr>
										<tr>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
										</tr>
									</table>
								</td>
							</tr>
						</table>

					</td>
				</tr>
				<tr>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Fish #</th>
								<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Millimeter</th>
								<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Grams</th>
								<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Tag #</th>
								<th bgcolor='#d2d2d2'  style={{fontFamily:"Arial", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Recapture</th>
							</tr>
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Logged LMB<br /><small>Length (Inches)</small></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>23</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>24</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>25</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>26</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>27</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>28</td>
							</tr>
							<tr>
								<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Count</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>LMB (unlogged)<br /><small>Length (Inches)</small></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20</td>
							</tr>
							<tr>
								<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Count</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border='0' width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='180'>Reproduction :</td>
								<td className='bottomborder'>Testing</td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='160'>Bluegill Type :</td>
								<td className='bottomborder'>Testing</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<td colSpan='2' align='left' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} bgcolor='#d2d2d2'>Logged Bluegill Details</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
							<tr>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
										<tr>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Fish #</th>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Millimeter</th>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Grams</th>
										</tr>
										<tr>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
										</tr>
									</table>
								</td>
								<td width='20'></td>
								<td>
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
										<tr>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Fish #</th>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Millimeter</th>
											<th bgcolor='#d2d2d2' style={{fontFamily:"Arial", borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"12px", fontWeight:"bold"}}>Grams</th>
										</tr>
										<tr>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
											<td style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
										</tr>
									</table>
								</td>
							</tr>
						</table>

					</td>
				</tr>
				<tr>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Logged Bluegill<br /><small>Length (Inches)</small></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12</td>
							</tr>
							<tr>
								<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Count</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Bluegill (unlogged)<br /><small>Length (Inches)</small></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12</td>
							</tr>
							<tr>
								<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Count</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<pre><br clear="all" className="page-break"/></pre>
			<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px"}} className="page4">
				<tr>
					<td valign='middle'>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
							<tr>
								<td align='center' valign='middle'>
									<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>Client</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120' align='center'>Pond Name:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'  align='center'>Date:</td>
											<td className='bottomborder' width='110'>Testing</td>
										</tr>
									</table>
								</td>
								<td width='10'></td>
								<td align='right' valign='middle' style={{fontSize:"13px",fontFamily:"Arial", border:"2px solid #000",padding:"5px", textAlign:"center", width:"80px"}}>PAGE 4</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table  style={{border:"2px solid #000"}} width='100%' bordercolor='#000' cellPadding='5' cellSpacing='0'>
							<tr>
								<th style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold",  borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Shellcracker<br /><small>Length(Inches)</small></th>
								<th style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold",  borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Threadfin shad<br /><small>Length(Inches)</small></th>
								<th style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold",  borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Crappie<br /><small>Length(Inches)</small></th>
								<th style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold",  borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Catfish<br /><small>Length(Inches)</small></th>
								<th style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold",  borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Gizzard Shad<br /><small>Length(Inches)</small></th>
								<th style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold",  borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Gold. Shiner<br /><small>Length(Inches)</small></th>
								<th style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold",  borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Other:___________<br /><small>Length(Inches)</small></th>
								<th style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold",  borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Other:___________<br /><small>Length(Inches)</small></th>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>1 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>1 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>23 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>23 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>23 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>24 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>24 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>24 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>25 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>25 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>25 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>26 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>26 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>26 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>27 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>27 -</td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>27 -</td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
							<tr>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td align='center' style={{fontFamily:"Arial", fontSize:"12px", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<pre><br clear="all" className="page-break"/></pre>
			<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px"}} className="page5">
				<tr>
					<td valign='middle'>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
							<tr>
								<td align='center' valign='middle'>
									<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
										<tr>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>Client</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120' align='center'>Pond Name:</td>
											<td className='bottomborder'>Testing</td>
											<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'  align='center'>Date:</td>
											<td className='bottomborder' width='110'>Testing</td>
										</tr>
									</table>
								</td>
								<td width='10'></td>
								<td align='right' valign='middle' style={{fontSize:"13px",fontFamily:"Arial", border:"2px solid #000",padding:"5px", textAlign:"center", width:"80px"}}>PAGE 5</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
							<tr>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>EVALUATION SUMMARY / NOTES</td>
							</tr>
							<tr height='100'>
								<td></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0' >
							<tr>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} align='center' colSpan='2'>RECOMMENDED MANAGEMENT ACTIVITIES</td>
							</tr>
							<tr>
								<td valign='top'>
									<table width='100%' cellPadding='0' cellSpacing='5'>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Lime Application</td>
																</tr>
																<tr>
																	<td><table width='100%' cellPadding='0' cellSpacing='0' border='0'><tr><td  width='280'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Agricultural lime application:</span></td><td className='bottomborder' width='60'></td><td style={{fontSize:"12px", fontFamily:"Arial"}}>tons/acre</td></tr></table></td>
																</tr>
																<tr>
																	<td>
																	<table width='100%' cellPadding='0' cellSpacing='0' border='0'><tr><td width='20'></td><td><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Tum-key</span></td><td><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Application Only</span></td><td><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>They Load</span></td></tr></table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Feritilization</td>
																</tr>
																<tr>
																	<td><table width='100%' cellPadding='0' cellSpacing='0' border='0'><tr><td><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Fertilizer (bulk)</span></td><td><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Fertilizer (route)</span></td></tr></table></td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Supplemental Forage Options</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='320'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Intermediate coppernose bluegill</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Crawfish</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>lbs/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Golden shiners</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Tilapia</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>lbs/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Threadfin shad</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>loads</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Gizzard sad</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>loads/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Other:</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Weed Control</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Herbicide Application</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>(chemical name)</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Grass carp: diploid / triploid</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td></td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Aquashade:</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>gallons</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Supplemental Feeding</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Begin program:</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>feeders</td>
																				<td width='60'></td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>Model</td>
																				<td className='bottomborder' width='80'>&nbsp;</td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Maintain program</span></td>
																				<td  width='60'></td>
																				<td width='80'></td>
																				<td width='60'></td>
																				<td width='60'></td>
																				<td >&nbsp;</td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Intensify program:</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>feeders</td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}></td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>Model</td>
																				<td className='bottomborder' width='80'>&nbsp;</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Trash Rack</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Standpipe diameter</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>inches</td>
																				<td width='60'></td>
																				<td width='60'></td>
																				<td>&nbsp;</td>
																				<td width='60'></td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Install trash rack</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>inches</td>
																				<td width='60' className='bottomborder'></td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>up</td>
																				<td className='bottomborder' width='80'>&nbsp;</td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>down</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Corrective re-stocking/genetics</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Adult LMB</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>(type)</td>
																				<td width='60' className='bottomborder'></td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>(size)</td>
																				<td className='bottomborder' width='80'>&nbsp;</td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>(quanity)</td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Fing. LMB</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>(type)</td>
																				<td width='60' className='bottomborder'></td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>(size)</td>
																				<td className='bottomborder' width='80'>&nbsp;</td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>(quanity)</td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Coppernose Bluegill</span></td>
																				<td width='60'></td>
																				<td width='80'></td>
																				<td width='60' className='bottomborder'></td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>(size)</td>
																				<td className='bottomborder' width='80'>&nbsp;</td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>(quanity)</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Maintenance</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Annual Ealuation</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>(Month/Year)</td>
																			</tr>

																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
									</table>
								</td>
								<td valign='top'>
									<table width='100%' cellPadding='0' cellSpacing='5'>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Recreational Stoking Options</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Trout</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Hybrid striped bass</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Channel catfish</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Feed-trained LMB</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Crappie</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Smallmouth bass</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Jumbo LMB</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>lbs</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Shellcracker</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>/acre</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Fish Harvest</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Harvest</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>inch</td>
																				<td width='60' className='bottomborder'></td>
																				<td width='30' style={{fontSize:"12px", fontFamily:"Arial"}}>@</td>
																				<td className='bottomborder' width='60'>&nbsp;</td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>lbs/acre</td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Harvest</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>inch</td>
																				<td width='60' className='bottomborder'></td>
																				<td width='30' style={{fontSize:"12px", fontFamily:"Arial"}}>@</td>
																				<td className='bottomborder' width='60'>&nbsp;</td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>lbs/acre</td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Harvest</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>inch</td>
																				<td width='60' className='bottomborder'></td>
																				<td width='30' style={{fontSize:"12px", fontFamily:"Arial"}}>@</td>
																				<td className='bottomborder' width='60'>&nbsp;</td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>lbs/acre</td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Suspend Harvest</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>(species)</td>
																				<td width='60'></td>
																				<td width='30'></td>
																				<td>&nbsp;</td>
																				<td width='60'></td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Electrofishing</span></td>
																				<td className='bottomborder' width='60'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>hours</td>
																				<td width='60'></td>
																				<td width='30'></td>
																				<td>&nbsp;</td>
																				<td width='60'></td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Aeration/Destratification</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Destrat System:</span></td>
																				<td className='bottomborder' width='100'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>size/type</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Install fountain:</span></td>
																				<td className='bottomborder' width='100'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>size/type</td>
																			</tr>
																			<tr>
																				<td  width='200'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Install aerator:</span></td>
																				<td className='bottomborder' width='100'></td>
																				<td style={{fontSize:"12px", fontFamily:"Arial"}}>size/type</td>
																			</tr>

																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
										<tr>
											<td>
												<table width='100%' cellPadding='0' cellSpacing='0' style={{border:"2px solid #000"}}>
													<tr>
														<td>
															<table width='100%' cellPadding='5' cellSpacing='0' border='0'>
																<tr>
																	<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Recreational Stoking Options</td>
																</tr>
																<tr>
																	<td>
																		<table width='100%' cellPadding='0' cellSpacing='0' border='0'>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Add Structure</span></td>
																				<td width='60'></td>
																				<td width='80'></td>
																				<td width='60'></td>
																				<td width='60'></td>
																				</tr>
																			<tr>
																				<td colSpan='5'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Drain pond--? Re-stock letter</span></td>

																			</tr>
																			<tr>
																				<td  colSpan='5'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>PondToon information requested</span></td>
																				</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Deliver fish food</span></td>
																				<td width='60' className='bottomborder'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>(type)</td>
																				<td width='60' className='bottomborder'></td>
																				<td width='60' style={{fontSize:"12px", fontFamily:"Arial"}}>(#bags)</td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Install fish barrier:</span></td>
																				<td width='100' className='bottomborder'></td>
																				<td width='80' colSpan='2' style={{fontSize:"12px", fontFamily:"Arial"}}>(typespillway width)</td>
																				<td width='60'></td>
																			</tr>
																			<tr>
																				<td  width='260'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Nuisance animal control:</span></td>
																				<td width='100' className='bottomborder'></td>
																				<td width='80' style={{fontSize:"12px", fontFamily:"Arial"}}>(species)</td>
																				<td width='60'></td>
																				<td width='60'></td>
																			</tr>
																			<tr>
																				<td colSpan='5'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Dam and shoreline maintenance</span></td>

																			</tr>
																			<tr>
																				<td colSpan='5'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Install siphon system</span></td>

																			</tr>
																			<tr>
																				<td colSpan='5'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Rotenone application (control shad)</span></td>

																			</tr>
																			<tr>
																				<td colSpan='5'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Rotenone application (complete renovation)</span></td>

																			</tr>
																			<tr>
																				<td  colSpan='5'><input type='checkbox'/><span style={{margin:"0 5px",fontSize:"12px", fontFamily:"Arial"}}>Siltation/turbidity control</span></td>

																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
														</td>
													</tr>

												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<pre><br clear="all" className="page-break"/></pre>
			<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px"}} className="page6">
	<tr>
		<td valign='middle'>
			<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
				<tr>
					<td align='center' valign='middle'>
						<table border='0' width='100%' cellPadding='0' cellSpacing='0'>
							<tr>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'>Client</td>
								<td className='bottomborder'>Testing</td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120' align='center'>Pond Name:</td>
								<td className='bottomborder'>Testing</td>
								<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='60'  align='center'>Date:</td>
								<td className='bottomborder' width='110'>Testing</td>
							</tr>
						</table>
					</td>
					<td width='10'></td>
					<td align='right' valign='middle' style={{fontSize:"13px",fontFamily:"Arial", border:"2px solid #000",padding:"5px", textAlign:"center", width:"80px"}}>PAGE 6</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
				<tr>
					<td>
						<table width='100%' cellPadding='2' cellSpacing='0' border='0' >
							<tr>
								<td style={{fontFamily:"Arial", fontSize:"11px"}} className='red bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red bold'>Cover Letter</td>
										</tr>
									</table>
								</td>
							</tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red bold'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red bold'>I. Cover Page</td>
										</tr>
									</table>
							</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red bold'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red bold'>II. Introduction</td>
										</tr>
									</table>

							</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red bold'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red bold'>III. Pond Assessment</td>
										</tr>
									</table>

								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='green bold'>

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='green bold'>IV. Fish Community Balance</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red bold'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red bold'>V. Fishery Assessment</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red bold'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red bold'>VI. Tag data (optional)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red bold'>

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red bold'>VII.Current State Of Balance (<b>MUST</b> choose <b>ALL</b> that apply)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red'>

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red'>BAL (Balance)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red'>PC (Predator-Crowded)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='red'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='red'>FC (Forage-Crowded)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>COM-PRED (CompetingPredator Species)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>COM-PREY (Competing Prey Species)</td>
										</tr>
									</table>
								</td></tr>
							 <tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>

								 <table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'> VIII. Recommended Management Activities</td>
										</tr>
									</table>
								 </td></tr>
							 <tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 green bold'>

								 <table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='label2 bold green'> 1. Fish Harvest (MUST choose <b>ONLY</b> one)</td>
										</tr>
									</table>
								 </td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='green'>

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='green'> HBN (Harvest Bass - No)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='green'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='green'>HBY (Harvest Bass - Yes)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='green'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='green'>HBYL (Harvest Bass - Yes Light)</td>
										</tr>
									</table>
								</td></tr>
							 <tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>
								 <table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>2. Lime Application <small className='small' style={{fontWeight:"normal"}}>(if applicable)</small></td>
										</tr>
									</table>
								 </td></tr>
							 <tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>

								 <table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'> 3. Fertilization <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td>
										</tr>
									</table>
								 </td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} > 3. Fertilization <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} > FERT - SR (SportMax Service Route Emphasis)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >FERT - SPORT (Bulk SportMax Emphasis)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >FERT - SRL (Liquid Service Route Emphasis)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >FERT - BTFP (Bulk Tank Fertilizer Program)</td>
										</tr>
									</table>
								</td></tr>
							 <tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>

								 <table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}   className='label2 bold'>4. Supplemental Bass Stocking <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td>
										</tr>
									</table>
								 </td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SBS - All Bass (F1, Northern, Feed-trained)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SBS - FT (Feed-trained)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SBS - Genetic Shift (F1, Northern, Feed-trained)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >5. Supplemental Bass Stocking  <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 1 (TFS, CNB, TILAPIA, CRAWFISH)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 2 (TFS, CNB, TILAPIA)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 3 (TFS, CNB, CRAWFISH)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 4 (TFS, TILAPIA, CRAWFISH)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 5 (TFS, TILAPIA)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 6 (TFS, CRAWFISH)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 7 (TFS, CNB)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 8 (TFS with GZS Present and Reproducing)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 9 (TFS after GZS are Reduced with Rotenone)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 10 (TFS)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 11 (CNB, TILAPIA, CRAWFISH)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 12 (CNB, TILAPIA)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 13 (CNB, CRAWFISH)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 14 (CNB)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 15 (CNB Genetics)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 16 (TILAPIA, CRAWFISH)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 17 (TILAPIA)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 18 (CRAWFISH)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 19 (GOS)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 20 (GZS with TFS Present)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - 21 (GZS)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>6. Supplemental Forage Stocking  <small className='small' style={{fontWeight:"normal"}}>(choose <b>ALL</b> that apply if applicable)</small></td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - AP1 (TFS with GZS Present and Reproducing; behind SFS section)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - AP2 (TFS after GZS are Reduced with Rotenone; behind SFS section)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - AP3 (CNB Genetics; behind SFS section)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - AP4 (GOS; behind SFS section)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - AP5 (GZS with TFS Present; behind SFS section)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >SFS - AP6 (GZS; behind SFS section)</td>
										</tr>
									</table>
								</td></tr>
						</table>
					</td>
					<td valign='top'>
						<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >7. Supplemental Feeding  <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >BFP (Begin Feeding Program)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >IFP (Intensify Feeding Program)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} >CFP (Continue Feeding Program)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 green bold'>

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}} className='label2 green bold'>8. Aquatic Weed Contro  <small className='small' style={{fontWeight:"normal"}}>(<b>MUST</b> choose ONLY one)</small></td>
										</tr>
									</table>

								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='green'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='green'>AWC - NWP (No Weeds Present)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}   className='green'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='green'>AWC - WP (Weeds Present - 3 Control Methods)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}   className='green'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='green'>AWC - WPGC (Weeds Present - Grass Carp Emphasis)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}   className='green'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='green'>AWC - WPH (Weeds Present - Herbicide Emphasis)</td>
										</tr>
									</table>
								</td></tr>
							<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}   className='green'>
								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'><input type='checkbox'/></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}}  className='green'>AWC - WPGCH (Weeds Present - Grass Carp & Herbicide)</td>
										</tr>
									</table>
								</td></tr>
						</table>
						<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
							<tr><td className='label2 bold' colSpan='2'>

								<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
										<tr>
											<td width='21'></td>
											<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}  className='label2 bold'>9. Aquatic Weed ID  <small className='small' style={{fontWeight:"normal"}}>(choose <b>ALL</b> that apply if applicable)</small></td>
										</tr>
									</table>
								</td></tr>
							<tr>
								<td>
									<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Alligatorweed</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Arrow Arum</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Arrowhead</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Baby Tears</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Banana Lily</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Blue-green Algae</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Black Willow</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Bladderwort</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Bog Moss</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Brittle Pondweed</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Bull Tongue (duck potato)</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Bulrush</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Buttonbush</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Cattail</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Chara</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Common Water Weed</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Coontail</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Duckweed</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Elephant Ear</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Euglena</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Eurasian Water Milfoil</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Filamentous Algae spp.</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Fragrant Water Lily</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Green Algae</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Hydrilla</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Hydrodictyon</td>
												</tr>
											</table>
											</td></tr>
									</table>

								</td>
								<td>
									<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Lemon Bacopa</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Lizard Tail</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Lotus</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Lyngbya</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Mosquito Fern</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Parrot Feather</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Pickerelweed</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Pondweed</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Slender Spike Rush</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Smartweed</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Southern Naiad</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Southern Water Grass</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Spatterdock</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Star grass</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Torpedo Grass</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Water Hyacinth</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Water Pennywort</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Water Primrose</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Watershield</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Water Willow</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Watermeal</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Waterpod</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Other:</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
										<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Other:</td>
												</tr>
											</table>
											</td></tr>
										<tr><td style={{fontFamily:"Arial", fontSize:"11px"}} >
											<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}}>Other:</td>
												</tr>
											</table>
											</td></tr>
									</table>
								</td>
							</tr>
						</table>
						<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='bold'>10. Trash Rack (if applicable)</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='bold'>11. Selective Rotenone Treatment (if applicable)</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='bold'>12. Siltation and Turbidity Control (if applicable)</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='bold'>13. Fish Attractors (if applicable)</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold green'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}} className='bold green'>14. Dam and shoreline Maintenance</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='bold'>15. Spillway Barrier (if applicable)</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='bold'>16. Siphon System (if applicable)</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='bold'>17. Nuisance Animal Control (if applicable)</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold green'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}} className='bold green'>18. Annual Evaluation</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px"}} className='bold'>19. Destratification System (if applicable)</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold red'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#ff0000"}} className='bold red'>IX. Summary of Management Recommendations</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold red'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#ff0000"}} className='bold red'>X.  Management Recommendations</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold green'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}} className='bold green'>XI. Recreational Stocking Options</td>
												</tr>
											</table>
									</td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold green'>
									<table width='100%' cellSpacing='0' cellSpacing='0' border='0'>
												<tr>
													<td width='21'><input type='checkbox'/></td>
													<td align='left' style={{fontFamily:"Arial", fontSize:"11px", color:"#008000"}} className='bold green'>XII.Records</td>
												</tr>
											</table>
									</td></tr>
								<tr height="50"><td className='bold green'></td></tr>
								<tr><td style={{fontFamily:"Arial", fontSize:"11px"}}  className='bold green'><table width="200" cellSpacing="0" cellPadding="5" bordercolor="#000" border="1" align="center"><tr><td align="center"><u style={{fontSize:"14px", color:"#000"}}>TEMPLATE STYLE</u><span style={{fontSize:"13px", color:"#000", fontWeight:"normal", display:"block", marginTop:"10px"}}>Ongoing w/ comparison</span></td></tr></table></td></tr>
						</table>

					</td>
				</tr>

			</table>
		</td>
	</tr>
</table>

		 </div>
		</div>
	</>);
}
