const png = require('png-crop');
const fs = require('fs');
const util = require('util');
const events = require('events');
const mkdirp = require('mkdirp');

function partialScreenshot() {
  events.EventEmitter.call(this);
}

function makeDirForPath(baselinePath) {
  const baseDir = baselinePath.substring(0, baselinePath.lastIndexOf('/'));
  mkdirp.sync(baseDir);
}

util.inherits(partialScreenshot, events.EventEmitter);

partialScreenshot.prototype.command = function (selector, filename, callback) {
  this.abortOnFailure = typeof this.client.api.globals.abortOnAssertionFailure === 'undefined' || this.client.api.globals.abortOnAssertionFailure;
  const self = this;
  const pathToSave = filename;
  const pathTmp = `temp/${filename}`;
  // #TODO ignore hidden part of element
  self.locateStrategy = self.client.locateStrategy || 'css selector';
  self.api.element(self.locateStrategy, selector, (element) => {
    if (element && !element.error) {
      self.api.elementIdLocationInView(element.value.ELEMENT, (location) => {
        self.api.elementIdSize(element.value.ELEMENT, (size) => {
          self.api.saveScreenshot(pathTmp, () => {
            makeDirForPath(pathToSave);
            const config = {
              width: size.value.width,
              height: size.value.height,
              top: location.value.y,
              left: location.value.x,
            };
            png.crop(
              pathTmp,
              pathToSave,
              config,
              (err) => {
                if (err) {
                  self.client.assertion(false, 'not found', 'found', `SaveElementScreenshotAction: could not crop: ${pathToSave} ${err}`, self.abortOnFailure, self._stackTrace);
                  return self.emit('complete');
                }
                fs.unlink(pathTmp, (res) => {
                  const message = `Saved screenshot for <${selector}> to ${pathToSave}`;
                  self.client.assertion(true, 'expression false', 'expression true', message, true);
                  self.emit('complete');
                  if (typeof callback === 'function') {
                    callback.call(self.client.api);
                  }
                });
              });
          });
        });
      });
    } else {
      self.client.assertion(false, 'not found', 'found', `SaveElementScreenshotAction: could not select <${selector}> because ${element.error}`, self.abortOnFailure, self._stackTrace);
      return self.emit('complete');
    }
  });

  return this;
};

module.exports = partialScreenshot;