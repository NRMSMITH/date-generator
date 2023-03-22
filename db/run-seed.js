const { seed } = require('./seed.js')
const db = require('./connection.js')

seed().then(() => {
    return db.end();
})
.catch((err) => {
    console.log(err);
});