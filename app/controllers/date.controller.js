const { selectDates, selectDateById, addDate, updateDate, removeDate } = require('../models/date.model.js')

exports.getDates = (req, res, next) => {
    selectDates(req, res).then((result) => {
        res.status(200).send(result)
    })
    .catch(next)
}

exports.getDateById = (req, res, next) => {
    const { date_id } = req.params;
    selectDateById(date_id).then((result) => {
        res.status(200).send(result)
    })
    .catch(next)
}

exports.postDate = (req, res, next) => {
    const date = req.body
    addDate(date, res).then((result) => {
        res.status(201).send(result[0])
    })
    .catch(next)
}

exports.patchDate = (req, res, next) => {
    const {date_id} = req.params
    const update = req.body
    updateDate(date_id, update).then((result) => {
        res.status(200).send(result.rows[0])
    })
    .catch(next)
}

exports.deleteDate = (req, res, next) => {
    const {date_id} = req.params;
    removeDate(date_id).then((deletedComment) => {
        if(deletedComment) res.sendStatus(204)
    })
    .catch(next)
}