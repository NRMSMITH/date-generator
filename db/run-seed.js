const { seed } = require('./seed.js')
const db = require('./connection.js')
const {dates} = require('./data/testdata.json')

seed(dates).then(() => {
    return db.end();
})
.catch((err) => {
    console.log(err);
});