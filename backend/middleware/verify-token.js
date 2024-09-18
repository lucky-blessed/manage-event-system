const jwt = require('jsonwebtoken');
const { replaceOne } = require('../models/user');
//JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

function verifyToken(req, res, next) {
    const token = req.header('Authoriztion')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ Message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', error: error.message });
    }
}

module.exports = verifyToken;