const pptxgen = require('pptxgenjs');
const html2pptx = require('/home/z/my-project/skills/pptx/scripts/html2pptx.js');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, 'slides');
const OUTPUT = '/home/z/my-project/download/Pacific_Cross_Training_Deck.pptx';

// Colors (NO # prefix for PptxGenJS)
const C = {
  teal: '15857A',
  orange: 'FF6A3B',
  dark: '2D2D2D',
  light: 'F4F1E9',
  white: 'FFFFFF',
  gray: '888888',
  ltGray: 'CCCCCC',
  cream: 'FFF8F0',
  tealLight: 'B0D8D3',
};

async function build() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Pacific Cross Philippines';
  pptx.title = 'Pacific Cross Insurance Advisor Training';
  pptx.subject = 'Blue Royale × FlexiShield Training Deck';

  // ─── SLIDE 1: Cover ───
  console.log('Building slide 1: Cover');
  await html2pptx(path.join(SLIDES_DIR, 'slide01.html'), pptx);

  // ─── SLIDE 2: Agenda ───
  console.log('Building slide 2: Agenda');
  await html2pptx(path.join(SLIDES_DIR, 'slide02.html'), pptx);

  // ─── SLIDE 3: PH Insurance Landscape ───
  console.log('Building slide 3: PH Insurance Landscape');
  await html2pptx(path.join(SLIDES_DIR, 'slide03.html'), pptx);

  // ─── SLIDE 4: ASEAN Bar Chart ───
  console.log('Building slide 4: ASEAN Bar Chart');
  const { slide: slide4, placeholders: ph4 } = await html2pptx(path.join(SLIDES_DIR, 'slide04.html'), pptx);
  const aseanChart = ph4.find(p => p.id === 'asean-chart');
  if (aseanChart) {
    slide4.addChart(pptx.charts.BAR, [{
      name: 'Insurance Penetration (%)',
      labels: ['Indonesia', 'Vietnam', 'Philippines', 'Thailand', 'Malaysia', 'Singapore'],
      values: [3.1, 3.3, 1.79, 4.5, 4.8, 6.2],
    }], {
      ...aseanChart,
      barDir: 'col',
      showTitle: false,
      showLegend: false,
      showValue: true,
      dataLabelPosition: 'outEnd',
      dataLabelColor: C.dark,
      dataLabelFontSize: 9,
      catAxisLabelFontSize: 9,
      catAxisLabelColor: C.dark,
      valAxisHidden: true,
      catAxisLineShow: false,
      valAxisLineShow: false,
      valAxisMaxVal: 7,
      valAxisMinVal: 0,
      chartColors: ['15857A', '15857A', 'FF6A3B', '15857A', '15857A', '15857A'],
    });
  }

  // ─── SLIDE 5: Big Picture ───
  console.log('Building slide 5: Big Picture');
  await html2pptx(path.join(SLIDES_DIR, 'slide05.html'), pptx);

  // ─── SLIDE 6: Meet Blue Royale ───
  console.log('Building slide 6: Blue Royale');
  await html2pptx(path.join(SLIDES_DIR, 'slide06.html'), pptx);

  // ─── SLIDE 7: Blue Royale Highlights ───
  console.log('Building slide 7: Blue Royale Numbers');
  await html2pptx(path.join(SLIDES_DIR, 'slide07.html'), pptx);

  // ─── SLIDE 8: Meet FlexiShield ───
  console.log('Building slide 8: FlexiShield');
  await html2pptx(path.join(SLIDES_DIR, 'slide08.html'), pptx);

  // ─── SLIDE 9: FlexiShield Highlights ───
  console.log('Building slide 9: FlexiShield Numbers');
  await html2pptx(path.join(SLIDES_DIR, 'slide09.html'), pptx);

  // ─── SLIDE 10: Comparison Table ───
  console.log('Building slide 10: Comparison Table');
  const { slide: slide10, placeholders: ph10 } = await html2pptx(path.join(SLIDES_DIR, 'slide10.html'), pptx);
  const compTable = ph10.find(p => p.id === 'comparison-table');
  if (compTable) {
    const hdrOpts = { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, align: 'center', valign: 'middle' };
    const cellOpts = { fontSize: 9, align: 'center', valign: 'middle', color: C.dark };
    const altRow = { ...cellOpts, fill: { color: 'F0EDE4' } };
    const tableData = [
      [
        { text: 'Feature', options: hdrOpts },
        { text: 'Blue Royale', options: hdrOpts },
        { text: 'FlexiShield', options: hdrOpts },
      ],
      [
        { text: 'Coverage', options: cellOpts },
        { text: 'Up to USD 2M', options: { ...cellOpts, bold: true, color: C.teal } },
        { text: 'Up to PHP 2M', options: { ...cellOpts, bold: true, color: C.orange } },
      ],
      [
        { text: 'Currency', options: altRow },
        { text: 'USD', options: altRow },
        { text: 'PHP', options: altRow },
      ],
      [
        { text: 'Hospital Choice', options: cellOpts },
        { text: 'Any worldwide', options: cellOpts },
        { text: 'Philippine HMO network', options: cellOpts },
      ],
      [
        { text: 'Age Range', options: altRow },
        { text: '0 - 100', options: altRow },
        { text: '0 - 70', options: altRow },
      ],
      [
        { text: 'Maternity', options: cellOpts },
        { text: 'Yes', options: { ...cellOpts, color: '2E8B57', bold: true } },
        { text: 'No', options: { ...cellOpts, color: 'CC3333' } },
      ],
      [
        { text: 'COVID-19', options: altRow },
        { text: 'Yes', options: { ...altRow, color: '2E8B57', bold: true } },
        { text: 'Yes', options: { ...altRow, color: '2E8B57', bold: true } },
      ],
      [
        { text: 'Daily Hospital Income', options: cellOpts },
        { text: 'No', options: { ...cellOpts, color: 'CC3333' } },
        { text: 'PHP 1,000/day', options: { ...cellOpts, color: C.orange, bold: true } },
      ],
      [
        { text: 'Premium Level', options: altRow },
        { text: 'Premium', options: { ...altRow, color: C.teal, bold: true } },
        { text: 'Affordable', options: { ...altRow, color: C.orange, bold: true } },
      ],
    ];
    slide10.addTable(tableData, {
      x: compTable.x,
      y: compTable.y,
      w: compTable.w,
      h: compTable.h,
      colW: [compTable.w * 0.3, compTable.w * 0.35, compTable.w * 0.35],
      border: { pt: 0.5, color: C.ltGray },
      autoPage: false,
    });
  }

  // ─── SLIDE 11: Demographics Pie Chart ───
  console.log('Building slide 11: Demographics Pie Chart');
  const { slide: slide11, placeholders: ph11 } = await html2pptx(path.join(SLIDES_DIR, 'slide11.html'), pptx);
  const pieChart = ph11.find(p => p.id === 'demographics-pie');
  if (pieChart) {
    slide11.addChart(pptx.charts.PIE, [{
      name: 'Insurance Buyers by Age',
      labels: ['Young Pros (22-30)', 'Family Builders (31-40)', 'Peak Earners (41-50)', 'Pre-Retirement (51-60)', 'Retirees (61+)'],
      values: [25, 30, 25, 12, 8],
    }], {
      ...pieChart,
      showPercent: true,
      showLegend: true,
      legendPos: 'r',
      legendFontSize: 9,
      chartColors: ['15857A', 'FF6A3B', '1A7A6F', 'D4875E', 'B0D8D3'],
      dataLabelFontSize: 10,
      dataLabelColor: C.white,
    });
  }

  // ─── SLIDE 12: OFW Market ───
  console.log('Building slide 12: OFW Market');
  await html2pptx(path.join(SLIDES_DIR, 'slide12.html'), pptx);

  // ─── SLIDE 13: Common Misconceptions ───
  console.log('Building slide 13: Misconceptions');
  await html2pptx(path.join(SLIDES_DIR, 'slide13.html'), pptx);

  // ─── SLIDE 14: Myth vs Fact ───
  console.log('Building slide 14: Myth vs Fact');
  await html2pptx(path.join(SLIDES_DIR, 'slide14.html'), pptx);

  // ─── SLIDE 15: Advisor Playbook ───
  console.log('Building slide 15: Advisor Playbook');
  await html2pptx(path.join(SLIDES_DIR, 'slide15.html'), pptx);

  // ─── SLIDE 16: Objection Handling Table ───
  console.log('Building slide 16: Objection Handling');
  const { slide: slide16, placeholders: ph16 } = await html2pptx(path.join(SLIDES_DIR, 'slide16.html'), pptx);
  const objTable = ph16.find(p => p.id === 'objection-table');
  if (objTable) {
    const hOpts = { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, align: 'center', valign: 'middle' };
    const oOpts = { fontSize: 9, valign: 'middle', color: C.dark };
    const rOpts = { fontSize: 9, valign: 'middle', color: C.dark };
    const aRow = { fill: { color: 'F0EDE4' } };
    const objData = [
      [
        { text: 'Objection', options: hOpts },
        { text: 'Your Response', options: hOpts },
      ],
      [
        { text: '"I need to think about it"', options: { ...oOpts, bold: true, italic: true } },
        { text: '"Of course! But premiums increase yearly. Lock in your rate now."', options: rOpts },
      ],
      [
        { text: '"It\'s too expensive"', options: { ...oOpts, ...aRow, bold: true, italic: true } },
        { text: '"What\'s the cost of a single ICU day vs. years of protection?"', options: { ...rOpts, ...aRow } },
      ],
      [
        { text: '"I already have HMO"', options: { ...oOpts, bold: true, italic: true } },
        { text: '"Great! FlexiShield adds PHP 2M on top of your HMO."', options: rOpts },
      ],
      [
        { text: '"I\'m too young"', options: { ...oOpts, ...aRow, bold: true, italic: true } },
        { text: '"That\'s exactly why you get the lowest rates. Don\'t wait."', options: { ...rOpts, ...aRow } },
      ],
      [
        { text: '"Insurance is a scam"', options: { ...oOpts, bold: true, italic: true } },
        { text: '"Pacific Cross has protected Filipinos for 75+ years. Trusted by thousands."', options: rOpts },
      ],
    ];
    slide16.addTable(objData, {
      x: objTable.x,
      y: objTable.y,
      w: objTable.w,
      h: objTable.h,
      colW: [objTable.w * 0.35, objTable.w * 0.65],
      border: { pt: 0.5, color: C.ltGray },
      autoPage: false,
    });
  }

  // ─── SLIDE 17: Social Media Strategy ───
  console.log('Building slide 17: Social Media');
  await html2pptx(path.join(SLIDES_DIR, 'slide17.html'), pptx);

  // ─── SLIDE 18: 30-60-90 Day Roadmap ───
  console.log('Building slide 18: Roadmap');
  await html2pptx(path.join(SLIDES_DIR, 'slide18.html'), pptx);

  // ─── SLIDE 19: Life Stage Value Cycle ───
  console.log('Building slide 19: Life Stage Timeline');
  await html2pptx(path.join(SLIDES_DIR, 'slide19.html'), pptx);

  // ─── SLIDE 20: Closing ───
  console.log('Building slide 20: Closing');
  await html2pptx(path.join(SLIDES_DIR, 'slide20.html'), pptx);

  // ─── SAVE ───
  await pptx.writeFile({ fileName: OUTPUT });
  console.log(`\nPresentation saved to: ${OUTPUT}`);
}

build().catch(err => {
  console.error('BUILD ERROR:', err.message || err);
  process.exit(1);
});
