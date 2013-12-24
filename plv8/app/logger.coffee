LogLevel =
  ALL: 0
  DEBUG: 10
  LOG: 20
  INFO: 30
  NOTICE: 35
  WARNING: 40
  ERROR: 50
  NONE: 1000


level = LogLevel.NOTICE

voidfn = ->

#  A logger class which outputs with the name of the logger and the debugging
#  level.
class Logger

  # Creates a logger with this name.
  #
  # @param {String} name The name used when writing logs.
  constructor: (@name, lvl) ->
    @setLevel lvl

  # Sets the logging level.
  #
  # @param {Number|String} lvl The logging level
  setLevel: (lvl) ->
    if isNaN(lvl)
      lvl = LogLevel[lvl] || LogLevel.NOTICE
    return if @level? == lvl
    @level = lvl

    @isDebug = LogLevel.DEBUG >= lvl
    if @isDebug
      @debug = (message, args...) ->
        plv8.elog DEBUG1, "#{@name} #{message}", args...
    else
      @debug = voidfn

    @isLog = LogLevel.LOG >= lvl
    if @isLog
      @log = (message, args...) ->
        plv8.elog LOG, "#{@name} #{message}", args...
    else
      @log = voidfn

    @isInfo = LogLevel.INFO >= lvl
    if @isInfo
      @info = (message, args...) ->
        plv8.elog INFO, "#{@name} #{message}", args...
    else
      @info = voidfn

    @isNotice = LogLevel.NOTICE >= lvl
    if @isNotice
      @notice = (message, args...) ->
        plv8.elog NOTICE, "#{@name} #{message}", args...
    else
      @notice = voidfn

    @isWarning  = LogLevel.WARNING >= lvl
    if @isWarning
      @warning = (message, args...) ->
        plv8.elog WARNING, "#{@name} #{message}", args...
    else
      @warning = voidfn

    @isError = LogLevel.ERROR >= lvl
    if @isError
      @error = (message, args...) ->
        plv8.elog ERROR, "#{@name} #{message}", args...
    else
      @error = voidfn

    @

exports.setLevel = (lvl) ->
  if isNaN(lvl)
    lvl = LogLevel[lvl] || LogLevel.NOTICE
  level = lvl
  for k, logger of cache
    logger.setLevel lvl
  null

# Gets the logger for a module named `name`
#
# @param {String} name The module name.
# @param {Int|String| lvl Sets the logging level.
exports.getLogger = (name, lvl = level) ->
  logger = cache[name]
  if !logger
    logger = new Logger(name, lvl)
    cache[name] = logger
  if logger.level != lvl
    logger.setLevel lvl
  logger

cache = {}
