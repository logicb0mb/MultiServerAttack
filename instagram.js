const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com';
const TAG_URL = tag => `https://instagram.com/explore/tags/${tag}/`;
const ACTIVITY_URL = 'https://www.instagram.com/session/login_activity/';

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {
    instagram.browser = await puppeteer.launch({
      headless: false
    });

    instagram.page = await instagram.browser.newPage();
    await instagram.page.setViewport({ width: 1366, height: 768 });
    await instagram.page.waitFor(500);
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
    // await instagram.page.waitForNavigation({ waitUntil: 'networkidle2' });

    // typing in the username and the password
    await instagram.page.waitFor(1000);
    await instagram.page.waitFor('input[name="username"]');
    console.log(`Typing username`);
    await instagram.page.type('input[name="username"]', username, {
      delay: 50
    });
    await instagram.page.waitFor('input[name="password"]');
    console.log(`Typing password`);
    await instagram.page.type('input[name="password"]', password, {
      delay: 50
    });
    console.log(`Clicking login button`);
    // clicking on the login button on the login page
    await instagram.page.click(
      '#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4)'
    );

    await instagram.page.waitFor(5000); //waiting for 5 seconds
    console.log(`Logged in: Check screenshot`);
    await instagram.page.screenshot({
      path: './images/instagram_images/insta_loggedin.png'
    });
    await instagram.page.waitFor('a > svg[aria-label="Profile"]');
  },
  likeTagsProcess: async (tags = []) => {
    for (let tag of tags) {
      //   Goto the tag page
      await instagram.page.goto(TAG_URL(tag), { waitUntil: 'networkidle2' });
      await instagram.page.waitFor(1000);

      let posts = await instagram.page.$$(
        'article > div:nth-child(3) img[decoding="auto"]'
      );
      console.log(`Selected all images from Most recent`);
      console.log(`Images post: ${posts}`);

      for (i = 0; i < 3; i++) {
        let post = posts[i];

        console.log(`Clicking on ${i + 1} image`);
        // Click on the post
        await post.click();
        console.log(`Clicked on ${i + 1} image`);

        // Wait for the modal to appear
        await instagram.page.waitFor('body[style="overflow: hidden;"]');
        await instagram.page.waitFor(1000);

        console.log(`Modal of the image is open now!`);

        let isLikable = await instagram.page.$('svg[aria-label="Like"]');
        console.log(`Going to like now: ${isLikable}`);

        if (isLikable) {
          console.log(`Clicking on like button of image ${i + 1}`);
          await instagram.page.click('svg[aria-label="Like"]');
          // dont print modal does not allow screenshot and pdf
          // await instagram.page.pdf({ path: `hn.pdf`, format: 'A4' });

          console.log(`Clicked like button of image ${i + 1}`);
        }

        await instagram.page.waitFor(3000);
        // Close the modal
        console.log(`Clicking on close button of image ${i + 1} modal`);
        await instagram.page.waitFor('svg[aria-label="Close"]');
        await instagram.page.click('svg[aria-label="Close"]');
        console.log(`Closed modal`);

        await instagram.page.waitFor(1000);
      }
      console.log(`Going for next tag now:`);
      await instagram.page.waitFor(6000);
    }
    console.log(`Exiting tag process`);
  },
  stealingLoginAcitivity: async () => {
    await instagram.page.goto(ACTIVITY_URL, { waitUntil: 'networkidle2' });
    await instagram.page.waitFor(1000);
    console.log(`Stealing login activity!`);
    await instagram.page.screenshot({
      path: './images/stealLogin/you_have_been_hacked.png'
    });
    console.log(`Login Activity Stolen Check Screenshot`);
  }
};

module.exports = instagram;
