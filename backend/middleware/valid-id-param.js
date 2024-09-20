const isValidObjectId = require('../utils/is-valid-id');

function validIdParam(req, res, next) {
    const id = req.params.id;

    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid ID format.'});

    next();
}

module.exports = validIdParam;