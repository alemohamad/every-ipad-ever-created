# Every iPad Ever Created

A visual timeline of every iPad released from 2010 to present.

## Build

```bash
npm run build
```

This reads `data/ipads.json` and generates `docs/index.html`.

## Extract Data from HTML

```bash
node scripts/extract-ipads.js
```

This reads `docs/index.html` (original Webflow export) and extracts iPad data into `data/ipads.json`.

## Project Structure

```
├── data/
│   └── ipads.json         # iPad data (source of truth)
├── docs/
│   ├── index.html         # Original Webflow HTML (used for extraction)
│   ├── css/               # Webflow stylesheets
│   ├── images/            # Device images and icons
│   └── js/                # Webflow scripts
├── scripts/
│   ├── extract-ipads.js   # HTML → JSON extraction script
│   └── generate-html.js   # JSON → HTML generator script
└── index.html             # Generated output (do not edit directly)
```

## Adding/Updating iPads

Edit `data/ipads.json`, then run `npm run build`.

### JSON Structure

```json
{
  "id": "ipad-pro-13-m5",
  "model": "iPad Pro 13″ (M5)",
  "launchYear": 2025,
  "device": "ipad_pro_13_m4.jpg",
  "colors": [
    { "name": "Space Black", "hex": "#2e2c2e" }
  ],
  "display": {
    "size": "13″",
    "type": "Ultra Retina XDR display",
    "features": ["ProMotion technology", "P3 wide color", "True Tone"]
  },
  "chip": {
    "image": "chip_m5.png",
    "name": "M5 chip",
    "features": ["Up to 10-core CPU", "10-core GPU", "16-core Neural Engine"]
  },
  "appleIntelligence": true,
  "rearCamera": {
    "icon": "ipadpro13_gen7_camera.png",
    "features": ["12MP Wide camera", "4K video, ProRes"]
  },
  "frontCamera": {
    "icon": "ipad_front_camera_landscape.png",
    "features": ["Landscape 12MP Ultra Wide\nfront camera", "Center Stage"]
  },
  "ipados": {
    "icon": "icon_ipados.png",
    "supported": "iPadOS 26",
    "shipped": "iPadOS 26",
    "status": "Supported"
  },
  "connector": {
    "icon": "thunderbolt_and_port_usb_c.png",
    "type": "USB-C connector with support for\nThunderbolt / USB 4"
  },
  "biometrics": "Face ID",
  "speakers": {
    "icon": "ipad_waves_4.png",
    "features": ["Four speaker audio", "Four studio-quality microphones"]
  },
  "wifi": {
    "icon": "7_square_wifi.png",
    "label": "Wi-Fi 7"
  },
  "cellular": {
    "icon": "5g_radiowaves.png",
    "label": "5G cellular"
  },
  "applePencil": {
    "icon": "applepencil_vertical_gen4_gen3.png",
    "features": ["Supports Apple Pencil Pro", "Supports Apple Pencil\n(USB-C)"]
  },
  "keyboard": {
    "icon": "magickeyboard_m4_ipad.png",
    "features": ["Supports Magic Keyboard\nfor iPad Pro"]
  },
  "capacity": ["256GB", "512GB", "1TB", "2TB"],
  "dimensions": {
    "height": { "inches": 11.09, "mm": 281.6 },
    "width": { "inches": 8.48, "mm": 215.5 },
    "depth": { "inches": 0.2, "mm": 5.1 },
    "weightWifi": { "pounds": 1.28, "grams": 579 },
    "weightCellular": { "pounds": 1.28, "grams": 582 }
  }
}
```

### iPadOS Status Values

- `Supported` - Currently receiving updates
- `Vintage` - No longer sold, limited support
- `Obsolete` - No longer supported

### Notes

- Colors use inline styles with hex codes
- Use `\n` in JSON strings to create line breaks (converted to `<br>`)
- Images go in `images/` folder
- iPads are displayed in order they appear in the JSON array (newest first)
- Some older iPads shipped with iOS (before iPadOS existed) or iPhone OS
- Weight is split into Wi-Fi and Wi-Fi + Cellular variants
- Optional fields: `applePencil`, `keyboard`, `speakers`, `biometrics` may be absent on older models
