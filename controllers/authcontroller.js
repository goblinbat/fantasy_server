// signup and login

const router = require('express').Router();
const sequelize = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = sequelize.import('../models/User');

router.post('/signup', (req, res) => {
    const username = req.body.user.username;
    const pass = req.body.user.password;

    User.create({
        username: username,
        password: bcrypt.hashSync(pass, 10)
    }).then(function createSuccess(user) {
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        res.json({
            user: user,
            message: 'created user',
            sessionToken: token
        });
    },
    function createError(err) {
        res.send(500, err.message);
    });
});

router.post('/login', (req, res) => {
    User.findOne({where: {username: req.body.user.username}})
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if (matches) {
                    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.json({
                        user: user,
                        message: 'successfully authenticated',
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({error: 'failure'});
                }
            });
        } else {
            res.status(500).send({error: "authentication failed"});
        }
    }, err => {
        res.status(501).send({error: 'failure'});
    });
});

module.exports = router