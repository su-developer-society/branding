// save as render.js
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/logo.html`);
  const element = await page.$(".logo-wrapper");
  await element.screenshot({ path: "logo.png" });
  await browser.close();
})();
