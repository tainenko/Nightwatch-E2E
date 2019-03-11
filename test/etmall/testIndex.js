module.exports = {
  '@tags': ['index'],
  'Demo ETMall Index Page': browser => {
    browser
      .url('https://www.etmall.com.tw/')
      .waitForElementVisible('body')
        .click('#cBtnClose')
      .clearValue('#txtSearchKeyword')
      .setValue('#txtSearchKeyword', 'iphone')
      .click('button.n-btn--search')
      .waitForElementVisible('body')
      .end()
  }
}