const services = [
  {
    id: 'loft',
    title: 'Loft Conversions',
    subtitle: 'Dormer, Velux, Hip-to-Gable & Mansard',
    tagline: 'Add Space. Add Value. No Moving Required.',
    features: ['Dormer Conversions', 'Velux Rooflight', 'Hip-to-Gable & Mansard', 'Full Building Regs'],
    image: '/images/hero-james-bath-property-4.webp',
  },
  {
    id: 'extensions',
    title: 'House Extensions',
    subtitle: 'Single & Double-Storey, Side-Return, Garden Rooms',
    tagline: 'Real Living Space. Fixed Price. Full Planning Managed.',
    features: ['Single-Storey Rear', 'Double-Storey', 'Side-Return & Wraparound', 'Garden Rooms'],
    image: '/images/hero-james-bath-property-5.webp',
  },
  {
    id: 'structural',
    title: 'Structural & Scale Builds',
    subtitle: 'New Build, RSJs, Basement & Garage Conversions',
    tagline: 'Engineering Precision. Single-Point Project Management.',
    features: ['New Build (Turnkey)', 'RSJ Installations', 'Basement Conversions', 'Groundworks & Substructure'],
    image: '/images/hero-james-bath-property-6.webp',
  },
  {
    id: 'heritage',
    title: 'Heritage & Restoration',
    subtitle: 'Listed Buildings. Bath Stone. Authentic Craftsmanship.',
    tagline: 'Period Character Preserved. Modern Standards Delivered.',
    features: ['Period Renovations', 'Lime Mortar Repointing', 'Bath Stone Restoration', 'Listed Building Compliance'],
    image: '/images/hero-james-bath-property-10.webp',
  },
  {
    id: 'interiors',
    title: 'Interiors & Refurbishments',
    subtitle: 'Bespoke Kitchens, Bathrooms & Full Renovations',
    tagline: 'High-Spec. Turnkey. No Compromise.',
    features: ['Full Refurbishments', 'Bespoke Kitchens', 'Luxury Bathrooms', 'Wall Reconfigurations'],
    image: '/images/james-bath-interior-1.webp',
  },
  {
    id: 'property-care',
    title: 'Property Care & Landscaping',
    subtitle: 'Outdoor Works, Maintenance & Responsive Repairs',
    tagline: 'Protect Your Investment. Inside and Out.',
    features: ['Garden Landscaping', 'Stone Retaining Walls', 'Property Maintenance', 'Roofing & Repairs'],
    image: '/images/services/property-care.webp',
  },
];

// Brand colours — matching site exactly
const NAVY = '#0d1520';
const CHARCOAL = '#1a2332';
const ACCENT = '#AE8455';
const WHITE = '#ffffff';
const WHITE70 = 'rgba(255,255,255,0.70)';
const WHITE50 = 'rgba(255,255,255,0.50)';

const SIZES = {
  'fb-feed': { w: 1200, h: 628, label: 'Facebook Feed Ad' },
  'fb-square': { w: 1080, h: 1080, label: 'Facebook Square Post' },
  'fb-story': { w: 1080, h: 1920, label: 'Facebook Story / Reel' },
  'ig-post': { w: 1080, h: 1080, label: 'Instagram Post' },
  'ig-story': { w: 1080, h: 1920, label: 'Instagram Story' },
  'gbp-post': { w: 1080, h: 608, label: 'GBP Post' },
};

let currentIndex = 0;
let currentSize = 'fb-feed';
let bgImages = {};
let bgImagesLoaded = {};
let fontsReady = false;

// Preload background images
services.forEach((svc, i) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = svc.image;
  bgImages[i] = img;
  img.onload = () => { bgImagesLoaded[i] = true; renderCanvas(); };
  img.onerror = () => { bgImagesLoaded[i] = false; renderCanvas(); };
});

// Wait for fonts to load before rendering
document.fonts.ready.then(() => {
  fontsReady = true;
  renderCanvas();
});

function drawChevron(ctx, x, y, size, colour) {
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineWidth = Math.max(2, size * 0.18);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + size * 0.78);
  ctx.lineTo(x + size / 2, y);
  ctx.lineTo(x + size, y + size * 0.78);
  ctx.stroke();
  ctx.restore();
}

function drawLogo(ctx, unit, W) {
  const logoY = unit * 5;
  const logoX = unit * 5;
  const markSize = unit * 6;

  // Chevron mark (gold)
  drawChevron(ctx, logoX, logoY, markSize, ACCENT);

  // "ASPECT" — Bebas Neue display font (all caps with letter spacing)
  const textX = logoX + markSize + unit * 1.8;
  const nameY = logoY + markSize * 0.5;
  ctx.fillStyle = WHITE;
  ctx.font = `900 ${unit * 5.5}px 'Bebas Neue', sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText('A S P E C T', textX, nameY);

  // "BUILDS & MAINTENANCE LTD" sub — small tracking, DM Sans
  ctx.fillStyle = WHITE70;
  ctx.font = `500 ${unit * 2}px 'DM Sans', sans-serif`;
  ctx.fillText('BUILDS  &  MAINTENANCE  LTD', textX, nameY + unit * 4.5);
}

function renderCanvas() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const svc = services[currentIndex];
  const size = SIZES[currentSize];

  canvas.width = size.w;
  canvas.height = size.h;
  ctx.clearRect(0, 0, size.w, size.h);

  const W = size.w;
  const H = size.h;
  const isPortrait = H > W;
  const isSquare = W === H;
  const unit = Math.min(W, H) / 100;

  // ── Background image ──
  if (bgImagesLoaded[currentIndex]) {
    const img = bgImages[currentIndex];
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = W / H;
    let sx, sy, sw, sh;
    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
  } else {
    ctx.fillStyle = NAVY;
    ctx.fillRect(0, 0, W, H);
  }

  // ── Overlay — left vignette matching site hero ──
  const overlay = ctx.createLinearGradient(0, 0, W, 0);
  overlay.addColorStop(0, 'rgba(0,0,0,0.92)');
  overlay.addColorStop(0.4, 'rgba(0,0,0,0.88)');
  overlay.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  // For portrait/square: add a bottom gradient boost for readability
  if (isPortrait || isSquare) {
    const bottomOverlay = ctx.createLinearGradient(0, H * 0.3, 0, H);
    bottomOverlay.addColorStop(0, 'rgba(0,0,0,0)');
    bottomOverlay.addColorStop(1, 'rgba(0,0,0,0.7)');
    ctx.fillStyle = bottomOverlay;
    ctx.fillRect(0, 0, W, H);
  }

  // ── Gold accent bar at top ──
  ctx.fillStyle = ACCENT;
  ctx.fillRect(0, 0, W, Math.max(3, unit * 0.5));

  // ── Logo ──
  drawLogo(ctx, unit, W);

  // ── Gold rule below logo ──
  const markSize = unit * 6;
  const ruleY = unit * 5 + markSize + unit * 6.5;
  ctx.fillStyle = ACCENT;
  ctx.fillRect(unit * 5, ruleY, unit * 10, Math.max(2, unit * 0.3));

  // ── Headline ──
  const headlineY = ruleY + unit * 4;
  const maxW = isPortrait ? W * 0.88 : W * 0.6;
  ctx.fillStyle = WHITE;
  const headSize = isPortrait ? unit * 7 : unit * 7;
  ctx.font = `900 ${headSize}px 'Bebas Neue', sans-serif`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  // Word wrap headline — add letter spacing manually for Bebas Neue
  const letterSpacing = headSize * 0.05;
  const words = svc.title.toUpperCase().split(' ');
  let lines = [];
  let currentLine = [];
  for (const word of words) {
    const testLine = [...currentLine, word];
    const testWidth = testLine.reduce((w, wrd) => w + ctx.measureText(wrd).width + letterSpacing * (wrd.length), 0);
    if (testWidth > maxW && currentLine.length > 0) {
      lines.push(currentLine.join(' '));
      currentLine = [word];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine.length) lines.push(currentLine.join(' '));

  const headlineLineH = headSize * 1.05;
  let textY = headlineY;
  for (const line of lines) {
    // Draw each character with letter spacing for Bebas Neue
    const chars = line.split('');
    let xPos = unit * 5;
    for (const ch of chars) {
      ctx.fillStyle = WHITE;
      ctx.fillText(ch, xPos, textY);
      xPos += ctx.measureText(ch).width + letterSpacing;
    }
    textY += headlineLineH;
  }

  // ── Tagline in accent ──
  textY += unit * 0.5;
  ctx.fillStyle = ACCENT;
  ctx.font = `600 ${isPortrait ? unit * 3 : unit * 2.8}px 'DM Sans', sans-serif`;
  ctx.textBaseline = 'top';
  const tagWords = svc.tagline.split(' ');
  let tagLines = [];
  let tagLine = '';
  for (const word of tagWords) {
    const test = tagLine ? tagLine + ' ' + word : word;
    if (ctx.measureText(test).width > maxW && tagLine) {
      tagLines.push(tagLine);
      tagLine = word;
    } else {
      tagLine = test;
    }
  }
  if (tagLine) tagLines.push(tagLine);
  for (const line of tagLines) {
    ctx.fillText(line, unit * 5, textY);
    textY += isPortrait ? unit * 4 : unit * 3.8;
  }

  // ── Feature bullets (portrait + square only) ──
  if (isPortrait || isSquare) {
    textY += unit * 2;
    ctx.font = `400 ${unit * 2.8}px 'DM Sans', sans-serif`;
    for (const feat of svc.features) {
      ctx.fillStyle = ACCENT;
      ctx.fillText('\u25CF  ', unit * 5, textY);
      const bulletW = ctx.measureText('\u25CF  ').width;
      ctx.fillStyle = WHITE70;
      ctx.fillText(feat, unit * 5 + bulletW, textY);
      textY += unit * 4.2;
    }
  }

  // ── CTA pill ──
  const ctaH = isPortrait ? unit * 7 : unit * 6.5;
  const ctaY = isPortrait ? H - unit * 16 : H - unit * 13;
  const ctaText = 'Get a Free Quote';
  ctx.font = `600 ${isPortrait ? unit * 3 : unit * 2.8}px 'DM Sans', sans-serif`;
  const ctaTW = ctx.measureText(ctaText).width;
  const ctaW = ctaTW + unit * 6;
  const ctaX = unit * 5;

  ctx.fillStyle = ACCENT;
  ctx.beginPath();
  ctx.roundRect(ctaX, ctaY, ctaW, ctaH, ctaH / 2);
  ctx.fill();

  ctx.fillStyle = NAVY;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillText(ctaText, ctaX + unit * 3, ctaY + ctaH / 2);

  // ── Phone + URL ──
  ctx.fillStyle = WHITE50;
  ctx.font = `400 ${unit * 2.2}px 'DM Sans', sans-serif`;
  ctx.textBaseline = 'bottom';
  ctx.textAlign = 'left';
  ctx.fillText('07552 060932  \u00B7  aspectbuilds.co.uk', unit * 5, H - unit * 3);

  // ── Size label (bottom right) ──
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.font = `400 ${unit * 1.8}px 'DM Sans', sans-serif`;
  ctx.textAlign = 'right';
  ctx.fillText(`${size.w}\u00D7${size.h}`, W - unit * 3, H - unit * 3);
  ctx.textAlign = 'left';
}

function selectService(index) {
  currentIndex = index;
  document.querySelectorAll('.svc-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  renderCanvas();
}

function selectSize(size) {
  currentSize = size;
  document.querySelectorAll('.size-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.size === size);
  });
  renderCanvas();
}

function downloadPNG() {
  const canvas = document.getElementById('canvas');
  const svc = services[currentIndex];
  const size = SIZES[currentSize];
  const link = document.createElement('a');
  link.download = `aspect-builds-${svc.id}-${currentSize}-${size.w}x${size.h}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function downloadAll() {
  const origIndex = currentIndex;
  const origSize = currentSize;
  let delay = 0;
  for (const sizeKey of Object.keys(SIZES)) {
    for (let i = 0; i < services.length; i++) {
      setTimeout(() => {
        currentIndex = i;
        currentSize = sizeKey;
        renderCanvas();
        downloadPNG();
      }, delay);
      delay += 400;
    }
  }
  setTimeout(() => {
    currentIndex = origIndex;
    currentSize = origSize;
    renderCanvas();
  }, delay);
}

window.addEventListener('DOMContentLoaded', () => {
  selectService(0);
  selectSize('fb-feed');
});