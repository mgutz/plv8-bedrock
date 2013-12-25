var __slice = [].slice;

var cache = {};

var LogLevel = {
  DEBUG: 10,
  LOG: 20,
  INFO: 30,
  NOTICE: 40,
  WARNING: 49,
  WARN: 50,
  ERROR: 60
};

var _level = 'NOTICE';

function voidfn(){};

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

  this.isDebug = LogLevel.DEBUG >= levelNum;
  if (this.isDebug) {
    this.debug = function() {
      var args, message;
      message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return plv8.elog.apply(plv8, [DEBUG1, this.name + " " + message].concat(__slice.call(args)));
    };
  } else {
    this.debug = voidfn;
  }

  this.isLog = LogLevel.LOG >= levelNum;
  if (this.isLog) {
    this.log = function() {
      var args, message;
      message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return plv8.elog.apply(plv8, [LOG, this.name + " " + message].concat(__slice.call(args)));
    };
  } else {
    this.log = voidfn;
  }

  this.isInfo = LogLevel.INFO >= levelNum;
  if (this.isInfo) {
    this.info = function() {
      var args, message;
      message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return plv8.elog.apply(plv8, [INFO, this.name + " " + message].concat(__slice.call(args)));
    };
  } else {
    this.info = voidfn;
  }

  this.isNotice = LogLevel.NOTICE >= levelNum;
  if (this.isNotice) {
    this.notice = function() {
      var args, message;
      message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return plv8.elog.apply(plv8, [NOTICE, this.name + " " + message].concat(__slice.call(args)));
    };
  } else {
    this.notice = voidfn;
  }

  this.isWarn = LogLevel.WARN >= levelNum;
  if (this.isWarn) {
    this.warn = function() {
      var args, message;
      message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return plv8.elog.apply(plv8, [WARNING, this.name + " " + message].concat(__slice.call(args)));
    };
  } else {
    this.warn = voidfn;
  }

  this.isError = LogLevel.ERROR >= levelNum;
  if (this.isError) {
    this.error = function() {
      var args, message;
      message = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return plv8.elog.apply(plv8, [ERROR, this.name + " " + message].concat(__slice.call(args)));
    };
  } else {
    this.error = voidfn;
  }
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

