const express = require('express');
const app = express();
const cors = require('cors')
const { getDates, getDateById, postDate, patchDate, deleteDate } = require('./controllers/date.controller.js')
const { allMethodErrors, handleCustomErrors, handleInternalServerErrors, handlePSQLErrors } = require('./controllers/errors.controller.js')

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => res.send('Hello niamh!'))

app.get('/api/dates', getDates)
app.get('/api/dates/:date_id', getDateById)

app.post('/api/dates', postDate)

app.patch('/api/dates/:date_id', patchDate)

app.delete('/api/dates/:date_id', deleteDate)

app.all('*', allMethodErrors)

app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handleInternalServerErrors)

module.exports = { app }