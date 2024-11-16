const logger = require("../utils/logger");

function log(req, res, next) {
    logger.info(`type-${req.method} url-${req.url}`);
    next();
  };
  
module.exports=log;