const pptxgen = require('pptxgenjs');
const html2pptx = require('/home/z/my-project/skills/pptx/scripts/html2pptx.js');
const path = require('path');

const SLIDES_DIR = path.join(__dirname, 'slides');
const V2_DIR = path.join(__dirname, 'slides-v2');
const OUTPUT = '/home/z/my-project/download/Pacific_Cross_Training_Deck.pptx';

// Brand colors (NO # prefix for PptxGenJS)
const C = {
  gold: 'FFD700',
  blue: '00BFFF',
  orange: 'FF5722',
  black: '1A1A1A',
  green: '4CAF50',
  white: 'FFFFFF',
  gray: 'AAAAAA',
  ltGray: 'CCCCCC',
  cream: 'FFF8F0',
  teal: '15857A',
  darkTeal: '0D4F47',
};

async function build() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Pacific Cross Philippines';
  pptx.title = 'Pacific Cross Insurance Advisor Training';
  pptx.subject = 'Blue Royale x FlexiShield Training Deck';

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
      dataLabelColor: C.black,
      dataLabelFontSize: 9,
      catAxisLabelFontSize: 9,
      catAxisLabelColor: C.black,
      valAxisHidden: true,
      catAxisLineShow: false,
      valAxisLineShow: false,
      valAxisMaxVal: 7,
      valAxisMinVal: 0,
      chartColors: [C.teal, C.teal, C.orange, C.teal, C.teal, C.teal],
    });
  }

  // ─── SLIDE 5: Big Picture ───
  console.log('Building slide 5: Big Picture');
  await html2pptx(path.join(SLIDES_DIR, 'slide05.html'), pptx);

  // ═══════════════════════════════════════════
  // NEW SLIDES 6-13 (with brand-consistent design)
  // ═══════════════════════════════════════════

  // ─── SLIDE 6: Blue Royale Plans ───
  console.log('Building slide 6: Blue Royale Plans');
  await html2pptx(path.join(V2_DIR, 'slide06-new.html'), pptx);

  // ─── SLIDE 7: Blue Royale Pricing Chart ───
  console.log('Building slide 7: Blue Royale Pricing');
  const { slide: slide7, placeholders: ph7 } = await html2pptx(path.join(V2_DIR, 'slide07-new.html'), pptx);
  const brChart = ph7.find(p => p.id === 'br-pricing-chart');
  if (brChart) {
    slide7.addChart(pptx.charts.BAR, [{
      name: 'Plan B Annual Premium (USD)',
      labels: ['0-3', '4-18', '19-25', '26-30', '31-35', '36-40', '41-45', '46-50', '51-55', '56-60'],
      values: [1890, 2001, 2698, 3382, 3707, 4064, 4378, 4689, 4907, 5359],
    }], {
      ...brChart,
      barDir: 'col',
      showTitle: false,
      showLegend: false,
      showValue: true,
      dataLabelPosition: 'outEnd',
      dataLabelColor: C.white,
      dataLabelFontSize: 7,
      catAxisLabelFontSize: 8,
      catAxisLabelColor: C.white,
      valAxisHidden: true,
      catAxisLineShow: false,
      valAxisLineShow: false,
      catAxisLabelRotate: 45,
      showCatAxisTitle: false,
      chartColors: [C.blue],
      plotArea: { fill: { color: C.black } },
    });
  }

  // ─── SLIDE 8: FlexiShield Plans ───
  console.log('Building slide 8: FlexiShield Plans');
  await html2pptx(path.join(V2_DIR, 'slide08-new.html'), pptx);

  // ─── SLIDE 9: FlexiShield Pricing Chart ───
  console.log('Building slide 9: FlexiShield Pricing');
  const { slide: slide9, placeholders: ph9 } = await html2pptx(path.join(V2_DIR, 'slide09-new.html'), pptx);
  const fsChart = ph9.find(p => p.id === 'fs-pricing-chart');
  if (fsChart) {
    slide9.addChart(pptx.charts.BAR, [{
      name: 'FS 100 Annual Premium (PHP)',
      labels: ['0-20', '21-35', '36-45', '46-55', '56-65', '66-70'],
      values: [9350, 14040, 20730, 30660, 48860, 0],
    }], {
      ...fsChart,
      barDir: 'col',
      showTitle: false,
      showLegend: false,
      showValue: true,
      dataLabelPosition: 'outEnd',
      dataLabelColor: C.white,
      dataLabelFontSize: 8,
      catAxisLabelFontSize: 9,
      catAxisLabelColor: C.white,
      valAxisHidden: true,
      catAxisLineShow: false,
      valAxisLineShow: false,
      showCatAxisTitle: false,
      chartColors: [C.orange],
      plotArea: { fill: { color: C.black } },
    });
  }

  // ─── SLIDE 10: Product Comparison Table ───
  console.log('Building slide 10: Comparison Table');
  const { slide: slide10, placeholders: ph10 } = await html2pptx(path.join(V2_DIR, 'slide10-new.html'), pptx);
  const compTable = ph10.find(p => p.id === 'comparison-table');
  if (compTable) {
    const hdrOpts = { fill: { color: C.blue }, color: C.white, bold: true, fontSize: 8, align: 'center', valign: 'middle' };
    const cellOpts = { fontSize: 7.5, align: 'left', valign: 'middle', color: C.black };
    const altRow = { ...cellOpts, fill: { color: '2A2A2A' } };
    const brHighlight = { ...cellOpts, bold: true, color: C.blue };
    const fsHighlight = { ...cellOpts, bold: true, color: C.orange };
    const yesGreen = { color: C.green, bold: true };
    const noRed = { color: 'CC3333' };

    const tableData = [
      [
        { text: 'Feature', options: hdrOpts },
        { text: 'Blue Royale', options: hdrOpts },
        { text: 'FlexiShield', options: hdrOpts },
      ],
      [
        { text: 'Max Coverage', options: cellOpts },
        { text: 'USD 500K-2M', options: brHighlight },
        { text: 'PHP 2M', options: fsHighlight },
      ],
      [
        { text: 'Plans', options: altRow },
        { text: '3 (A/B/C)', options: altRow },
        { text: '4 (deductible tiers)', options: altRow },
      ],
      [
        { text: 'Currency', options: cellOpts },
        { text: 'USD', options: cellOpts },
        { text: 'PHP', options: cellOpts },
      ],
      [
        { text: 'Hospital Choice', options: altRow },
        { text: 'ANY worldwide', options: brHighlight },
        { text: 'PH HMO network', options: altRow },
      ],
      [
        { text: 'Age Range', options: cellOpts },
        { text: '0-100', options: { ...cellOpts, bold: true } },
        { text: '0-70', options: cellOpts },
      ],
      [
        { text: 'Requires HMO', options: altRow },
        { text: 'No', options: { ...altRow, ...yesGreen } },
        { text: 'Yes (first layer)', options: { ...altRow, ...noRed } },
      ],
      [
        { text: 'Maternity', options: cellOpts },
        { text: 'Plan B/C only', options: { ...cellOpts, ...yesGreen } },
        { text: 'No', options: { ...cellOpts, ...noRed } },
      ],
      [
        { text: 'COVID-19', options: altRow },
        { text: 'Yes', options: { ...altRow, ...yesGreen } },
        { text: 'Yes (pandemic waived)', options: { ...altRow, ...yesGreen } },
      ],
      [
        { text: 'Daily Hospital Income', options: cellOpts },
        { text: 'No', options: { ...cellOpts, ...noRed } },
        { text: 'PHP 1,000/day', options: { ...cellOpts, ...fsHighlight } },
      ],
      [
        { text: 'Dental', options: altRow },
        { text: 'C included, A/B optional', options: altRow },
        { text: 'No', options: { ...altRow, ...noRed } },
      ],
      [
        { text: 'Vision', options: cellOpts },
        { text: 'Plan B/C included', options: { ...cellOpts, ...yesGreen } },
        { text: 'No', options: { ...cellOpts, ...noRed } },
      ],
      [
        { text: 'Travel Benefits', options: altRow },
        { text: 'Extensive (Trip, Baggage, etc.)', options: { ...altRow, ...brHighlight } },
        { text: 'No', options: { ...altRow, ...noRed } },
      ],
      [
        { text: 'Premium Range', options: cellOpts },
        { text: '$1,575-$59,762/yr', options: brHighlight },
        { text: 'P6,510-P63,972/yr', options: fsHighlight },
      ],
      [
        { text: 'Qualifying Period', options: altRow },
        { text: '30 days', options: altRow },
        { text: 'After HMO MBL exhausted', options: altRow },
      ],
      [
        { text: 'Physical Exam', options: cellOpts },
        { text: 'Not required', options: { ...cellOpts, ...yesGreen } },
        { text: 'Not required', options: { ...cellOpts, ...yesGreen } },
      ],
    ];
    slide10.addTable(tableData, {
      x: compTable.x,
      y: compTable.y,
      w: compTable.w,
      h: compTable.h,
      colW: [compTable.w * 0.24, compTable.w * 0.38, compTable.w * 0.38],
      border: { pt: 0.5, color: '444444' },
      autoPage: false,
      fontSize: 7.5,
    });
  }

  // ─── SLIDE 11: What Makes Pacific Cross Different ───
  console.log('Building slide 11: Differentiators');
  await html2pptx(path.join(V2_DIR, 'slide11-new.html'), pptx);

  // ─── SLIDE 12: How Claims Work ───
  console.log('Building slide 12: Claims Process');
  await html2pptx(path.join(V2_DIR, 'slide12-new.html'), pptx);

  // ─── SLIDE 13: Discount Options Table ───
  console.log('Building slide 13: Discount Options');
  const { slide: slide13, placeholders: ph13 } = await html2pptx(path.join(V2_DIR, 'slide13-new.html'), pptx);
  const discTable = ph13.find(p => p.id === 'discount-table');
  if (discTable) {
    const hOpts = { fill: { color: C.gold }, color: C.black, bold: true, fontSize: 10, align: 'center', valign: 'middle' };
    const cOpts = { fontSize: 10, align: 'center', valign: 'middle', color: C.black };
    const altR = { ...cOpts, fill: { color: '2A2A2A' } };
    const discount = { fontSize: 10, align: 'center', valign: 'middle', color: C.green, bold: true };
    const na = { fontSize: 10, align: 'center', valign: 'middle', color: '666666' };

    const discData = [
      [
        { text: 'Deductible', options: hOpts },
        { text: 'Plan A', options: hOpts },
        { text: 'Plan B', options: hOpts },
        { text: 'Plan C', options: hOpts },
      ],
      [
        { text: '$1,000', options: cOpts },
        { text: '15% OFF', options: discount },
        { text: 'N/A', options: na },
        { text: 'N/A', options: na },
      ],
      [
        { text: '$2,500', options: altR },
        { text: '30% OFF', options: { ...discount, fill: { color: '2A2A2A' } } },
        { text: '18% OFF', options: { ...discount, fill: { color: '2A2A2A' } } },
        { text: '18% OFF', options: { ...discount, fill: { color: '2A2A2A' } } },
      ],
      [
        { text: '$5,000', options: cOpts },
        { text: '40% OFF', options: discount },
        { text: '24% OFF', options: discount },
        { text: '24% OFF', options: discount },
      ],
      [
        { text: 'Treatment Area Limitation', options: altR },
        { text: '25% OFF', options: { ...discount, fill: { color: '2A2A2A' } } },
        { text: '25% OFF', options: { ...discount, fill: { color: '2A2A2A' } } },
        { text: '25% OFF', options: { ...discount, fill: { color: '2A2A2A' } } },
      ],
    ];
    slide13.addTable(discData, {
      x: discTable.x,
      y: discTable.y,
      w: discTable.w,
      h: discTable.h,
      colW: [discTable.w * 0.35, discTable.w * 0.217, discTable.w * 0.217, discTable.w * 0.217],
      border: { pt: 1, color: '444444' },
      autoPage: false,
      fontSize: 10,
    });
  }

  // ═══════════════════════════════════════════
  // ORIGINAL SLIDES 12-20 (now slides 14-22)
  // ═══════════════════════════════════════════

  // ─── SLIDE 14: OFW Market (old slide 12) ───
  console.log('Building slide 14: OFW Market');
  await html2pptx(path.join(SLIDES_DIR, 'slide12.html'), pptx);

  // ─── SLIDE 15: Common Misconceptions (old slide 13) ───
  console.log('Building slide 15: Misconceptions');
  await html2pptx(path.join(SLIDES_DIR, 'slide13.html'), pptx);

  // ─── SLIDE 16: Myth vs Fact (old slide 14) ───
  console.log('Building slide 16: Myth vs Fact');
  await html2pptx(path.join(SLIDES_DIR, 'slide14.html'), pptx);

  // ─── SLIDE 17: Advisor Playbook (old slide 15) ───
  console.log('Building slide 17: Advisor Playbook');
  await html2pptx(path.join(SLIDES_DIR, 'slide15.html'), pptx);

  // ─── SLIDE 18: Objection Handling Table (old slide 16) ───
  console.log('Building slide 18: Objection Handling');
  const { slide: slide18, placeholders: ph18 } = await html2pptx(path.join(SLIDES_DIR, 'slide16.html'), pptx);
  const objTable = ph18.find(p => p.id === 'objection-table');
  if (objTable) {
    const hOpts = { fill: { color: C.teal }, color: C.white, bold: true, fontSize: 10, align: 'center', valign: 'middle' };
    const oOpts = { fontSize: 9, valign: 'middle', color: C.black };
    const rOpts = { fontSize: 9, valign: 'middle', color: C.black };
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
    slide18.addTable(objData, {
      x: objTable.x,
      y: objTable.y,
      w: objTable.w,
      h: objTable.h,
      colW: [objTable.w * 0.35, objTable.w * 0.65],
      border: { pt: 0.5, color: C.ltGray },
      autoPage: false,
    });
  }

  // ─── SLIDE 19: Social Media Strategy (old slide 17) ───
  console.log('Building slide 19: Social Media');
  await html2pptx(path.join(SLIDES_DIR, 'slide17.html'), pptx);

  // ─── SLIDE 20: 30-60-90 Day Roadmap (old slide 18) ───
  console.log('Building slide 20: Roadmap');
  await html2pptx(path.join(SLIDES_DIR, 'slide18.html'), pptx);

  // ─── SLIDE 21: Life Stage Value Cycle (old slide 19) ───
  console.log('Building slide 21: Life Stage Timeline');
  await html2pptx(path.join(SLIDES_DIR, 'slide19.html'), pptx);

  // ─── SLIDE 22: Closing (old slide 20) ───
  console.log('Building slide 22: Closing');
  await html2pptx(path.join(SLIDES_DIR, 'slide20.html'), pptx);

  // ─── SAVE ───
  await pptx.writeFile({ fileName: OUTPUT });
  console.log(`\nPresentation saved to: ${OUTPUT}`);
}

build().catch(err => {
  console.error('BUILD ERROR:', err.message || err);
  process.exit(1);
});
