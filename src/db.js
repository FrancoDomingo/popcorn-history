const {db} = require('./config')
const {Pool} = require('pg');

const popcorn = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.databae
});

module.exports = popcorn;