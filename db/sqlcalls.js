const db = require('./connection.js');
const format = require('pg-format');
const {arrangeData} = require('./utils/utils.js');


function createDates() {
    return db
    .query(`CREATE TABLE dates (id SERIAL PRIMARY KEY, title VARCHAR(100), description TEXT, address VARCHAR(100), postcode VARCHAR(7), price_estimation INT NOT NULL)`)
}

function insertDates(dates) {
    const sortedDates = arrangeData(dates)
    const queryStr = format('INSERT INTO dates (title, description, address, postcode, price_estimation) VALUES %L RETURNING*;', sortedDates)
    return db.query(queryStr)
}

module.exports = { createDates, insertDates }