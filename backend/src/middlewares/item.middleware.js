const notEmptyQuery = function (req, res, next) {
    if (!req.query.q) {
        return res.status(400).send('The query is required')
    }
    next();
}

const notEmptyId = function (req, res, next) {
    if (!req.params.id) {
        return res.status(400).send('The id parameter is required')
    }
    next();
}

module.exports = { notEmptyQuery, notEmptyId }
