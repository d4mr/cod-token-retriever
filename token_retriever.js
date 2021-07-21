const puppeteer = require("puppeteer");

const tokenRetriever = async (emailId, password) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://profile.callofduty.com/cod/login");
  
  const cookies = await page.cookies();
  // console.log(cookies);

  await page.type("#username", emailId);
  await page.type("#password", password);
  await Promise.all([
    page.click("button#login-button[type=submit]"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);

  const newCookies = await page.cookies();
  // console.log(newCookies);

  const atkn = newCookies.find((c) => c.name === "atkn").value;
  const act_sso = newCookies.find((c) => c.name === "ACT_SSO_COOKIE").value;
  const act_sso_remember_me = newCookies.find(
    (c) => c.name === "ACT_SSO_REMEMBER_ME"
  ).value;
  const act_sso_expiry = newCookies.find(
    (c) => c.name === "ACT_SSO_COOKIE_EXPIRY"
  ).value;

  await browser.close();
  return {
    atkn,
    act_sso,
    act_sso_remember_me,
    act_sso_expiry,
  };
};

module.exports = tokenRetriever;
