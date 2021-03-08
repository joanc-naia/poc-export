import * as ExcelJS from 'exceljs';
export const borderBottomThin = {bottom: {style: 'thin'}};
export const borderAll = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
export const borderAllMedium = {top: {style: 'medium'}, left: {style: 'medium'}, bottom: {style: 'medium'}, right: {style: 'medium'}};
export const borderTop = {top: {style: 'medium'}};
export const borderBottom = {bottom:{style:'medium'}};
export const borderLeft = {left: {style:'medium'}};
export const borderRight = {right: {style: 'medium'}};
export const borderHeaderTop = {top: {style: 'medium'}, left: {style: 'medium'}, right: {style: 'medium'}};
export const borderHeaderBottom = {bottom: {style: 'medium'}, left: {style: 'medium'}, right: {style: 'medium'}};
export const borderHeaderTopLeft = {top: {style: 'medium'}, left: {style: 'medium'}, right: {style: 'thin'}};
export const borderHeaderTopRight = {top: {style: 'medium'}, right: {style: 'medium'}, left: {style: 'thin'}};
export const borderHeaderMiddle = {top: {style: 'medium'}, right: {style: 'thin'}, left: {style: 'thin'}};
export const borderBodyLeft = {bottom: {style: 'thin'}, left: {style: 'medium'}, right: {style: 'thin'}};
export const borderBodyRight = {bottom: {style: 'thin'}, right: {style: 'medium'}, left: {style: 'thin'}};
export const borderBodyMiddle = {bottom: {style: 'thin'}, right: {style: 'thin'}, left: {style: 'thin'}};
export const alignCenter = { horizontal: 'center', wrapText: true};
export const alignMiddle = { vertical: 'middle', wrapText: true };
export const alignRight = {horizontal: 'right', wrapText: true};
export const alignRightMiddle = {vertical: 'middle', horizontal: 'right', wrapText: true};
export const alignMiddleCenter = { vertical: 'middle', horizontal: 'center', wrapText: true };
export const fontBold = {bold: true};
const fontItalic = {italic: true};
const fontBoldItalic = {italic: true, bold: true}
export const fontBoldUnderline = {bold: true, underline: true}
export const fontRed = {color: {'argb': 'FFFF0000'}};
const fontBoldRed = {color: {'argb': 'FFFF0000'}, bold: true};
const fontItalicRed = {color: {'argb': 'FFFF0000'}, italic: true};
const fontBoldItalicRed = {color: {'argb': 'FFFF0000'}, italic: true, bold: true};
const fontGreen = {color: {'argb': 'FF008000'}};
const fontBoldGreen = {color: {'argb': 'FF008000'}, bold: true};
const fontItalicGreen = {color: {'argb': 'FF008000'}, italic: true};
const fontBoldItalicGreen = {color: {'argb': 'FF008000'}, italic: true, bold: true};
export const grayBG = {type: 'pattern', pattern: 'solid', fgColor: {argb:'33D2D2D2'}};
export const defaultFont = {name: 'Arial', size: 8};
export const box = {value: 'o', font: {name: 'Wingdings', size:11}};
export const boxChecked = {value: 'þ', font: {name: 'Wingdings', size:11}};
export const boxShaded = {value: 'n', font: {name: 'Wingdings', size:11}};

export const page6data = [
[
  [3, boxShaded],
  [4, {value: 'Cover Letter', font: fontBoldRed}],
  [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text: '7. Supplemental Feeding '},
    {font: {...defaultFont, ...fontItalic}, text: '(choose '},
    {font: {...defaultFont, ...fontBoldItalic}, text: 'ONLY'},
    {font: {...defaultFont, ...fontItalic}, text: ' one if applicable)'}
  ]}}]
], [
  [3, boxShaded], [4, {value: 'I. Cover Page', font: fontBoldRed}],
  [9, boxShaded], [10, {value: 'BFP (Begin Feeding Program)'}]
], [
  [3, boxShaded], [4, {value: 'II. Introduction', font: fontBoldRed}],
  [9, box], [10, {value: 'IFP (Intensify Feeding Program)'}]
], [
  [3, boxShaded], [4, {value: 'III. Pond Assessment', font: fontBoldRed}],
  [9, box], [10, {value: 'CFP (Continue Feeding Program)'}]
], [
  [3, boxShaded], [4, {value: 'IV. Fish Community Balance', font: fontBoldGreen}],
  [10, {value: {richText: [
    {font: {...defaultFont, ...fontBoldGreen}, text:'8. Aquatic Weed Control '},
    {font: {...defaultFont, ...fontItalicGreen}, text: '('},
    {font: {...defaultFont, ...fontBoldItalicGreen}, text: 'MUST'},
    {font: {...defaultFont, ...fontItalicGreen}, text: ' choose '},
    {font: {...defaultFont, ...fontBoldItalicGreen}, text: 'ONLY'},
    {font: {...defaultFont, ...fontItalicGreen}, text: ' one)'}
  ]}}]
], [
  [3, boxShaded], [4, {value: 'V. Fishery Assessment', font: fontBoldRed}],
  [9, box], [10, {value: 'AWC - NWP (No Weeds Present)', font: fontGreen}]
], [
  [3, boxShaded], [4, {value: 'VI. Tag data (optional)', font: fontBoldRed}],
  [9, boxShaded], [10, {value: 'AWC - WP (Weeds Present - 3 Control Methods)', font: fontGreen}]
], [
  [4, {value: {richText: [
    {font: {...defaultFont, ...fontBoldRed}, text:'VII. Current State Of Balance '},
    {font: {...defaultFont, ...fontItalicRed}, text:'('},
    {font: {...defaultFont, ...fontBoldItalicRed}, text:'MUST'},
    {font: {...defaultFont, ...fontItalicRed}, text:' choose '},
    {font: {...defaultFont, ...fontBoldItalicRed}, text:'ALL'},
    {font: {...defaultFont, ...fontItalicRed}, text:' that apply)'},
  ]}}],
  [9, box], [10, {value: 'AWC - WPGC (Weeds Present - Grass Carp Emphasis)', font: fontGreen}]
], [
  [3, box], [4, {value: 'BAL (Balance)', font: fontRed}],
  [9, box], [10, {value: 'AWC - WPH (Weeds Present - Herbicide Emphasis)', font: fontGreen}]
], [
  [3, box], [4, {value: 'PC (Predator-Crowded)', font: fontRed}],
  [9, box], [10, {value: `AWC - WPGCH (Weeds Present - Grass Carp & Herbicide)`, font: fontGreen}]
], [
  [3, box], [4, {value: 'FC (Forage-Crowded)', font: fontRed}],
  [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'9. Aquatic Weed ID'},
    {font: {...defaultFont, ...fontItalic}, text:' (choose '},
    {font: {...defaultFont, ...fontBoldItalic}, text:'ALL'},
    {font: {...defaultFont, ...fontItalic}, text:' that apply if applicable)'}
  ]}}]
], [
  [3, box], [4, {value: 'COM-PRED (CompetingPredator Species)'}],
  [9, box], [10, {value: 'Alligatorweed'}], [13, box], [14, {value: 'Lemon Bacopa'}]
], [
  [3, box], [4, {value: 'COM-PREY (Competing Prey Species)'}],
  [9, box], [10, {value: 'Arrow Arum'}], [13, box], [14, {value: 'Lizard Tail'}]
], [
  [4, {value: 'VIII. Recommended Management Activities', font: fontBold}],
  [9, box], [10, {value: 'Arrowhead'}], [13, box], [14, {value: 'Lotus'}]
], [
  [4, {value: {richText: [
    {font: {...defaultFont, ...fontBoldGreen}, text:'1. Fish Harvest '},
    {font: {...defaultFont, ...fontItalicGreen}, text:'('},
    {font: {...defaultFont, ...fontBoldItalicGreen}, text:'MUST'},
    {font: {...defaultFont, ...fontItalicGreen}, text:' choose '},
    {font: {...defaultFont, ...fontBoldItalicGreen}, text:'ONLY'},
    {font: {...defaultFont, ...fontItalicGreen}, text:' one)'},
  ]}}],
  [9, box], [10, {value: 'Baby Tears'}], [13, box], [14, {value: 'Lyngbya'}]
], [
  [3, box], [4, {value: 'HBN (Harvest Bass - No)', font: fontGreen}],
  [9, box], [10, {value: 'Banana Lily'}], [13, box], [14, {value: 'Mosquito Fern'}]
], [
  [3, box], [4, {value: 'HBY (Harvest Bass - Yes)', font: fontGreen}],
  [9, box], [10, {value: 'Blue-green Algae'}], [13, box], [14, {value: 'Parrot Feather'}]
], [
  [3, box], [4, {value: 'HBYL (Harvest Bass - Yes Light)', font: fontGreen}],
  [9, box], [10, {value: 'Black Willow'}], [13, box], [14, {value: 'Pickerelweed'}],
], [
  [3, box], [4, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'2. Lime Application'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
  [9, box], [10, {value: 'Bladderwort'}], [13, box], [14, {value: 'Pondweed'}],
], [
  [4, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'3. Fertilization'},
    {font: {...defaultFont, ...fontItalic}, text:' (choose '},
    {font: {...defaultFont, ...fontBoldItalic}, text:'ONLY'},
    {font: {...defaultFont, ...fontItalic}, text:' one if applicable)'},
  ]}}],
  [9, box], [10, {value: 'Bog Moss'}], [13, box], [14, {value: 'Slender Spike Rush'}],
], [
  [3, box], [4, {value: 'FERT (Fertilization - SportMax Service Route and Bulk SportMax Options)'}],
  [9, box], [10, {value: 'Brittle Pondweed'}], [13, box], [14, {value: 'Smartweed'}],
], [
  [3, box], [4, {value: 'FERT - SR (SportMax Service Route Emphasis)'}],
  [9, box], [10, {value: 'Bull Tongue (duck potato)'}], [13, box], [14, {value: 'Southern Naiad'}],
], [
  [3, box], [4, {value: 'FERT - SPORT (Bulk SportMax Emphasis)'}],
  [9, box], [10, {value: 'Bulrush'}], [13, box], [14, {value: 'Southern Water Grass'}],
], [
  [3, box], [4, {value: 'FERT - SRL (Liquid Service Route Emphasis)'}],
  [9, box], [10, {value: 'Buttonbush'}], [13, box], [14, {value: 'Spatterdock'}],
], [
  [3, box], [4, {value: 'FERT - BTFP (Bulk Tank Fertilizer Program)'}],
  [9, box], [10, {value: 'Cattail'}], [13, box], [14, {value: 'Star grass'}],
], [
  [4, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'4. Supplemental Bass Stocking'},
    {font: {...defaultFont, ...fontItalic}, text:' (choose '},
    {font: {...defaultFont, ...fontBoldItalic}, text:'ONLY'},
    {font: {...defaultFont, ...fontItalic}, text:' one if applicable)'},
  ]}}],
  [9, box], [10, {value: 'Chara'}], [13, box], [14, {value: 'Torpedo Grass'}],
], [
  [3, box], [4, {value: 'SBS - All Bass (F1, Northern, Feed-trained)'}],
  [9, box], [10, {value: 'Common Water Weed'}], [13, box], [14, {value: 'Water Hyacinth'}],
], [
  [3, box], [4, {value: 'SBS - FT (Feed-trained)'}],
  [9, box], [10, {value: 'Coontail'}], [13, box], [14, {value: 'Water Pennywort'}],
], [
  [3, box], [4, {value: 'SBS - Genetic Shift (F1, Northern, Feed-trained)'}],
  [9, box], [10, {value: 'Duckweed'}], [13, box], [14, {value: 'Water Primrose'}],
], [
  [3, box], [4, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'5. Supplemental Bass Stocking '},
    {font: {...defaultFont, ...fontItalic}, text:'(choose '},
    {font: {...defaultFont, ...fontBoldItalic}, text:'ONLY'},
    {font: {...defaultFont, ...fontItalic}, text:' one if applicable)'},
  ]}}],
  [9, box], [10, {value: 'Elephant Ear'}], [13, box], [14, {value: 'Watershield'}],
], [
  [3, box], [4, {value: 'SFS - 1 (TFS, CNB, TILAPIA, CRAWFISH)'}],
  [9, box], [10, {value: 'Euglena'}], [13, box], [14, {value: 'Water Willow'}],
], [
  [3, box], [4, {value: 'SFS - 2 (TFS, CNB, TILAPIA)'}],
  [9, box], [10, {value: 'Eurasian Water Milfoil'}], [13, box], [14, {value: 'Watermeal'}],
], [
  [3, box], [4, {value: 'SFS - 3 (TFS, CNB, CRAWFISH)'}],
  [9, box], [10, {value: 'Filamentous Algae spp.'}], [13, box], [14, {value: 'Waterpod'}],
], [
  [3, box], [4, {value: 'SFS - 4 (TFS, TILAPIA, CRAWFISH)'}],
  [9, box], [10, {value: 'Fragrant Water Lily'}], [13, box], [14, {value: 'Other:'}],
], [
  [3, box], [4, {value: 'SFS - 5 (TFS, TILAPIA)'}],
  [9, box], [10, {value: 'Green Algae'}], [13, box], [14, {value: 'Other:'}],
], [
  [3, box], [4, {value: 'SFS - 6 (TFS, CRAWFISH)'}],
  [9, box], [10, {value: 'Hydrilla'}], [13, box], [14, {value: 'Other:'}],
], [
  [3, box], [4, {value: 'SFS - 7 (TFS, CNB)'}],
  [9, box], [10, {value: 'Hydrodictyon'}],
], [
  [3, box], [4, {value: 'SFS - 8 (TFS with GZS Present and Reproducing)'}],
  [9, box], [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'10. Trash Rack'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - 9 (TFS after GZS are Reduced with Rotenone)'}],
  [9, box], [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'11. Selective Rotenone Treatment'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - 10 (TFS)'}],
  [9, box], [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'12. Siltation and Turbidity Control'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - 11 (CNB, TILAPIA, CRAWFISH)'}],
  [9, box], [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'13. Fish Attractors'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - 12 (CNB, TILAPIA)'}],
  [9, box], [10, {value: '14. Dam and shoreline Maintenance', font: fontBoldGreen}],
], [
  [3, box], [4, {value: 'SFS - 13 (CNB, CRAWFISH)'}],
  [9, box], [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'15. Spillway Barrier'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - 14 (CNB)'}],
  [9, box], [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'16. Siphon System'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - 15 (CNB Genetics)'}],
  [9, box], [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'17. Nuisance Animal Control'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - 16 (TILAPIA, CRAWFISH)'}],
  [9, box], [10, {value: '18. Annual Evaluation', font: fontBoldGreen}],
], [
  [3, box], [4, {value: 'SFS - 17 (TILAPIA)'}],
  [9, box], [10, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'19. Destratification System'},
    {font: {...defaultFont, ...fontItalic}, text:' (if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - 18 (CRAWFISH)'}],
  [9, box], [10, {value: 'IX. Summary of Management Recommendations', font: fontBoldRed}],
], [
  [3, box], [4, {value: 'SFS - 19 (GOS)'}],
  [9, box], [10, {value: 'X. Management Recommendations', font: fontBoldRed}],
], [
  [3, box], [4, {value: 'SFS - 20 (GZS with TFS Present)'}],
  [9, box], [10, {value: 'XI. Recreational Stocking Options', font: fontBoldGreen}],
], [
  [3, box], [4, {value: 'SFS - 21 (GZS)'}],
  [9, box], [10, {value: 'XII.Records', font: fontBoldGreen}],
], [
  [4, {value: {richText: [
    {font: {...defaultFont, ...fontBold}, text:'6. Supplemental Forage Stocking'},
    {font: {...defaultFont, ...fontItalic}, text:' (choose '},
    {font: {...defaultFont, ...fontBoldItalic}, text:'ALL'},
    {font: {...defaultFont, ...fontItalic}, text:' that apply if applicable)'},
  ]}}],
], [
  [3, box], [4, {value: 'SFS - AP1 (TFS with GZS Present and Reproducing; behind SFS section)'}],
  [10, {value: '', border: borderHeaderTop}],
], [
  [3, box], [4, {value: 'SFS - AP2 (TFS after GZS are Reduced with Rotenone; behind SFS section)'}],
  [10, {value: 'TEMPLATE STYLE', border: {...borderLeft, ...borderRight},
      font: fontBoldUnderline, alignment: alignMiddleCenter}],
], [
  [3, box], [4, {value: 'SFS - AP3 (CNB Genetics; behind SFS section)'}],
  [10, {value: '', border: {...borderLeft, ...borderRight}}],
], [
  [3, box], [4, {value: 'SFS - AP4 (GOS; behind SFS section)'}],
  [10, {value: 'Ongoing w/ comparison', border: {...borderLeft, ...borderRight},
      alignment: alignMiddleCenter}],
], [
  [3, box], [4, {value: 'SFS - AP5 (GZS with TFS Present; behind SFS section)'}],
  [10, {value: '', border: borderHeaderBottom}],
], [
  [3, box], [4, {value: 'SFS - AP6 (GZS; behind SFS section)'}],
]];

export const addRowFromData = (row, rowData) => {
  rowData.forEach(item=>{
    const col = item[0], data = item[1];
    row.getCell(col).value = data.value;
    if (data.font) row.getCell(col).font = data.font;
    if (data.border) row.getCell(col).border = data.border;
    if (data.alignment) row.getCell(col).alignment = data.alignment;
    if (data.fill) row.getCell(col).fill = data.fill;
  })
}
export const mergeCellsFromData = (sheet, cellsToMerge) => {
  cellsToMerge.forEach(range=>sheet.mergeCells(range));
}
export const setColWidths = (sheet, colWidths) => {
  sheet.columns.forEach((column, i) => {
    column.width = colWidths[i];
    column.eachCell(cell => {
      if (cell.type === ExcelJS.ValueType.String)
        cell.font = {...defaultFont, ...cell.font};
    });
  });
}