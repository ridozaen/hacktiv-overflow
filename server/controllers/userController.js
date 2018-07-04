const User = require('../models/users');
const jwt = require('jsonwebtoken');
const axios = require('axios')


module.exports = {
    registerUser: (req, res) => {
        const { username, role, password, email } = req.body
        let user = new User({
            username,
            role,
            password,
            email
        })
        user.save()
            .then(function (result) {
                let user = {
                    id: result._id,
                    username: result.username,
                    role: result.role,
                    email: result.email
                }
                res.status(201).json({ message: "create user success", data: user })
            })
            .catch(function (err) {
                res.status(400).json({ error: err })
            })
    },
    loginUser: (req, res) => {
        const { email, password } = req.body
        User.findOne({ email }).select('+password')
            .then(function (user) {
                if (user) {
                    user.comparePassword(password, function (err, isMatch) {
                        if (err) {
                            res.status(500).json({ error: err.message })
                        }else{
                            if (isMatch) {
                                //get token from jwt
                                let token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, process.env.SECRET_KEY, {
                                    expiresIn: 86400 //expires in 24 hours
                                })
                                res.status(200).json({ auth: true,username: user.username, token, email: user.email, role: user.role});
                            } else {
                                res.status(401).json({ error: { message: 'Incorrect email/password' }, auth: false, token: null });
                            }
                        }
                    })
                } else {
                    res.status(404).json({ error: { message: 'Email not found' }, auth: false, token: null });
                }
            })
            .catch(function (err) {
                res.status(500).json({ error: err });
            })
    },
    loginViaFb: (req, res) => {
        // console.log(req.headers);
        let fbToken = req.headers.fbtoken
        const url = `https://graph.facebook.com/me?fields=id,name,email`;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${fbToken}`
            }
        })
            .then(response => {
                console.log('dari axios server:', response.data);
                let userFb = {
                    username: response.data.id,
                    email: response.data.email,
                    password: response.data.id

                }
                User.findOne({ email: userFb.email })
                    .then(user => {
                        if (user) {

                            let token = jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, {
                                expiresIn: 86400 //expires in 24 hours
                            })
                            res.status(200).json({ auth: true, username: user.username, token, email: user.email });
                        } else {
                            let newUser = new User(userFb)
                            newUser.save()
                                .then(result => {
                                    if (result._id) {
                                        console.log('result: ',result);
                                        let token = jwt.sign({ id: result._id, username: result.username, email: result.email }, process.env.SECRET_KEY, {
                                            expiresIn: 86400 //expires in 24 hours
                                        })
                                        res.status(201).json({ message: 'create user via fb success', auth: true, username: result.username, token, email: result.email })
                                    } else {
                                        res.status(400).json({ error: { message: 'create user failed', auth: false, token : null, email: null} })
                                    }
                                })
                                .catch(err => {
                                    res.status(500).json({ error: err})
                                })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ error: err })
                    })
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    },
    showAllUsers: (req, res) => {
        User.find()
            .then(function (users) {
                res.status(200).json({ message: 'retrieve user success', users })
            })
            .catch(function (err) {
                res.status(500).json({ error: err });
            })
    }
}