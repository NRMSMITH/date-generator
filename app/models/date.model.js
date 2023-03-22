const db = require('../../db/connection.js')

exports.selectDates = () => {
    return db.query(`SELECT * FROM dates;`).then((data) => {
        return data.rows
    })
}

exports.selectDateById = (date_id) => {
    if(/\D/.test(date_id)) {
        return Promise.reject({status: 400, msg: "Incorrect data type for Date ID."})
    } else {
        return db.query(`SELECT * FROM dates WHERE id = $1;`, [date_id]).then((result) => {
            if(result.rows.length === 0) {
                return Promise.reject({status: 404, msg: "Date ID does not exist."})
            } else {
                return result.rows[0]
            }
        })
    }
}

exports.addDate = (date) => {
    return db.query(`INSERT INTO dates (title, description, address, postcode, price_estimation) VALUES ($1, $2, $3, $4, $5) RETURNING*;`, [date.title, date.description, date.address, date.postcode, date.price_estimation]).then((result) => {
        return result.rows;
    })

}

exports.updateDate = (date_id, column) => {
    const column_name = Object.keys(column)
    const greenList = [
        'title',
        'description',
        'address',
        'postcode',
        'price_estimation'
    ]
    const value = Object.values(column)
    if(greenList.includes(column_name[0])) {
    return db.query(`UPDATE dates SET ${column_name} = $1 WHERE id = $2 RETURNING*;`, [value[0], date_id]).then((data) => {
        return data
    })
    }
}

exports.removeDate = (date_id) => {
    return db.query(`DELETE FROM dates WHERE id = $1;`, [date_id])
    .then((result) => {
        return result
    })
}