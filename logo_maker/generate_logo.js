// generate-logo.js
const puppeteer = require('puppeteer');
const fs = require('fs');

// --- CONFIGURATION ---
const config = {
    // Text content for the logo
    // topEmojis: '👩‍💻⌨️🤖🖱️👨‍💻‍',
    // mainText: '',
    // subText: 'Stellenbosch\nUniversity\nDeveloper\nSociety',
    // bottomEmojis: '👩‍💻⌨️🤖🖱️👨‍💻‍',
    // topEmojis: '🎯💡💻🚀🏆',
    // mainText: 'SUDS',
    // subText: 'Hackathons',
    // bottomEmojis: '🎯💡💻🚀🏆‍',
    topEmojis: '🌐💾💻🏛️🎓',
    mainText: 'SUDS',
    subText: 'Internships\nand Jobs',
    bottomEmojis: '🌐💾💻🏛️🎓‍',

    // Image dimensions (WhatsApp profile picture is often square)
    width: 512,
    height: 512,

    // Output file name
    // outputFile: 'suds-logo.png'
    // outputFile: 'suds-round-logo.png'
    // outputFile: 'suds-hackathon-logo.png'
    // outputFile: 'suds-hackathon-round-logo.png'
    // outputFile: 'suds-jobs-logo.png'
    outputFile: 'suds-jobs-round-logo.png'
};

/**
 * Generates the HTML template with dynamic content and centering styles.
 * @param {object} data - The content for the logo.
 * @returns {string} - The complete HTML string.
 */
function getHtmlTemplate(data) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Logo Generator</title>
  <link href="https://fonts.cdnfonts.com/css/chintzy-cpu-brk-2" rel="stylesheet">
  <style>
    /* Reset and basic setup */
    * {
      box-sizing: border-box;
    }
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }

    /* Centering container using Grid */
    body {
      display: grid;
      place-items: center; /* This is the magic for perfect centering */
      background-color: transparent; /* Allows for a transparent background in the screenshot */
    }

    /* The visible circular logo area */
    .logo-wrapper {
      width: 99%;
      height: 99%;
      background-color: #ffffff;
      border-radius: 50%; /* Makes the logo circular */
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    /* The text element itself */
    .logo {
	  font-family: 'Chintzy CPU Shadow (BRK)', 'Segoe UI', system-ui, -apple-system, 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji', sans-serif;
      color: black;
      text-align: center;
      line-height: 1.2;
    }

    /* Specific text styling */
    .main-text {
      font-size: 70px; /* Large font for the main text */
      font-weight: bold;
      text-transform: uppercase;
    }

    .sub-text {
      font-size: 50px; /* Smaller font for the subtitle */
      opacity: 0.9;
    }

    .emojis {
      font-size: 50px; /* Adjust emoji size */
      opacity: 1;
      display: block; /* Ensures emojis are on their own line */
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="logo-wrapper">
    <div class="logo">
      <span class="emojis">${data.topEmojis}</span>
      <div class="main-text">${data.mainText}</div>
      <div class="sub-text">${data.subText}</div>
      <span class="emojis">${data.bottomEmojis}</span>
    </div>
  </div>
</body>
</html>
    `;
}

/**
 * Main function to generate the logo image.
 */
async function generateLogo() {
    console.log('Starting logo generation...');
    let browser = null;

    try {
        // Launch a headless browser
        browser = await puppeteer.launch();
        const page = await browser.newPage();

        // 1. Set the viewport to our desired image dimensions
        await page.setViewport({
            width: config.width,
            height: config.height
        });

        // 2. Generate the HTML and set it as the page content
        const htmlContent = getHtmlTemplate(config);
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // An alternative, more reliable way to wait for fonts to load
        await page.evaluateHandle('document.fonts.ready');

        // 3. Take a screenshot of the page
        await page.screenshot({
            path: config.outputFile,
            omitBackground: true // Make the background outside the circle transparent
        });

        console.log(`✅ Logo saved successfully as ${config.outputFile}`);

    } catch (error) {
        console.error('❌ An error occurred:', error);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Run the script
generateLogo();
