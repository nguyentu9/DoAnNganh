const mysql = require('mysql2');

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'doannganh',
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0
});

const promisePool = db.promise();


module.exports = {
    promisePool,
    db
};