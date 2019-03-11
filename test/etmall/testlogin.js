module.exports = {
  '@tags': ['login'],
  'Demo ETMall Login testcase': function(browser) {
      var loginpage = browser.page.loginpage();
      loginpage.navigate()
          .setValue('@inputLoginId', 'test@gmail.com')
          .setValue('@inputPassward', 'abc12345')
          .partialScreenshot('@imgValidCode', 'tmp.png')
          .setValidCode('tmp.png')
          .click('@loginButton');
  }
};