const User = require('../models/User');

const isAdmin = async (req, res, next) => {
    const user = req.user
    if (user.role === 'admin') {
        next();
    } else {
        res.status(401).send('You are not authorized to perform this action');
    }
}

module.exports = isAdmin