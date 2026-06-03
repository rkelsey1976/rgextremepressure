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

// ── Locations from site ──
const locations = [
  { name: 'Central Bath & Districts', slug: 'central-bath-districts', lat: 51.3811, lng: -2.3590 },
  { name: 'Batheaston', slug: 'batheaston', lat: 51.3990, lng: -2.3310 },
  { name: 'Bathford', slug: 'bathford', lat: 51.3710, lng: -2.3050 },
  { name: 'Bathampton', slug: 'bathampton', lat: 51.3890, lng: -2.3410 },
  { name: 'Box', slug: 'box', lat: 51.4130, lng: -2.2480 },
  { name: 'Bradford on Avon', slug: 'bradford-on-avon', lat: 51.3490, lng: -2.2380 },
  { name: 'Corsham', slug: 'corsham', lat: 51.4340, lng: -2.1890 },
  { name: 'Saltford & Keynsham', slug: 'saltford-keynsham', lat: 51.4070, lng: -2.4920 },
  { name: 'Chippenham', slug: 'chippenham', lat: 51.4550, lng: -2.1170 },
  { name: 'Frome, Radstock & Midsomer Norton', slug: 'frome-radstock-midsomer-norton', lat: 51.2270, lng: -2.3210 },
];

// ── Default props ──
const DEFAULTS = {
  overlay: 0.94,
  fade: 0.60,
  posX: 5,
  posY: 5,
  contentWidth: 60,
  headlineSize: 7,
  taglineSize: 2.8,
  logoSize: 5.5,
  logoGap: 4,
  ctaPos: 18,
  focusX: 50,
  focusY: 50,
  trustSize: 6,
  trustX: 88,
  trustY: 6,
  showAccent: true,
  showLogo: true,
  showRule: true,
  showCTA: true,
  showPhone: true,
  showTrust: false,
  showTagline: true,
  showFeatures: true,
  showSizeLabel: true,
  locationIndex: 0,
};

let props = { ...DEFAULTS };

// Brand colours
const NAVY = '#0d1520';
const ACCENT = '#AE8455';
const WHITE = '#ffffff';
const WHITE70 = 'rgba(255,255,255,0.70)';
const WHITE50 = 'rgba(255,255,255,0.50)';

const SIZES = {
  'fb-feed': { w: 1200, h: 628, label: 'Facebook Feed' },
  'fb-square': { w: 1080, h: 1080, label: 'Facebook Square' },
  'fb-story': { w: 1080, h: 1920, label: 'Facebook Story' },
  'ig-post': { w: 1080, h: 1080, label: 'Instagram Post' },
  'ig-story': { w: 1080, h: 1920, label: 'Instagram Story' },
  'gbp-post': { w: 1080, h: 608, label: 'GBP Post' },
};

let currentIndex = 0;
let currentSize = 'fb-feed';
let bgImages = {};
let bgImagesLoaded = {};
let customImage = null;
let trustLogo = new Image();
let trustLogoLoaded = false;
trustLogo.crossOrigin = 'anonymous';
trustLogo.src = '/images/trustatrader-logo.svg';
trustLogo.onload = () => { trustLogoLoaded = true; renderCanvas(); };
trustLogo.onerror = () => { trustLogoLoaded = false; };

// Preload
services.forEach((svc, i) => {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = svc.image;
  bgImages[i] = img;
  img.onload = () => { bgImagesLoaded[i] = true; renderCanvas(); };
  img.onerror = () => { bgImagesLoaded[i] = false; renderCanvas(); };
});

document.fonts.ready.then(() => renderCanvas());

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
  const p = props;
  const padX = unit * p.posX;
  let contentY = unit * p.posY;
  const maxW = (p.contentWidth / 100) * W;

  // ── Background ──
  const imgSource = customImage || bgImages[currentIndex];
  const imgLoaded = customImage ? true : bgImagesLoaded[currentIndex];
  if (imgLoaded && imgSource) {
    const img = imgSource;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = W / H;
    const focusXPct = p.focusX / 100;
    const focusYPct = p.focusY / 100;
    let sx, sy, sw, sh;
    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sy = 0;
      sx = Math.max(0, Math.min(img.naturalWidth - sw, img.naturalWidth * focusXPct - sw / 2));
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = Math.max(0, Math.min(img.naturalHeight - sh, img.naturalHeight * focusYPct - sh / 2));
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
  } else {
    ctx.fillStyle = NAVY;
    ctx.fillRect(0, 0, W, H);
  }

  // ── Overlay ──
  const overlay = ctx.createLinearGradient(0, 0, W, 0);
  overlay.addColorStop(0, `rgba(0,0,0,${p.overlay})`);
  overlay.addColorStop(0.45, `rgba(0,0,0,${Math.max(0, p.overlay - 0.04)})`);
  overlay.addColorStop(1, `rgba(0,0,0,${p.fade})`);
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, W, H);

  if (isPortrait || isSquare) {
    const bottomOverlay = ctx.createLinearGradient(0, H * 0.3, 0, H);
    bottomOverlay.addColorStop(0, 'rgba(0,0,0,0)');
    bottomOverlay.addColorStop(1, 'rgba(0,0,0,0.8)');
    ctx.fillStyle = bottomOverlay;
    ctx.fillRect(0, 0, W, H);
  }

  // ── Accent bar ──
  if (p.showAccent) {
    ctx.fillStyle = ACCENT;
    ctx.fillRect(0, 0, W, Math.max(3, unit * 0.5));
  }

  // ── Logo ──
  if (p.showLogo) {
    const logoSize = unit * p.logoSize;
    const markSize = logoSize * 1.1;
    drawChevron(ctx, padX, contentY, markSize, ACCENT);
    const textX = padX + markSize + unit * 1.8;
    const nameY = contentY + markSize * 0.5;
    ctx.fillStyle = WHITE;
    ctx.font = `900 ${logoSize}px 'Bebas Neue', sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText('ASPECT', textX, nameY);
    ctx.fillStyle = WHITE70;
    ctx.font = `500 ${logoSize * 0.36}px 'DM Sans', sans-serif`;
    ctx.fillText('BUILDS  &  MAINTENANCE  LTD', textX, nameY + logoSize * 0.82);
    contentY += markSize + unit * p.logoGap;
  }

  // ── Gold rule ──
  if (p.showRule) {
    ctx.fillStyle = ACCENT;
    ctx.fillRect(padX, contentY, unit * 10, Math.max(2, unit * 0.3));
    contentY += unit * 3;
  }

  // ── Headline ──
  const headSize = unit * p.headlineSize;
  ctx.fillStyle = WHITE;
  ctx.font = `900 ${headSize}px 'Bebas Neue', sans-serif`;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  const words = svc.title.split(' ');
  let lines = [];
  let currentLine = [];
  for (const word of words) {
    const testLine = currentLine.length ? currentLine.join(' ') + ' ' + word : word;
    if (ctx.measureText(testLine).width > maxW && currentLine.length > 0) {
      lines.push(currentLine.join(' '));
      currentLine = [word];
    } else {
      currentLine.push(word);
    }
  }
  if (currentLine.length) lines.push(currentLine.join(' '));
  for (const line of lines) {
    ctx.fillStyle = WHITE;
    ctx.fillText(line, padX, contentY);
    contentY += headSize * 1.05;
  }

  // ── Tagline ──
  if (p.showTagline && svc.tagline) {
    contentY += unit * 0.5;
    ctx.fillStyle = ACCENT;
    ctx.font = `600 ${isPortrait ? unit * p.taglineSize * 1.07 : unit * p.taglineSize}px 'DM Sans', sans-serif`;
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
      ctx.fillText(line, padX, contentY);
      contentY += isPortrait ? unit * 4 : unit * 3.8;
    }
  }

  // ── Features ──
  if (p.showFeatures && (isPortrait || isSquare) && svc.features) {
    contentY += unit * 2;
    ctx.font = `400 ${unit * 2.8}px 'DM Sans', sans-serif`;
    for (const feat of svc.features) {
      ctx.fillStyle = ACCENT;
      const bullet = '\u25CF  ';
      ctx.fillText(bullet, padX, contentY);
      const bulletW = ctx.measureText(bullet).width;
      ctx.fillStyle = WHITE70;
      ctx.fillText(feat, padX + bulletW, contentY);
      contentY += unit * 4.2;
    }
  }

  // ── CTA pill ──
  if (p.showCTA) {
    const ctaH = isPortrait ? unit * 7 : unit * 6.5;
    const ctaY = H - unit * p.ctaPos;
    const ctaText = 'Get a Free Quote';
    ctx.font = `600 ${isPortrait ? unit * 3 : unit * 2.8}px 'DM Sans', sans-serif`;
    const ctaTW = ctx.measureText(ctaText).width;
    const ctaW = ctaTW + unit * 6;
    ctx.fillStyle = ACCENT;
    ctx.beginPath();
    ctx.roundRect(padX, ctaY, ctaW, ctaH, ctaH / 2);
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillText(ctaText, padX + unit * 3, ctaY + ctaH / 2);
  }

  // ── Phone + URL ──
  if (p.showPhone) {
    ctx.fillStyle = WHITE50;
    ctx.font = `400 ${unit * 2.2}px 'DM Sans', sans-serif`;
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'left';
    ctx.fillText('07498 158747  \u00B7  aspectbuilds.co.uk', padX, H - unit * 3);
  }

  // ── TrustATrader badge ──
  if (p.showTrust && trustLogoLoaded) {
    const tSize = unit * p.trustSize;
    const tX = (p.trustX / 100) * W - tSize / 2;
    const tY = (p.trustY / 100) * H;

    // White circle background for contrast
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(tX + tSize * 0.15, tY + tSize * 0.15, tSize * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Logo
    ctx.drawImage(trustLogo, tX, tY, tSize * 0.55, tSize * 0.55);

    // "Verified Member" text
    ctx.fillStyle = WHITE;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = `600 ${unit * 1.5}px 'DM Sans', sans-serif`;
    ctx.fillText('TrustATrader', tX + tSize * 0.275, tY + tSize * 0.58);
    ctx.fillStyle = WHITE70;
    ctx.font = `400 ${unit * 1.1}px 'DM Sans', sans-serif`;
    ctx.fillText('Verified Member', tX + tSize * 0.275, tY + tSize * 0.72);
    ctx.textAlign = 'left';
  }

  // ── Size label ──
  if (p.showSizeLabel) {
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.font = `400 ${unit * 1.8}px 'DM Sans', sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText(`${size.w}\u00D7${size.h}`, W - unit * 3, H - unit * 3);
    ctx.textAlign = 'left';
  }
}

// ── UI ──
function updateSlider(key, value) {
  props[key] = value;
  const el = document.getElementById('val-' + key);
  if (el) el.textContent = typeof value === 'number' ? (Number.isInteger(value) ? value : value.toFixed(2)) : value;
}

function syncUIFromProps() {
  ['overlay','fade','posX','posY','contentWidth','headlineSize','taglineSize','logoSize','logoGap','ctaPos','focusX','focusY','trustSize','trustX','trustY'].forEach(key => {
    const el = document.getElementById(key);
    if (!el) return;
    if (key === 'overlay') el.value = props.overlay * 100;
    else if (key === 'fade') el.value = props.fade * 100;
    else el.value = props[key];
    updateSlider(key, props[key]);
  });
  ['showAccent','showLogo','showRule','showCTA','showPhone','showTrust','showTagline','showFeatures','showSizeLabel'].forEach(key => {
    const el = document.getElementById(key);
    if (el) el.checked = props[key];
  });
  const locSel = document.getElementById('locationSelect');
  if (locSel) locSel.value = props.locationIndex;
}

function selectService(index) {
  currentIndex = index;
  customImage = null;
  document.querySelectorAll('.svc-btn').forEach((btn, i) => btn.classList.toggle('active', i === index));
  renderCanvas();
}

function selectSize(size) {
  currentSize = size;
  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.size === size));
  renderCanvas();
}

function handleImageUpload(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => { customImage = img; renderCanvas(); };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function handleImageURL(url) {
  if (!url) return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => { customImage = img; renderCanvas(); };
  img.onerror = () => alert('Could not load image from that URL.');
  img.src = url;
}

function resetDefaults() {
  props = { ...DEFAULTS };
  customImage = null;
  syncUIFromProps();
  renderCanvas();
}

// ── PNG tEXt chunk injection ──
// PNG spec: each chunk = length(4B) + type(4B) + data(lengthB) + CRC(4B)
// tEXt chunk type: keyword\0text  (Latin-1 encoded)
function encodePNGChunk(type, data) {
  const len = new Uint8Array(4);
  len[0] = (data.length >> 24) & 0xff;
  len[1] = (data.length >> 16) & 0xff;
  len[2] = (data.length >> 8) & 0xff;
  len[3] = data.length & 0xff;
  const typeBytes = new TextEncoder().encode(type);
  const crcInput = new Uint8Array(typeBytes.length + data.length);
  crcInput.set(typeBytes, 0);
  crcInput.set(data, typeBytes.length);
  const crc = crc32(crcInput);
  const crcBytes = new Uint8Array(4);
  crcBytes[0] = (crc >>> 24) & 0xff;
  crcBytes[1] = (crc >>> 16) & 0xff;
  crcBytes[2] = (crc >>> 8) & 0xff;
  crcBytes[3] = crc & 0xff;
  const chunk = new Uint8Array(4 + typeBytes.length + data.length + 4);
  chunk.set(len, 0);
  chunk.set(typeBytes, 4);
  chunk.set(data, 8);
  chunk.set(crcBytes, 8 + data.length);
  return chunk;
}

// CRC32 for PNG chunks (ISO 3309 / ITU-T V.42)
function crc32(buf) {
  let crc = 0xffffffff;
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c;
    }
    return t;
  })());
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeTextChunk(keyword, text) {
  const kw = new TextEncoder().encode(keyword + '\0');
  const val = new TextEncoder().encode(text);
  const data = new Uint8Array(kw.length + val.length);
  data.set(kw, 0);
  data.set(val, kw.length);
  return encodePNGChunk('tEXt', data);
}

function injectGeoIntoPNG(pngArrayBuffer, loc, svc) {
  const src = new Uint8Array(pngArrayBuffer);
  // Find position after the IHDR chunk (the second chunk in the file)
  // PNG signature = 8 bytes, then IHDR chunk
  const ihdrLen = (src[8] << 24 | src[9] << 16 | src[10] << 8 | src[11]) >>> 0;
  const ihdrEnd = 8 + 4 + 4 + ihdrLen + 4; // sig + len + type + data + crc
  const insertAt = ihdrEnd;

  // Build metadata chunks
  const chunks = [];
  chunks.push(makeTextChunk('GPSLatitude', loc.lat.toFixed(6)));
  chunks.push(makeTextChunk('GPSLongitude', loc.lng.toFixed(6)));
  chunks.push(makeTextChunk('LocationName', loc.name));
  chunks.push(makeTextChunk('LocationSlug', loc.slug));
  chunks.push(makeTextChunk('Service', svc.title));
  chunks.push(makeTextChunk('ServiceId', svc.id));
  chunks.push(makeTextChunk('Business', 'Aspect Builds & Maintenance Ltd'));
  chunks.push(makeTextChunk('Website', 'https://www.aspectbuilds.co.uk'));
  // RFC 6350 geo URI for easy extraction
  chunks.push(makeTextChunk('GeoURI', `geo:${loc.lat},${loc.lng};u=20`));

  // Splice chunks after IHDR
  const totalNew = chunks.reduce((s, c) => s + c.length, 0);
  const result = new Uint8Array(src.length + totalNew);
  result.set(src.subarray(0, insertAt), 0);
  let offset = insertAt;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  result.set(src.subarray(insertAt), offset);
  return result.buffer;
}

function downloadPNG() {
  const canvas = document.getElementById('canvas');
  const svc = services[currentIndex];
  const size = SIZES[currentSize];
  const loc = locations[props.locationIndex];
  const filename = `aspect-builds-${svc.id}-${currentSize}-${size.w}x${size.h}.png`;

  canvas.toBlob((blob) => {
    const reader = new FileReader();
    reader.onload = () => {
      const injected = injectGeoIntoPNG(reader.result, loc, svc);
      const outBlob = new Blob([injected], { type: 'image/png' });
      const url = URL.createObjectURL(outBlob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    };
    reader.readAsArrayBuffer(blob);
  }, 'image/png');
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
  syncUIFromProps();

  const fileInput = document.getElementById('imageUpload');
  if (fileInput) fileInput.addEventListener('change', (e) => { if (e.target.files[0]) handleImageUpload(e.target.files[0]); });
  const urlBtn = document.getElementById('imageUrlBtn');
  if (urlBtn) urlBtn.addEventListener('click', () => { const url = document.getElementById('imageUrl').value.trim(); if (url) handleImageURL(url); });
  const resetImgBtn = document.getElementById('resetImage');
  if (resetImgBtn) resetImgBtn.addEventListener('click', () => { customImage = null; renderCanvas(); });
  const locSel = document.getElementById('locationSelect');
  if (locSel) locSel.addEventListener('change', (e) => { props.locationIndex = parseInt(e.target.value); renderCanvas(); });
});