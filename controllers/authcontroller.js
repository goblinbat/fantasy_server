// signup and login

const router = require('express').Router();
const sequelize = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = sequelize.import('../models/User');
const Posst = sequelize.import('../models/Post');
const Comment = sequelize.import('../models/Comment');

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

// get all posts (so that non-logged-in users can actually use the explore page)
router.get('/allPosts', (req, res) => {
    Posst.findAll() 
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

router.get('/:id', (req, res) => {
    Posst.findOne({where: {id: req.params.id}})
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
})

// get all comments on post
router.get('/post/:postId', (req, res) => {    // :id NEEDS to be the id of the POST, NOT a comment
    Comment.findAll({where: {postId: req.params.postId}})
    .then(com => res.status(200).json(com))
    .catch(err => res.status(500).json({error: err}))
});

// get comment by id
router.get('/comment/:id', (req, res) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(com => res.status(200).json(com))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router