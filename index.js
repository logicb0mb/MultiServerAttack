const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  // on the instagram landing page
  await page.goto('https://www.instagram.com');
  await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
  await page.click('a[href="/accounts/login/?source=auth_switcher"]');
  await page.waitFor(500);

  // on the login page
  // for username
  await page.waitFor('input[name="username"]');
  await page.type('input[name="username"]', 'logic.b0mb');

  // for password
  await page.waitFor('input[name="password"]');
  await page.type('input[name="password"]', 'logicb0mb.pass');
  // login button
  await page.click(
    '#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4)'
  );

  // await page.type('.gLFyf.gsfi', 'Shreyas', { delay: 100 });
  // await page.keyboard.press('Enter');
  // await page.waitForNavigation();

  await page.screenshot({ path: 'example.png' });
  // await browser.close();
})();
