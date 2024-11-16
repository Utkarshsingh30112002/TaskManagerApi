const logger = require("../utils/logger");

function errorHandler(err,req,res,next){
    if(err){
        logger.error(err.message)
        const statusCode=err.statusCode||500
        res.status(statusCode).json({message:err.message});
    }
    next()
}
module.exports=errorHandler;