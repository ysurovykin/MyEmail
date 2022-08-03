const ApiError = require('../errors/api-errors')

module.exports = function(err, req, res, next){
    console.log(err);
    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message, errors: err.erorrs})
    }
    return res.status(500).json({message: 'Unexpected error'})
}