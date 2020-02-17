const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  await page.goto('https://www.instagram.com');
  await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
  await page.click('a[href="/accounts/login/?source=auth_switcher"]');

  // await page.type('.gLFyf.gsfi', 'Shreyas', { delay: 100 });
  // await page.keyboard.press('Enter');
  // await page.waitForNavigation();

  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
