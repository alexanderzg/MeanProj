
const crypto = require('crypto').randomBytes(256).toString('hex');


module.exports ={ //Exports the file/object
    // uri: 'mongodb://localhost:27017/mean-proj',
    uri: 'mongodb://localhost:27017/myMajorPlanner_Users',
    secret: 'crypto',
    db:'mean-proj'
}