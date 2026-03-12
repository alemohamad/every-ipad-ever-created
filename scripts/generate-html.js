const fs = require('fs');
const path = require('path');

// Read the JSON data
const dataPath = path.join(__dirname, '..', 'data', 'ipads.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Helper function to format text with line breaks
function formatText(text) {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

// Helper function to format dimension value
function formatDimension(value, isDepth = false) {
  const inchLabel = isDepth ? 'inch' : 'inches';
  return `${value.inches} ${inchLabel} (${value.mm} mm)`;
}

// Generate color swatches with inline styles
function generateColors(colors) {
  if (!colors || colors.length === 0) {
    return '<div class="color"></div>';
  }
  return colors
    .map(color => `<div class="color" style="background-color: ${color.hex}"></div>`)
    .join('\n        ');
}

// Generate display section
function generateDisplay(display) {
  let html = `<div class="model-content">
        <div class="model-screen-size">${display.size}</div>`;

  if (display.type) {
    html += `\n        <div class="model-screen-detail">${display.type}</div>`;
  }

  if (display.features && display.features.length > 0) {
    display.features.forEach(feature => {
      html += `\n        <div class="model-screen-detail">${formatText(feature)}</div>`;
    });
  }

  html += '\n      </div>';
  return html;
}

// Generate chip section
function generateChip(chip) {
  if (!chip || !chip.name) {
    return `<div class="empty"></div>`;
  }

  let html = `<div class="model-content"><img src="images/${chip.image}" loading="lazy" alt="" class="content-image">
        <div class="model-screen-detail">${chip.name}<br></div>`;

  if (chip.features && chip.features.length > 0) {
    chip.features.forEach(feature => {
      html += `\n        <div class="model-screen-detail">${formatText(feature)}</div>`;
    });
  }

  html += '\n      </div>';
  return html;
}

// Generate Apple Intelligence section
function generateAppleIntelligence(hasAI) {
  if (hasAI) {
    return `<div class="model-content"><img src="images/apple_intelligence.png" loading="lazy" alt="" class="content-image">
        <div class="model-screen-detail">Apple Intelligence<br></div>
      </div>`;
  }
  return `<div class="empty"></div>`;
}

// Generate rear camera section
function generateRearCamera(camera) {
  if (!camera || !camera.features || camera.features.length === 0) {
    return `<div class="empty"></div>`;
  }

  let html = `<div class="model-content"><img src="images/${camera.icon}" loading="lazy" alt="" class="content-image">`;

  camera.features.forEach(feature => {
    html += `\n        <div class="model-screen-detail">${formatText(feature)}<br></div>`;
  });

  html += '\n      </div>';
  return html;
}

// Generate front camera section
function generateFrontCamera(camera) {
  if (!camera || !camera.features || camera.features.length === 0) {
    return `<div class="empty"></div>`;
  }

  let html = `<div class="model-content"><img src="images/${camera.icon}" loading="lazy" alt="" class="content-image">`;

  camera.features.forEach(feature => {
    html += `\n        <div class="model-screen-detail">${formatText(feature)}<br></div>`;
  });

  html += '\n      </div>';
  return html;
}

// Generate iPadOS section
function generateiPadOS(ipados) {
  if (!ipados) {
    return `<div class="empty"></div>`;
  }

  const statusClass = ipados.status === 'Supported' ? 'device-support-status' :
                      ipados.status === 'Vintage' ? 'device-support-status vintage' :
                      'device-support-status obsolete';

  return `<div class="model-content"><img src="images/${ipados.icon}" loading="lazy" alt="" class="content-image">
        <div class="model-screen-detail"><strong>Supported up to</strong><br>${ipados.supported}<br></div>
        <div class="model-screen-detail"><strong>Shipped with</strong><br>${ipados.shipped}<br></div>
        <div class="model-screen-detail"><span class="${statusClass}">${ipados.status}</span><br></div>
      </div>`;
}

// Generate connector section
function generateConnector(connector) {
  return `<div class="model-content"><img src="images/${connector.icon}" loading="lazy" alt="" class="content-image">
        <div class="model-screen-detail">${formatText(connector.type)}<br></div>
      </div>`;
}

// Generate biometrics section
function generateBiometrics(biometrics) {
  if (!biometrics) {
    return `<div class="empty"></div>`;
  }

  let icon;
  if (biometrics === 'Face ID') {
    icon = 'faceid.png';
  } else if (biometrics.includes('top button')) {
    icon = 'touchid_vertical.png';
  } else {
    icon = 'touchid.png';
  }

  return `<div class="model-content"><img src="images/${icon}" loading="lazy" alt="" class="content-image">
        <div class="model-screen-detail">${biometrics}<br></div>
      </div>`;
}

// Generate speakers section
function generateSpeakers(speakers) {
  if (!speakers || !speakers.features || speakers.features.length === 0) {
    return `<div class="empty"></div>`;
  }

  let html = `<div class="model-content"><img src="images/${speakers.icon}" loading="lazy" alt="" class="content-image">`;

  speakers.features.forEach(feature => {
    html += `\n        <div class="model-screen-detail">${formatText(feature)}<br></div>`;
  });

  html += '\n      </div>';
  return html;
}

// Generate Wi-Fi section
function generateWifi(wifi) {
  return `<div class="model-content"><img src="images/${wifi.icon}" loading="lazy" alt="" class="content-image">
        <div class="model-screen-detail">${wifi.label}<br></div>
      </div>`;
}

// Generate cellular section
function generateCellular(cellular) {
  return `<div class="model-content"><img src="images/${cellular.icon}" loading="lazy" alt="" class="content-image">
        <div class="model-screen-detail">${cellular.label}<br></div>
      </div>`;
}

// Generate Apple Pencil section
function generateApplePencil(applePencil) {
  if (!applePencil || !applePencil.features || applePencil.features.length === 0) {
    return `<div class="empty"></div>`;
  }

  let html = `<div class="model-content"><img src="images/${applePencil.icon}" loading="lazy" alt="" class="content-image">`;

  applePencil.features.forEach(feature => {
    html += `\n        <div class="model-screen-detail">${formatText(feature)}<br></div>`;
  });

  html += '\n      </div>';
  return html;
}

// Generate keyboard section
function generateKeyboard(keyboard) {
  if (!keyboard || !keyboard.features || keyboard.features.length === 0) {
    return `<div class="empty"></div>`;
  }

  let html = `<div class="model-content"><img src="images/${keyboard.icon}" loading="lazy" alt="" class="content-image">`;

  keyboard.features.forEach(feature => {
    html += `\n        <div class="model-screen-detail">${formatText(feature)}<br></div>`;
  });

  html += '\n      </div>';
  return html;
}

// Generate capacity section
function generateCapacity(capacity) {
  if (!capacity || capacity.length === 0) {
    return `<div class="model-content">
        <div class="highlighted-title">Capacity<br></div>
        <div class="model-screen-detail">—</div>
      </div>`;
  }

  let html = `<div class="model-content">
        <div class="highlighted-title">Capacity<br></div>`;

  capacity.forEach(cap => {
    html += `\n        <div class="model-screen-detail">${cap}<br></div>`;
  });

  html += '\n      </div>';
  return html;
}

// Generate dimensions section
function generateDimensions(dimensions) {
  return `<div class="model-content">
        <div class="highlighted-title">Size and Weight<br></div>
        <div class="model-screen-detail"><strong>Height</strong><br>${formatDimension(dimensions.height)}<br></div>
        <div class="model-screen-detail"><strong>Width</strong><br>${formatDimension(dimensions.width)}<br></div>
        <div class="model-screen-detail"><strong>Depth</strong><br>${formatDimension(dimensions.depth, true)}<br></div>
        <div class="model-screen-detail"><strong>Weight (Wi-Fi)</strong><br>${dimensions.weightWifi.pounds} pounds (${dimensions.weightWifi.grams} grams)<br></div>
        <div class="model-screen-detail"><strong>Weight (Wi-Fi + Cellular)</strong><br>${dimensions.weightCellular.pounds} pounds (${dimensions.weightCellular.grams} grams)<br></div>
      </div>`;
}

// Generate a single iPad entry
function generateiPad(ipad) {
  return `      <div class="model-header">
        <div class="launch-date">${ipad.launchYear}</div>
        <div class="model">${ipad.model}</div>
      </div>
      <div class="model-device"><img src="images/${ipad.device}" loading="lazy" alt="" class="model-device-pic"></div>
      <div class="model-colors">
        ${generateColors(ipad.colors)}
      </div>
      ${generateDisplay(ipad.display)}
      ${generateChip(ipad.chip)}
      ${generateAppleIntelligence(ipad.appleIntelligence)}
      ${generateRearCamera(ipad.rearCamera)}
      ${generateFrontCamera(ipad.frontCamera)}
      ${generateiPadOS(ipad.ipados)}
      ${generateConnector(ipad.connector)}
      ${generateBiometrics(ipad.biometrics)}
      ${generateSpeakers(ipad.speakers)}
      ${generateWifi(ipad.wifi)}
      ${generateCellular(ipad.cellular)}
      ${generateApplePencil(ipad.applePencil)}
      ${generateKeyboard(ipad.keyboard)}
      ${generateCapacity(ipad.capacity)}
      ${generateDimensions(ipad.dimensions)}`;
}

// Generate the complete HTML
function generateHTML() {
  const ipadEntries = data.ipads.map(generateiPad).join('\n');

  return `<!DOCTYPE html>
<html data-wf-page="691c9ad89e4ef10559bbaaed" data-wf-site="691c9ad49e4ef10559bba97a">
<head>
  <meta charset="utf-8">
  <title>Every iPad ever released</title>
  <meta content="Apple’s iPad has transformed dramatically since its introduction, redefining what a tablet can do. With faster processors, enhanced displays, and more versatile features, it’s clear to see how far the iPad has evolved since its debut in 2010. As we look through all the models that have been released, we can appreciate how much Apple has pushed the boundaries of portable computing." name="description">
  <meta content="Every iPad ever released" property="og:title">
  <meta content="Apple’s iPad has transformed dramatically since its introduction, redefining what a tablet can do. With faster processors, enhanced displays, and more versatile features, it’s clear to see how far the iPad has evolved since its debut in 2010. As we look through all the models that have been released, we can appreciate how much Apple has pushed the boundaries of portable computing." property="og:description">
  <meta content="https://everyipad.info/docs/images/every-ipad-ever-released.jpg" property="og:image">
  <meta content="Every iPad ever released" property="twitter:title">
  <meta content="Apple’s iPad has transformed dramatically since its introduction, redefining what a tablet can do. With faster processors, enhanced displays, and more versatile features, it’s clear to see how far the iPad has evolved since its debut in 2010. As we look through all the models that have been released, we can appreciate how much Apple has pushed the boundaries of portable computing." property="twitter:description">
  <meta property="og:type" content="website">
  <meta content="summary_large_image" name="twitter:card">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta content="Webflow" name="generator">
  <link href="css/normalize.css" rel="stylesheet" type="text/css">
  <link href="css/webflow.css" rel="stylesheet" type="text/css">
  <link href="css/every-ipad-ever-released.webflow.css" rel="stylesheet" type="text/css">
  <script type="text/javascript">!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);</script>
  <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon">
  <link href="images/webclip.png" rel="apple-touch-icon">
</head>
<body>
  <section class="header">
    <h1>Every iPad ever released</h1>
    <div class="description">Apple’s iPad has transformed dramatically since its introduction, redefining what a tablet can do. With faster processors, enhanced displays, and more versatile features, it’s clear to see how far the iPad has evolved since its debut in 2010. As we look through all the models that have been released, we can appreciate how much Apple has pushed the boundaries of portable computing.</div>
  </section>
  <section class="devices">
    <div class="w-layout-grid devices-grid">
${ipadEntries}
    </div>
  </section>
  <section class="footer">
    <div>iPad is a trademark of Apple Inc., registered in the U.S. and other countries.</div>
    <a href="https://alemohamad.com/" target="_blank">Curated by <strong class="bold-text">Ale Mohamad</strong></a>
  </section>
  <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=691c9ad49e4ef10559bba97a" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
  <script src="js/webflow.js" type="text/javascript"></script>
</body>
</html>`;
}

// Write the output
const outputPath = path.join(__dirname, '..', 'docs', 'index.html');
const html = generateHTML();
fs.writeFileSync(outputPath, html, 'utf8');

console.log(`Generated index.html with ${data.ipads.length} iPads`);
console.log(`Output: ${outputPath}`);
