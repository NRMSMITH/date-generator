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

exports.handleInternalServerErrors = (err, req, res) => {
     console.log(err)
     res.status(500).send('Internal Server Error')
}