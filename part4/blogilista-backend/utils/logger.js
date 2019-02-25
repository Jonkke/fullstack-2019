const logRequest = (req, res, next) => {
    console.log('PATH:', req.path)
    console.log('Method', req.method)
    console.log('---')
    next()
}

module.exports = logRequest