if(process.env.CONN.indexOf('mongodb') === 0)
    module.exports = require('./index.mongoose');
else 
    module.exports = require('./index.sequelize');

