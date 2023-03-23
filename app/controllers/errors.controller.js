exports.allMethodErrors = (req, res, next) => {
    res.status(404).send({msg: 'Not Found'})
}

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.handlePSQLErrors = (err, req, res, next) => {
    console.log(err.code)
    if(err.code === '22P02') res.status(400).send({msg: 'Invalid Input'})
    if(err.code === '23502') res.status(404).send({msg: 'Not Null Violation'})
    next(err)
}

exports.handleInternalServerErrors = (err, req, res) => {
     console.log(err)
     res.status(500).send('Internal Server Error')
}