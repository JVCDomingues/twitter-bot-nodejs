const puppeteer = require('puppeteer');
const config = require('./config/index');

let page = null;
let browser = null;

const { username, password } = config;

browser = puppeteer.launch({ headless: false })
  .then(async browser => {
    page = await browser.newPage();
    page.setViewport({
      width: 1050,
      height: 800,
      isMobile: false
    });

    page.goto("https://twitter.com/login", { waitUntil: "networkidle2" });

    await page.waitForSelector('input[name="session[username_or_email]"]');
    await page.waitForSelector('input[name="session[password]"]');
    
    await page.type('input[name="session[username_or_email]"]', username, { delay: 25 });
    await page.type('input[name="session[password]"]', password, { delay: 25 });

    await page.waitForTimeout(2000);

    await page.waitForSelector('div[data-testid="LoginForm_Login_Button"]');
    await page.click('div[data-testid="LoginForm_Login_Button"]');

    await page.waitForSelector('input[data-testid="SearchBox_Search_Input"]');
    await page.type('input[data-testid="SearchBox_Search_Input"]', 'corinthians', { delay: 25 });

    await page.waitForTimeout(1000);

    await page.keyboard.press('Enter');

    await page.waitForSelector('div[class="css-1dbjc4n.r-xoduu5"]');
    await page.click('div[class="css-1dbjc4n.r-xoduu5"]');

  })
  .catch(err => {
    console.log(err);
  })