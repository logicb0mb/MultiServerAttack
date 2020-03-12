const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.twitter.com';
const LOGIN_URL = 'https://www.twitter.com/login';
const ACTIVITY_URL = 'https://twitter.com/settings/account';

const twitter = {
  browser: null,
  page: null,

  initialize: async headlessValue => {
    twitter.browser = await puppeteer.launch({
      headless: headlessValue
    });

    twitter.page = await twitter.browser.newPage();
    await twitter.page.goto(BASE_URL, { waitUntil: 'networkidle2' });
    await twitter.page.setViewport({ width: 1366, height: 768 });
    await twitter.page.waitFor(500);
    await twitter.page.screenshot({
      path: './images/twitter_images/twitter_homepage.png'
    });
    console.log(`Took twitter homepage screenshot`);
  },
  login: async (username, password) => {
    await twitter.page.goto(LOGIN_URL, { waitUntil: 'networkidle2' });

    // typing in the username and the password
    await twitter.page.waitFor(1000);
    await twitter.page.waitFor('input[name="session[username_or_email]"]');
    console.log(`Typing username`);
    await twitter.page.type(
      'input[name="session[username_or_email]"]',
      username,
      {
        delay: 50
      }
    );
    await twitter.page.waitFor('input[name="session[password]"]');
    console.log(`Typing password`);
    await twitter.page.type('input[name="session[password]"]', password, {
      delay: 50
    });
    console.log(`Clicking login button`);
    // clicking on the login button on the login page
    await twitter.page.click('div[role="button"]');

    await twitter.page.waitFor(5000); //waiting for 5 seconds
    console.log(`Logged in: Check screenshot`);
    await twitter.page.screenshot({
      path: './images/twitter_images/twitter_loggedin.png'
    });
  },
  postTweet: async message => {
    let url = await twitter.page.url();

    if (url != BASE_URL) {
      await twitter.page.goto(`${BASE_URL}/home`, {
        waitUntil: 'networkidle2'
      });
    }
    await twitter.page.waitFor('div[aria-label="Tweet text"]');
    await twitter.page.click('div[aria-label="Tweet text"]');
    await twitter.page.waitFor(500);
    console.log('Typing Tweet Message');
    await twitter.page.keyboard.type(message, { delay: 100 });
    await twitter.page.waitFor(500);
    console.log('CLicking Tweet Button');
    await twitter.page.click('div[data-testid="tweetButtonInline"]');
    console.log(`Clicked Tweet Button`);
    await twitter.page.waitFor(2000);
    console.log('Posted Tweet ! Check Screenshot');
    await twitter.page.screenshot({
      path: './images/twitter_images/twitter_postedTweet.png'
    });
  },
  stealingLoginAcitivity: async () => {
    await twitter.page.goto(ACTIVITY_URL, { waitUntil: 'networkidle2' });
    await twitter.page.waitFor(2000);
    console.log(`Stealing login activity!`);
    await twitter.page.screenshot({
      path: './images/stealLogin/your_twitter_has_been_hacked.png'
    });
    console.log(`Twitter Login Activity Stolen Check Screenshot`);
  },
  end: async () => {
    await twitter.browser.close();
  }
};

module.exports = twitter;
