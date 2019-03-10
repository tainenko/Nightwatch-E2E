# nightwatch-allure-adapter
This is allure reporter adapter for nightwatch tests,which generates xml reports that are consumed by allure during generation.

## Using Reporter In Nightwatch
In global js file add reporter like this

```javascript
var allure = require("nightwatch-allure-adapter");

module.exports = {
    reporter: allure.write
};

```
This will generate xml reports in allure-results directory at root.

You can use [allure generate](https://github.com/allure-framework/allure-core/wiki#generating-a-report) for report generation