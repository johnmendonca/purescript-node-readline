/* global exports */
'use strict';

// module Node.ReadLine
var readline_module = require('readline');

exports.createInterfaceImpl = function (options) {
    return function () {
        return readline_module.createInterface(
            { input: options.input
      , output: options.output
      , completer: options.completer && function (line) {
          var res = options.completer(line)();
          return [res.completions, res.matched];
      }
      , terminal: options.terminal
      , historySize: options.historySize
            });
    };
};

exports.close = function (readline) {
    return function () {
        readline.close();
    };
};

exports.prompt = function (readline) {
    return function () {
        readline.prompt();
    };
};

exports.promptPreserve = function (readline) {
    return function () {
        readline.prompt(true);
    };
};

exports.question = function(text) {
    return function(callback) {
        return function(readline) {
            return function() {
                readline.question(text, function(result) {
                    callback(result)();
                });
            };
        };
    };
};

exports.setPrompt = function (prompt) {
    return function (length) {
        return function (readline) {
            return function () {
                readline.setPrompt(prompt, length);
            };
        };
    };
};

exports.setLineHandler = function (readline) {
    return function (callback) {
        return function () {
            readline.removeAllListeners('line');
            readline.on('line', function (line) {
                callback(line)();
            });
        };
    };
};

exports.clearLine = function(stream) {
  return function(dir) {
    return function() {
      readline_module.clearLine(stream, dir);
    };
  };
};

exports.clearScreenDown = function(stream) {
  return function() {
    readline_module.clearScreenDown(stream);
  };
};

exports.cursorTo = function(stream) {
  return function(x) {
    return function(y) {
      return function() {
        readline_module.cursorTo(stream, x, y);
      };
    };
  };
};

exports.cursorToX = function(stream) {
  return function(x) {
    return function() {
      readline_module.cursorTo(stream, x);
    };
  };
};

exports.moveCursor = function(stream) {
  return function(dx) {
    return function(dy) {
      return function() {
        readline_module.moveCursor(stream, dx, dy);
      };
    };
  };
};

exports.onClose = function(readline) {
  return function(handler) {
    return function() {
      readline.on('close', handler);
    };
  };
};

