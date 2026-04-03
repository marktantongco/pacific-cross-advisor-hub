const sharp = require('sharp');
const path = require('path');

const ASSETS = path.join(__dirname, 'assets');

async function createGradient(filename, color1, color2, w = 1440, h = 810, angle = '100%') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="${angle}" y2="100%">
        <stop offset="0%" style="stop-color:${color1}"/>
        <stop offset="100%" style="stop-color:${color2}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS, filename));
}

async function createCircle(filename, color, size = 400, opacity = 0.15) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${color}" opacity="${opacity}"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS, filename));
}

async function createAccentBar(filename, color, w = 8, h = 80) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${color}" rx="4"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(ASSETS, filename));
}

(async () => {
  // Cover slide gradient: dark teal to deep teal
  await createGradient('cover-bg.png', '#0D4F47', '#15857A', 1440, 810, '60%');
  // Closing slide gradient
  await createGradient('closing-bg.png', '#15857A', '#0D4F47', 1440, 810, '80%');
  // Decorative circles
  await createCircle('circle-accent.png', '#FF6A3B', 500, 0.2);
  await createCircle('circle-teal.png', '#15857A', 600, 0.1);
  // Accent bars
  await createAccentBar('bar-orange.png', '#FF6A3B', 10, 120);
  await createAccentBar('bar-teal.png', '#15857A', 10, 120);
  console.log('All assets generated.');
})();
