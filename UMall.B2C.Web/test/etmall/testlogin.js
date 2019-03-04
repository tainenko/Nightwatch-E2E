module.exports = {
  '@tags': ['login'],
  'Demo ETMall Login testcase': function(browser){
      var loginpage=browser.page.loginpage();

      loginpage.navigate()
          .setValue('@inputLoginId','eitctest001@gmail.com')
          .setValue('@inputPassward','abc12345')
          .getOCRwithtess('temp.png')
          .click('@loginButton')
          .end()
  }
};