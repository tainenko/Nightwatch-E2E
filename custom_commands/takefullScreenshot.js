exports.command = function(filepath) {
    const browser = this;
    browser.takefullScreenshot( filepath,function(result) {
        let size = browser.getWindowSize();
        let prev_height = size.height;
        let prev_width = size.width;
        let width = browser.execute('return document.body.parentNode.scrollWidth');
        let height = browser.execute('return document.body.parentNode.scrollHeight');
        browser.setWindowSize(width,height);
        browser.saveScreenshot(filepath);
        browser.setWindowSize(prev_width,prev_height);
        return this;
    });
};