var allure = require("nightwatch-allure-adapter");


module.exports = {
    reporter: allure.write,
    beforeEach: function(browser, done) {
    browser.resizeWindow(1920,1280,done);
  }
};