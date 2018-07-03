// const jwt = require('jsonwebtoken');
const User = require('../models/users')

function isAuthorizedUser(req, res, next) {
    const currUserId = req.user.id
    User.findById({ _id: currUserId })
        .then(user => {
            if (user.role === 'admin') {
                next()
            } else {
                res.status(400).json({ error: "Not Authorized user" })
            }
        })
        .catch(err => {
            next(err)
        });
}

module.exports = isAuthorizedUser;