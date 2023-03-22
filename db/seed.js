const db = require('./connection.js');
const {createDates, insertDates} = require('./sqlcalls.js')

function seed(dates) {
    return db
    .query(`DROP TABLE IF EXISTS dates;`)
    .then(() => {
        return createDates();
    }).then(() => {
        return insertDates(dates);
    })
};


module.exports = { seed };