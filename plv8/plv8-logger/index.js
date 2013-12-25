var __slice = [].slice;

var cache = {};

var LogLevel = {
  DEBUG1: 9,
  DEBUG: 10,
  LOG: 20,
  INFO: 30,
  NOTICE: 40,
  WARNING: 49,
  WARN: 50,
  ERROR: 60
};

var _level = 'NOTICE';

function noop(){};

function Logger(name, level) {
  this.name = name;
  this.setLevel(level);
}

Logger.prototype.setLevel = function(level) {
  if ((this.level != null) === level) {
    return;
  }
  var levelNum = LogLevel[level];
  if (levelNum) {
    this.level = level;
  } else {
    this.level = _level;
    levelNum = LogLevel[_level];
  }

  var self = this;

  function makeFunc(flag, method, logLevel, pgLEVEL) {
    self[flag] = logLevel >= levelNum;
    if (flag) {
      self[method] = function() {
        var args, message;
        message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return plv8.elog.apply(plv8, [pgLEVEL, self.name + " " + message].concat(__slice.call(args)));
      };
    } else {
      self[method] = noop;
    }
  }

  // this.isDebug = LogLevel.DEBUG >= levelNum;
  // if (this.isDebug) {
  //   this.debug = function() {
  //     var args, message;
  //     message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  //     return plv8.elog.apply(plv8, [DEBUG1, this.name + " " + message].concat(__slice.call(args)));
  //   };
  // } else {
  //   this.debug = noop;
  // }

  makeFunc("isDebug", "debug", LogLevel.DEBUG, DEBUG1);
  makeFunc("isLog", "log", LogLevel.LOG, LOG);
  makeFunc("isInfo", "info", LogLevel.INFO, INFO);
  makeFunc("isNotice", "notice", LogLevel.NOTICE, NOTICE);
  makeFunc("isWarn", "warn", LogLevel.WARN, WARNING);
  makeFunc("isError", "error", LogLevel.ERROR, ERROR);
  return this;
};

exports.setLevel = function(level) {
  var k, logger;
  if (!level || LogLevel[level] < 0) {
    plv8.elog(NOTICE, 'Invalid log level "' + level + '"');
    return;
  }

  _level = level;
  for (k in cache) {
    logger = cache[k];
    logger.setLevel(level);
  }
};

exports.getLogger = function(name, level) {
  if (!level) {
    level = _level;
  }
  if (LogLevel[level] < 0) {
    plv8.elog(NOTICE, 'Invalid log level "' + level + '"');
    return;
  }

  var logger = cache[name];
  if (logger) {
    logger.setLevel(level);
  } else {
    logger = new Logger(name, level);
    cache[name] = logger;
  }
  return logger;
};

