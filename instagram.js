const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com';

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: false
    });

    instagram.page = await instagram.browser.newPage();
    await instagram.page.setViewport({ width: 1366, height: 768 });

    await instagram.page.screenshot({
      path: './images/instagram_images/insta_homepage.png'
    });
  },

  login: async (username, password) => {
    await instagram.page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await instagram.page.waitForXPath('//a[contains(text(), "Log in")]', 500);
    let loginButton = await instagram.page.$x(
      '//a[contains(text(), "Log in")]'
    );
    // click on the login button
    await loginButton[0].click();
    await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

    // typing in the username and the password
    await instagram.page.waitFor(1000);
    await instagram.page.waitFor('input[name="username"]');
    await instagram.page.type('input[name="username"]', username, {
      delay: 50
    });
    await instagram.page.waitFor('input[name="password"]');
    await instagram.page.type('input[name="password"]', password, {
      delay: 50
    });

    // clicking on the login button on the login page
    await instagram.page.click(
      '#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4)'
    );
    await instagram.page.screenshot({
      path: './images/instagram_images/insta_loggedin.png'
    });

    debugger;
  }
};

module.exports = instagram;
