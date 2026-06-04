#!/usr/bin/env bash
# geotag-photos.sh — Convert WebP project images to JPG with GPS EXIF for GBP uploads
set -euo pipefail

SRC="$HOME/Desktop/aspects-builds-mainenance/public/images"
OUT="$HOME/Desktop/aspect-builds-gbp-photos"
mkdir -p "$OUT"

COUNT=0
SKIPPED=0

for webp in "$SRC"/*.webp; do
  filename=$(basename "$webp")
  
  # Skip hero- prefixed images (composites, not real project photos)
  if [[ "$filename" == hero-* ]]; then
    ((SKIPPED++)) || true
    continue
  fi
  
  # Skip video poster frames
  if [[ "$filename" == *-video-poster.webp ]]; then
    ((SKIPPED++)) || true
    continue
  fi
  
  # Determine project prefix and lookup GPS
  prefix=$(echo "$filename" | sed 's/-[0-9]*\.webp$//' | sed 's/\.webp$//')
  
  case "$prefix" in
    bath-landscaping)       lat="51.3813864"; lon="-2.3596963" ;;
    bath-loft-extension)    lat="51.3813864"; lon="-2.3596963" ;;
    chilcompton-rendering)  lat="51.2618429"; lon="-2.5121834" ;;
    frome-garage-conversion) lat="51.2294852"; lon="-2.3198467" ;;
    midford-garden-extension) lat="51.1267494"; lon="-2.7397217" ;;
    about-traditional)      lat="51.3813864"; lon="-2.3596963" ;;
    home-loft)              lat="51.3813864"; lon="-2.3596963" ;;
    *) echo "SKIP (no GPS): $filename"; ((SKIPPED++)) || true; continue ;;
  esac
  
  # Convert WebP to JPG (quality 90 for GBP)
  jpg="$OUT/${filename%.webp}.jpg"
  magick "$webp" -quality 90 "$jpg" 2>/dev/null
  
  # Inject GPS EXIF
  exiftool -overwrite_original \
    -GPSLatitude="$lat" \
    -GPSLatitudeRef=N \
    -GPSLongitude="$lon" \
    -GPSLongitudeRef=W \
    -ImageDescription="Aspect Builds & Maintenance - ${prefix//-/ } project, Bath Somerset" \
    -Artist="Aspect Builds & Maintenance Ltd" \
    -Copyright="Aspect Builds & Maintenance Ltd" \
    "$jpg" 2>/dev/null
  
  echo "OK: $filename → ${filename%.webp}.jpg ($lat, $lon)"
  ((COUNT++)) || true
done

echo ""
echo "Done. $COUNT images geotagged in: $OUT"
echo "Skipped: $SKIPPED"
echo ""
echo "Upload these to Google Business Profile → Photos"