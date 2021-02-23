import React, { useRef, useState, useEffect } from 'react';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import './sample.css';
import extractCSS from "component-css-extractor";

export default function Electroeval() {
  const ref1 = useRef();
	const [open, setOpen] = useState(false);
	const workbookInit = new ExcelJS.Workbook();
	workbookInit.addWorksheet('Electro Eval')
	const [workbook, setWorkbook] = useState(workbookInit);

	const exportAsExcel2 = async () => {
		const style = extractCSS(ref1.current);
		const preHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><head><style>${style}</style></head><body><table>`;
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

	const exportAsWord2 = async () => {
		let style = extractCSS(ref1.current);
		// A4 size: 841.95pt 595.35pt;
  	// Letter size: 8.5in 11in;
		// Legal size: 8.5in 14in;
		style += `@page WordSection{size: 8.5in 11in;mso-page-orientation: portrait;\
      margin: 0.25in 0.25in 0.25in 0.25in}\
		div.Section1 {page: WordSection;}`;
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

		const html = `${preHtml}${document.getElementById('report').outerHTML}${postHtml}`;

		const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
		let link = document.createElement('A');
		link.href = url;
		link.download = 'Report.doc';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		handleButtonClick();
		console.log('html', html)
	}

	const exportAsPdf = () => {
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

	const exportAsPdf2 = () => {
		let doc = new jsPDF({
			orientation: 'p',
			unit: 'px',
			format: 'letter',
			hotfixes: ["px_scaling"]
		});
		// TODO: fix export to pdf without images
		const pageHTML = document.querySelector(`.report-container`).outerHTML;
		doc.html(pageHTML, {
			callback: doc=>{
				doc.save('Report.pdf');
			}
		})
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
					<button onClick={exportAsExcel2}>Export Report Excel</button>
					<button onClick={exportAsWord2}>Export Report Word</button>
					<button onClick={exportAsPdf}>Export Report PDF image</button>
					<button onClick={exportAsPdf2}>Export Report PDF text</button>
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
					<td align='center' valign='middle'><b style={{fontSize:"20px", fontWeight:"bold"}}>Electrofishing Evaluation Datasheet</b></td>
					<td align='right' valign='middle' className='page'>PAGE 1</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='0' cellSpacing='0'>
			<tr>
				<td>
					<table border='0' width='100%' cellPadding='2' cellSpacing='15'>
						<tr>
							<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial"}}>Data Recorded By:</td>
							<td className='bottomborder'>Testing</td>
							<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial"}}>Data Entered By:</td>
							<td className='bottomborder'>Testing</td>
							<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial"}} align='right'>Plan Finisher:</td>
							<td className='bottomborder'>Testing</td>
							<td width='125' valign='bottom' align='right' style={{fontSize:"12px", fontFamily:"Arial"}}>Follow Up By:</td>
							<td className='bottomborder'>Testing</td>
						</tr>
						<tr>
							<td width='125' style={{fontSize:"12px", fontFamily:"Arial"}}>Management Type:</td>
							<td colSpan='3' className='bottomborder'>Testing</td>
							<td width='145' align='right' style={{fontSize:"12px", fontFamily:"Arial"}} >Correspondence Type:</td>
							<td colSpan='3' className='bottomborder'>Testing</td>
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
						<table border='0' width='100%' cellPadding='2' cellSpacing='15'>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Customer:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Date:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Primary Contact:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Property Name:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='145' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Primary Contact Type:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>State/County:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Work Phone:</td>
								<td><table width='100%' cellPadding='0' cellSpacing='0'><tr><td className='bottomborder'>Testing</td><td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='40' align='center'>Ext:</td><td className='bottomborder'>Testing</td></tr></table></td>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Primary Uses:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Home Phone:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Fishing Goals:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Cell Phone:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Property Type:</td>
								<td className='bottomborder'>Testing</td>
							</tr>
							<tr>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Email:</td>
								<td className='bottomborder'>Testing</td>
								<td width='125' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}></td>
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
									<table style={{border:"2px solid #000"}} width='100%' cellPadding='2' cellSpacing='15'>
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
												<table border='0'  width='100%'  cellPadding='0' cellSpacing='15'>
													<tr>
														<td width='185' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Recommended BG Harvest:</td>
														<td><table border='0' width='100%' cellPadding='0' cellSpacing='0'><tr><td><input type='checkbox'/><label className='checklabel'>Suspend</label></td><td><input type='checkbox'/><label className='checklabel'>Consumptive</label></td><td><input type='checkbox'/><label className='checklabel'>Unlimited</label></td></tr></table></td>
													</tr>
													<tr>
														<td width='185' valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}>Recommended LMB Harvest:</td>
														<td><table border='0' width='100%' cellPadding='0' cellSpacing='0'><tr><td><input type='checkbox'/><label className='checklabel'>Yes</label></td><td><input type='checkbox'/><label className='checklabel'>No</label></td><td align='right'><label className='checklabel'>Inch Group:</label></td><td className='bottomborder'>Testing</td><td align='right'><label className='checklabel'>Lbs/Acre:</label></td><td className='bottomborder'>Testing</td></tr></table></td>
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
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='2' cellSpacing='15'>
							<tr>
								<td style={{border:"none"}}>
									<table border='0'  width='100%' cellPadding='9' cellSpacing='0'>
										<tr>
											<td colSpan='2' align='center'><b>GPS Coordinates</b></td>
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
					<th style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Order</th>
					<th style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Date</th>
					<th style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Recommended Activity</th>
					<th style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Qty</th>
					<th style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Unit</th>
					<th style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Price</th>
					<th style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Level *</th>
					<th style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Status **</th>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Testing</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='8' cellSpacing='0'>
				<tr>
					<td colSpan='2' align='center' style={{fontSize:"16px", fontWeight:"bold"}} bgcolor='#bfbfbf'>Send Management Plan To Information</td>
				</tr>
				<tr>
					<td style={{fontSize:"13px", fontWeight:"bold", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Send To:</td>
					<td style={{fontSize:"13px", fontWeight:"bold", borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>Send To:</td>
				</tr>
				<tr height='60'>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}><table border='0' width='100%' cellPadding='0' cellSpacing='0'><tr><td valign='center'><input type='checkbox'/><label className='checklabel' >Bound</label></td><td><input type='checkbox'/><label className='checklabel'>Unbound</label></td><td><input type='checkbox'/><label className='checklabel'>Email PDF?</label></td><td><input type='checkbox'/><label className='checklabel'>Cover Letter?</label></td></tr></table></td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}><table border='0' width='100%' cellPadding='0' cellSpacing='0'><tr><td><input type='checkbox'/><label className='checklabel'>Bound</label></td><td><input type='checkbox'/><label className='checklabel'>Unbound</label></td><td><input type='checkbox'/><label className='checklabel'>Email PDF?</label></td><td><input type='checkbox'/><label className='checklabel'>Cover Letter?</label></td></tr></table></td>
				</tr>
				<tr>
					<td colSpan='2' style={{borderTop:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Consulter With: <label style={{fontSize:"12px", fontFamily:"Arial"}}>Testing</label></td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<pre><br clear="all" className="page-break"/></pre>
<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px", pageBreakAfter: "always"}} className="page2">
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
					<td align='right' valign='middle' className='page'>PAGE 2</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td style={{fontSize:"13px", fontWeight:"bold"}}><u>Pond Assessment / Water Control / Physical Characteristics</u></td>
	</tr>
	<tr>
		<td>
			<table width='100%' cellPadding='5' cellSpacing='10' border='0'>
				<tr>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='150'>Date of Impoundment:</td>
					<td className='bottomborder'>Testing</td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='120' align='center'>Dam Type:</td>
					<td className='bottomborder' colSpan='3'>Testing</td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Condition:</td>
					<td className='bottomborder'>Testing</td>
				</tr>
				<tr>
					<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='140'>Emergency Spillway:</td>
					<td><input type='checkbox'/><label className='checklabel'>Yes</label><input type='checkbox'/><label className='checklabel'>No</label></td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' align='center' colSpan=''>Spillway Material:</td>
					<td className='bottomborder' colSpan='3'>Testing</td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Condition:</td>
					<td className='bottomborder'>Testing</td>
				</tr>
				<tr>
					<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='140'>Mechanical Spillway:</td>
					<td><input type='checkbox'/><label className='checklabel'>Yes</label><input type='checkbox'/><label className='checklabel'>No</label></td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' align='center'>Diameter (in):</td>
					<td className='bottomborder'>Testing</td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Material:</td>
					<td className='bottomborder'>Testing</td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='90' align='center'>Condition:</td>
					<td className='bottomborder'>Testing</td>
				</tr>
				<tr>
					<td  style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom' width='140'>Trash Rack:</td>
					<td><input type='checkbox'/><label className='checklabel'>Yes</label><input type='checkbox'/><label className='checklabel'>No</label></td>
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
					<td>
						<table width='100%' cellPadding='5' cellSpacing='10' border='0'>
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
								<td colSpan='2' style={{fontSize:"13px", fontWeight:"bold"}} align='center'><u>Water Characteristics</u></td>
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
								<td><input type='checkbox'/><label className='checklabel'>Yes</label><input type='checkbox'/><label className='checklabel'>No</label></td>
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
		<td style={{fontSize:"13px", fontWeight:"bold"}}><u>Pond Management History</u></td>
	</tr>
	<tr>
		<td>
			<table width='100%' cellPadding='5' cellSpacing='10' border='0'>
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
					<td>None  /  Limited  /  Moderate  /  Adequate  /  Excessive</td>
					<td></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width='100%' cellPadding='5' cellSpacing='10' border='0'>
				<tr>
					<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Liming:</td>
					<td className='bottomborder'>Testing</td>
					<td valign='bottom' width='120'>Last Limed (year):</td>
					<td className='bottomborder'>Testing</td>
					<td valign='bottom' align='right' width='100'>Qty (tons):</td>
					<td className='bottomborder'>Testing</td>
					<td valign='bottom' align='right' width='120'>Did we apply lime?</td>
					<td className='bottomborder'>Testing</td>
				</tr>
				<tr>
					<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Fertilizing: </td>
					<td className='bottomborder' colSpan='3'>Testing</td>
					<td valign='bottom' align='right' width='100'>Type:</td>
					<td className='bottomborder'>Testing</td>
					<td valign='bottom' align='right' width='120'>Do we fertilize?</td>
					<td className='bottomborder'>Testing</td>
				</tr>
				<tr>
					<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Feeding:  </td>
					<td className='bottomborder' colSpan='3'>Testing</td>
					<td valign='bottom' align='right' width='100'>Type:</td>
					<td className='bottomborder'>Testing</td>
					<td valign='bottom' align='right' width='120'>Qty (feeders):</td>
					<td className='bottomborder'>Testing</td>
				</tr>
				<tr>
					<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Structure: </td>
					<td className='bottomborder' colSpan='3'>Testing</td>
					<td valign='bottom' align='right' width='100'>Type:</td>
					<td className='bottomborder' colSpan='3'>Testing</td>

				</tr>
				<tr>
					<td width='135' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Initial Fish Stocking:</td>
					<td className='bottomborder' colSpan='3'>Testing</td>
				</tr>
				<tr>
					<td width='145' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Recent Fish Stocking:<br /><small style={{fontSize:"9px", fontWeight:"normal"}}>(from sources other than SEPM)</small></td>
					<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} align='right' width='90'>Year:</td>
					<td className='bottomborder'>Testing</td>
					<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}  align='right' width='90'>Source:</td>
					<td className='bottomborder' colSpan="2">Testing</td>
					<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}  align='right' width='90'>Species:</td>
					<td className='bottomborder' colSpan="2">Testing</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width='100%' cellPadding='5' cellSpacing='10' border='0'>
				<tr>
					<td width='100' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} valign='bottom'>Grass Carp:</td>
					<td className='bottomborder' colSpan='3'>Testing</td>
					<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} align='right' width='120'>Number Stocked:</td>
					<td className='bottomborder'>Testing</td>
					<td valign='bottom' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}}  align='right' width='120'>When:</td>
					<td className='bottomborder'>Testing</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width='100%' style={{border:"2px solid #000"}} cellPadding='8' cellSpacing='0'>
				<tr>
					<th style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Aquatic Weeds Observed</th>
					<th style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Coverage</th>
					<th style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>% Percentage</th>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>&nbsp;</td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<pre><br clear="all" className="page-break"/></pre>
<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px",  pageBreakBefore: "always"}} className="page3">
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
					<td align='right' valign='middle' className='page'>PAGE 3</td>
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
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='90'>Reproduction:</td>
					<td className='bottomborder'>Testing</td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='90' align="right">Harvested:</td>
					<td className='bottomborder'>Testing</td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='130' align="right">Population Status:</td>
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
					<td colSpan='2' align='left' style={{fontSize:"13px", fontWeight:"bold"}} bgcolor='#d2d2d2'>Logged LMB Details</td>
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
								<th bgcolor='#d2d2d2' style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Fish #</th>
								<th bgcolor='#d2d2d2' style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Millimeter</th>
								<th bgcolor='#d2d2d2' style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Grams</th>
								<th bgcolor='#d2d2d2' style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Recapture</th>
							</tr>
							<tr>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
						</table>
					</td>
					<td width='20'></td>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Fish #</th>
								<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Millimeter</th>
								<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Grams</th>
								<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Recapture</th>
							</tr>
							<tr>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
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
					<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Fish #</th>
					<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Millimeter</th>
					<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Grams</th>
					<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Tag #</th>
					<th bgcolor='#d2d2d2'  style={{borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Recapture</th>
				</tr>
				<tr>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
				<tr>
					<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Logged LMB<br /><small>Length (Inches)</small></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>23</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>24</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>25</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>26</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>27</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>28</td>
				</tr>
				<tr>
					<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Count</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
				<tr>
					<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>LMB (unlogged)<br /><small>Length (Inches)</small></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20</td>
				</tr>
				<tr>
					<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Count</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table border='0' width='100%' cellPadding='5' cellSpacing='0'>
				<tr>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='100'>Reproduction :</td>
					<td className='bottomborder'>Testing</td>
					<td style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='100'>Bluegill Type :</td>
					<td className='bottomborder'>Testing</td>
				</tr>
			</table>
		</td>
	</tr>

	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
				<tr>
					<td colSpan='2' align='left' style={{fontSize:"13px", fontWeight:"bold"}} bgcolor='#d2d2d2'>Logged Bluegill Details</td>
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
								<th bgcolor='#d2d2d2' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Fish #</th>
								<th bgcolor='#d2d2d2' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Millimeter</th>
								<th bgcolor='#d2d2d2' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Grams</th>
							</tr>
							<tr>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
							</tr>
						</table>
					</td>
					<td width='20'></td>
					<td>
						<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
							<tr>
								<th bgcolor='#d2d2d2' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Fish #</th>
								<th bgcolor='#d2d2d2' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Millimeter</th>
								<th bgcolor='#d2d2d2' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000", fontSize:"13px", fontWeight:"bold"}}>Grams</th>
							</tr>
							<tr>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
								<td style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
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
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12</td>
				</tr>
				<tr>
					<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Count</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table style={{border:"2px solid #000"}} width='100%' cellPadding='5' cellSpacing='0'>
				<tr>
					<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Bluegill (unlogged)<br /><small>Length (Inches)</small></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12</td>
				</tr>
				<tr>
					<td bgcolor='#d2d2d2' style={{fontSize:"12px", fontFamily:"Arial", fontWeight:"bold"}} width='120'>Count</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<pre><br clear="all" className="page-break"/></pre>
<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px",  pageBreakBefore: "always"}} className="page4">
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
					<td align='right' valign='middle' className='page'>PAGE 4</td>
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
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>1 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>1 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>2 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>3 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>4 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>5 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>6 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>7 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>8 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>9 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>10 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>11 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>12 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>13 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>14 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>15 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>16 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>17 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>18 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>19 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>23 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>20 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>23 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>23 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>24 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>21 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>24 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>24 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>25 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>22 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>25 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>25 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>26 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>26 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>26 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>27 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>27 -</td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}>27 -</td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
				<tr>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
					<td align='center' style={{borderTop:"1px solid #000", borderLeft:"1px solid #000"}}></td>
				</tr>
			</table>
		</td>
	</tr>
</table>

<pre><br clear="all" className="page-break"/></pre>
<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px",  pageBreakBefore: "always"}} className="page5">
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
					<td align='right' valign='middle' className='page'>PAGE 5</td>
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
														<td><table width='100%' cellPadding='0' cellSpacing='0' border='0'><tr><td  width='200'><input type='checkbox'/><label className='checklabel'>Agricultural lime application:</label></td><td className='bottomborder' width='60'></td><td>tons/acre</td></tr></table></td>
													</tr>
													<tr>
														<td>
														<table width='100%' cellPadding='0' cellSpacing='0' border='0'><tr><td width='20'></td><td><input type='checkbox'/><label className='checklabel'>Tum-key</label></td><td><input type='checkbox'/><label className='checklabel'>Application Only</label></td><td><input type='checkbox'/><label className='checklabel'>They Load</label></td></tr></table>
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
														<td><table width='100%' cellPadding='0' cellSpacing='0' border='0'><tr><td><input type='checkbox'/><label className='checklabel'>Fertilizer (bulk)</label></td><td><input type='checkbox'/><label className='checklabel'>Fertilizer (route)</label></td></tr></table></td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Intermediate coppernose bluegill</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Crawfish</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>lbs/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Golden shiners</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Tilapia</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>lbs/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Threadfin shad</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>loads</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Gizzard sad</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>loads/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Other:</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Herbicide Application</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>(chemical name)</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Grass carp: diploid / triploid</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td></td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Aquashade:</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>gallons</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Begin program:</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>feeders</td>
																	<td width='60'></td>
																	<td width='60'>Model</td>
																	<td className='bottomborder' width='80'>&nbsp;</td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Maintain program</label></td>
																	<td  width='60'></td>
																	<td width='80'></td>
																	<td width='60'></td>
																	<td width='60'></td>
																	<td >&nbsp;</td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Intensify program:</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>feeders</td>
																	<td width='60'></td>
																	<td width='60'>Model</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Standpipe diameter</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>inches</td>
																	<td width='60'></td>
																	<td width='60'></td>
																	<td>&nbsp;</td>
																	<td width='60'></td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Install trash rack</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>inches</td>
																	<td width='60' className='bottomborder'></td>
																	<td width='60'>up</td>
																	<td className='bottomborder' width='80'>&nbsp;</td>
																	<td width='60'>down</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Adult LMB</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>(type)</td>
																	<td width='60' className='bottomborder'></td>
																	<td width='60'>(size)</td>
																	<td className='bottomborder' width='80'>&nbsp;</td>
																	<td width='60'>(quanity)</td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Fing. LMB</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>(type)</td>
																	<td width='60' className='bottomborder'></td>
																	<td width='60'>(size)</td>
																	<td className='bottomborder' width='80'>&nbsp;</td>
																	<td width='60'>(quanity)</td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Coppernose Bluegill</label></td>
																	<td width='60'></td>
																	<td width='80'></td>
																	<td width='60' className='bottomborder'></td>
																	<td width='60'>(size)</td>
																	<td className='bottomborder' width='80'>&nbsp;</td>
																	<td width='60'>(quanity)</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Annual Ealuation</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>(Month/Year)</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Trout</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Hybrid striped bass</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Channel catfish</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Feed-trained LMB</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Crappie</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Smallmouth bass</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Jumbo LMB</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>lbs</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Shellcracker</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td>/acre</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Harvest</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>inch</td>
																	<td width='60' className='bottomborder'></td>
																	<td width='3	0'>@</td>
																	<td className='bottomborder' width='60'>&nbsp;</td>
																	<td width='60'>lbs/acre</td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Harvest</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>inch</td>
																	<td width='60' className='bottomborder'></td>
																	<td width='30'>@</td>
																	<td className='bottomborder' width='60'>&nbsp;</td>
																	<td width='60'>lbs/acre</td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Harvest</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>inch</td>
																	<td width='60' className='bottomborder'></td>
																	<td width='30'>@</td>
																	<td className='bottomborder' width='60'>&nbsp;</td>
																	<td width='60'>lbs/acre</td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Suspend Harvest</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>(species)</td>
																	<td width='60'></td>
																	<td width='30'></td>
																	<td>&nbsp;</td>
																	<td width='60'></td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Electrofishing</label></td>
																	<td className='bottomborder' width='60'></td>
																	<td width='80'>hours</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Destrat System:</label></td>
																	<td className='bottomborder' width='100'></td>
																	<td>size/type</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Install fountain:</label></td>
																	<td className='bottomborder' width='100'></td>
																	<td>size/type</td>
																</tr>
																<tr>
																	<td  width='200'><input type='checkbox'/><label className='checklabel'>Install aerator:</label></td>
																	<td className='bottomborder' width='100'></td>
																	<td>size/type</td>
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
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Add Structure</label></td>
																	<td width='60'></td>
																	<td width='80'></td>
																	<td width='60'></td>
																	<td width='60'></td>
																	</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Drain pond--? Re-stock letter</label></td>
																	<td width='60'></td>
																	<td width='80'></td>
																	<td width='60'></td>
																	<td width='60'></td>

																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>PondToon information requested</label></td>
																	<td width='60'></td>
																	<td width='80'></td>
																	<td width='60'></td>
																	<td width='60'></td>
																	</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Deliver fish food</label></td>
																	<td width='60' className='bottomborder'></td>
																	<td width='80'>(type)</td>
																	<td width='60' className='bottomborder'></td>
																	<td width='60'>(#bags)</td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Install fish barrier:</label></td>
																	<td width='100' className='bottomborder'></td>
																	<td width='80' colSpan='2'>(typespillway width)</td>
																	<td width='60'></td>
																</tr>
																<tr>
																	<td  width='260'><input type='checkbox'/><label className='checklabel'>Nuisance animal control:</label></td>
																	<td width='100' className='bottomborder'></td>
																	<td width='80'>(species)</td>
																	<td width='60'></td>
																	<td width='60'></td>
																</tr>
																<tr>
																	<td colSpan='5'><input type='checkbox'/><label className='checklabel'>Dam and shoreline maintenance</label></td>

																</tr>
																<tr>
																	<td colSpan='5'><input type='checkbox'/><label className='checklabel'>Install siphon system</label></td>

																</tr>
																<tr>
																	<td colSpan='5'><input type='checkbox'/><label className='checklabel'>Rotenone application (control shad)</label></td>

																</tr>
																<tr>
																	<td colSpan='5'><input type='checkbox'/><label className='checklabel'>Rotenone application (complete renovation)</label></td>

																</tr>
																<tr>
																	<td  colSpan='5'><input type='checkbox'/><label className='checklabel'>Siltation/turbidity control</label></td>

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
<table border='0' width='100%' cellPadding='5' cellSpacing='0' style={{marginTop:"35px",  pageBreakBefore: "always"}} className="page6">
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
					<td align='right' valign='middle' className='page'>PAGE 6</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td>
			<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
				<tr>
					<td valign='top'>
						<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
							<tr><td className='red bold'><input type='checkbox'/>Cover Letter</td></tr>
							<tr><td className='red bold'><input type='checkbox'/>I. Cover Page</td></tr>
							<tr><td className='red bold'><input type='checkbox'/>II. Introduction</td></tr>
							<tr><td className='red bold'><input type='checkbox'/>III. Pond Assessment</td></tr>
							<tr><td className='green bold'><input type='checkbox'/>IV. Fish Community Balance</td></tr>
							<tr><td className='red bold'><input type='checkbox'/>V. Fishery Assessment</td></tr>
							<tr><td className='red bold'><input type='checkbox'/>VI. Tag data (optional)</td></tr>
							<tr><td className='margining red bold'>VII.	 Current State Of Balance (<b>MUST</b> choose <b>ALL</b> that apply)</td></tr>
							<tr><td className='red'><input type='checkbox'/>BAL (Balance)</td></tr>
							<tr><td className='red'><input type='checkbox'/>PC (Predator-Crowded)</td></tr>
							<tr><td className='red'><input type='checkbox'/>FC (Forage-Crowded)</td></tr>
							<tr><td><input type='checkbox'/>COM-PRED (CompetingPredator Species)</td></tr>
							<tr><td><input type='checkbox'/>COM-PREY (Competing Prey Species)</td></tr>
							 <tr><td className='margining bold'>VIII. Recommended Management Activities</td></tr>
							 <tr><td className='label2 bold green'>1. Fish Harvest (MUST choose <b>ONLY</b> one)</td></tr>
							<tr><td className='green'><input type='checkbox'/>HBN (Harvest Bass - No)</td></tr>
							<tr><td className='green'><input type='checkbox'/>HBY (Harvest Bass - Yes)</td></tr>
							<tr><td className='green'><input type='checkbox'/>HBYL (Harvest Bass - Yes Light)</td></tr>
							 <tr><td className='label2 bold'>2. Lime Application <small className='small' style={{fontWeight:"normal"}}>(if applicable)</small></td></tr>
							 <tr><td className='label2 bold'>3. Fertilization <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td></tr>
							<tr><td><input type='checkbox'/>FERT (Fertilization - SportMax Service Route and Bulk SportMax Options)</td></tr>
							<tr><td><input type='checkbox'/>FERT - SR (SportMax Service Route Emphasis)</td></tr>
							<tr><td><input type='checkbox'/>FERT - SPORT (Bulk SportMax Emphasis)</td></tr>
							<tr><td><input type='checkbox'/>FERT - SRL (Liquid Service Route Emphasis)</td></tr>
							<tr><td><input type='checkbox'/>FERT - BTFP (Bulk Tank Fertilizer Program)</td></tr>
							 <tr><td className='label2 bold'>4. Supplemental Bass Stocking <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td></tr>
							<tr><td><input type='checkbox'/>SBS - All Bass (F1, Northern, Feed-trained)</td></tr>
							<tr><td><input type='checkbox'/>SBS - FT (Feed-trained)</td></tr>
							<tr><td><input type='checkbox'/>SBS - Genetic Shift (F1, Northern, Feed-trained)</td></tr>
							<tr><td className='label2 bold'>5. Supplemental Bass Stocking  <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td></tr>
							<tr><td><input type='checkbox'/>SFS - 1 (TFS, CNB, TILAPIA, CRAWFISH)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 2 (TFS, CNB, TILAPIA)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 3 (TFS, CNB, CRAWFISH)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 4 (TFS, TILAPIA, CRAWFISH)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 5 (TFS, TILAPIA)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 6 (TFS, CRAWFISH)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 7 (TFS, CNB)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 8 (TFS with GZS Present and Reproducing)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 9 (TFS after GZS are Reduced with Rotenone)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 10 (TFS)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 11 (CNB, TILAPIA, CRAWFISH)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 12 (CNB, TILAPIA)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 13 (CNB, CRAWFISH)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 14 (CNB)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 15 (CNB Genetics)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 16 (TILAPIA, CRAWFISH)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 17 (TILAPIA)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 18 (CRAWFISH)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 19 (GOS)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 20 (GZS with TFS Present)</td></tr>
							<tr><td><input type='checkbox'/>SFS - 21 (GZS)</td></tr>
							<tr><td className='label2 bold'>6. Supplemental Forage Stocking  <small className='small' style={{fontWeight:"normal"}}>(choose <b>ALL</b> that apply if applicable)</small></td></tr>
							<tr><td><input type='checkbox'/>SFS - AP1 (TFS with GZS Present and Reproducing; behind SFS section)</td></tr>
							<tr><td><input type='checkbox'/>SFS - AP2 (TFS after GZS are Reduced with Rotenone; behind SFS section)</td></tr>
							<tr><td><input type='checkbox'/>SFS - AP3 (CNB Genetics; behind SFS section)</td></tr>
							<tr><td><input type='checkbox'/>SFS - AP4 (GOS; behind SFS section)</td></tr>
							<tr><td><input type='checkbox'/>SFS - AP5 (GZS with TFS Present; behind SFS section)</td></tr>
							<tr><td><input type='checkbox'/>SFS - AP6 (GZS; behind SFS section)</td></tr>
						</table>
					</td>
					<td valign='top'>
						<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
							<tr><td className='label2 bold'>7. Supplemental Feeding  <small className='small' style={{fontWeight:"normal"}}>(choose <b>ONLY</b> one if applicable)</small></td></tr>
							<tr><td><input type='checkbox'/>BFP (Begin Feeding Program)</td></tr>
							<tr><td><input type='checkbox'/>IFP (Intensify Feeding Program)</td></tr>
							<tr><td><input type='checkbox'/>CFP (Continue Feeding Program)</td></tr>
							<tr><td className='label2 green bold'>8. Aquatic Weed Contro  <small className='small' style={{fontWeight:"normal"}}>(<b>MUST</b> choose ONLY one)</small></td></tr>
							<tr><td className='green'><input type='checkbox'/>AWC - NWP (No Weeds Present)</td></tr>
							<tr><td  className='green'><input type='checkbox'/>AWC - WP (Weeds Present - 3 Control Methods)</td></tr>
							<tr><td  className='green'><input type='checkbox'/>AWC - WPGC (Weeds Present - Grass Carp Emphasis)</td></tr>
							<tr><td  className='green'><input type='checkbox'/>AWC - WPH (Weeds Present - Herbicide Emphasis)</td></tr>
							<tr><td  className='green'><input type='checkbox'/>AWC - WPGCH (Weeds Present - Grass Carp & Herbicide)</td></tr>
						</table>
						<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
							<tr><td className='label2 bold' colSpan='2'>9. Aquatic Weed ID  <small className='small' style={{fontWeight:"normal"}}>(choose <b>ALL</b> that apply if applicable)</small></td></tr>
							<tr>
								<td>
									<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
										<tr><td><input type='checkbox'/>Alligatorweed</td></tr>
										<tr><td><input type='checkbox'/>Arrow Arum</td></tr>
										<tr><td><input type='checkbox'/>Arrowhead</td></tr>
										<tr><td><input type='checkbox'/>Baby Tears</td></tr>
										<tr><td><input type='checkbox'/>Banana Lily</td></tr>
										<tr><td><input type='checkbox'/>Blue-green Algae</td></tr>
										<tr><td><input type='checkbox'/>Black Willow</td></tr>
										<tr><td><input type='checkbox'/>Bladderwort</td></tr>
										<tr><td><input type='checkbox'/>Bog Moss</td></tr>
										<tr><td><input type='checkbox'/>Brittle Pondweed</td></tr>
										<tr><td><input type='checkbox'/>Bull Tongue (duck potato)</td></tr>
										<tr><td><input type='checkbox'/>Bulrush</td></tr>
										<tr><td><input type='checkbox'/>Buttonbush</td></tr>
										<tr><td><input type='checkbox'/>Cattail</td></tr>
										<tr><td><input type='checkbox'/>Chara</td></tr>
										<tr><td><input type='checkbox'/>Common Water Weed</td></tr>
										<tr><td><input type='checkbox'/>Coontail</td></tr>
										<tr><td><input type='checkbox'/>Duckweed</td></tr>
										<tr><td><input type='checkbox'/>Elephant Ear</td></tr>
										<tr><td><input type='checkbox'/>Euglena</td></tr>
										<tr><td><input type='checkbox'/>Eurasian Water Milfoil</td></tr>
										<tr><td><input type='checkbox'/>Filamentous Algae spp.</td></tr>
										<tr><td><input type='checkbox'/>Fragrant Water Lily</td></tr>
										<tr><td><input type='checkbox'/>Green Algae</td></tr>
										<tr><td><input type='checkbox'/>Hydrilla</td></tr>
										<tr><td><input type='checkbox'/>Hydrodictyon</td></tr>
									</table>

								</td>
								<td>
									<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
										<tr><td><input type='checkbox'/>Lemon Bacopa</td></tr>
										<tr><td><input type='checkbox'/>Lizard Tail</td></tr>
										<tr><td><input type='checkbox'/>Lotus</td></tr>
										<tr><td><input type='checkbox'/>Lyngbya</td></tr>
										<tr><td><input type='checkbox'/>Mosquito Fern</td></tr>
										<tr><td><input type='checkbox'/>Parrot Feather</td></tr>
										<tr><td><input type='checkbox'/>Pickerelweed</td></tr>
										<tr><td><input type='checkbox'/>Pondweed</td></tr>
										<tr><td><input type='checkbox'/>Slender Spike Rush</td></tr>
										<tr><td><input type='checkbox'/>Smartweed</td></tr>
										<tr><td><input type='checkbox'/>Southern Naiad</td></tr>
										<tr><td><input type='checkbox'/>Southern Water Grass</td></tr>
										<tr><td><input type='checkbox'/>Spatterdock</td></tr>
										<tr><td><input type='checkbox'/>Star grass</td></tr>
										<tr><td><input type='checkbox'/>Torpedo Grass</td></tr>
										<tr><td><input type='checkbox'/>Water Hyacinth</td></tr>
										<tr><td><input type='checkbox'/>Water Pennywort</td></tr>
										<tr><td><input type='checkbox'/>Water Primrose</td></tr>
										<tr><td><input type='checkbox'/>Watershield</td></tr>
										<tr><td><input type='checkbox'/>Water Willow</td></tr>
										<tr><td><input type='checkbox'/>Watermeal</td></tr>
										<tr><td><input type='checkbox'/>Waterpod</td></tr>
										<tr><td><input type='checkbox'/>Other: </td></tr>
										<tr><td><input type='checkbox'/>Other: </td></tr>
										<tr><td><input type='checkbox'/>Other: </td></tr>
									</table>
								</td>
							</tr>
						</table>
						<table width='100%' cellPadding='2' cellSpacing='0' border='0'>
								<tr><td className='bold'><input type='checkbox'/>10. Trash Rack (if applicable)</td></tr>
								<tr><td className='bold'><input type='checkbox'/>11. Selective Rotenone Treatment (if applicable)</td></tr>
								<tr><td className='bold'><input type='checkbox'/>12. Siltation and Turbidity Control (if applicable)</td></tr>
								<tr><td className='bold'><input type='checkbox'/>13. Fish Attractors (if applicable)</td></tr>
								<tr><td className='bold green'><input type='checkbox'/>14. Dam and shoreline Maintenance</td></tr>
								<tr><td className='bold'><input type='checkbox'/>15. Spillway Barrier (if applicable)</td></tr>
								<tr><td className='bold'><input type='checkbox'/>16. Siphon System (if applicable)</td></tr>
								<tr><td className='bold'><input type='checkbox'/>17. Nuisance Animal Control (if applicable)</td></tr>
								<tr><td className='bold green'><input type='checkbox'/>18. Annual Evaluation</td></tr>
								<tr><td className='bold'><input type='checkbox'/>19. Destratification System (if applicable)</td></tr>
								<tr><td className='bold red'><input type='checkbox'/>IX. Summary of Management Recommendations</td></tr>
								<tr><td className='bold red'><input type='checkbox'/>X.  Management Recommendations</td></tr>
								<tr><td className='bold green'><input type='checkbox'/>XI. Recreational Stocking Options</td></tr>
								<tr><td className='bold green'><input type='checkbox'/>XII.Records</td></tr>
								<tr height="50"><td className='bold green'></td></tr>
								<tr><td className='bold green'><table width="200" cellSpacing="0" cellPadding="5" bordercolor="#000" border="1" align="center"><tr><td align="center"><u style={{fontSize:"14px", color:"#000"}}>TEMPLATE STYLE</u><span style={{fontSize:"13px", color:"#000", fontWeight:"normal", display:"block", marginTop:"10px"}}>Ongoing w/ comparison</span></td></tr></table></td></tr>
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
