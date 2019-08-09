// retrieve, update, delete

const router = require('express').Router();
const sequelize = require('../db');
const User = sequelize.import('../models/User');

// get the user 
router.get('/:username', (req, res) => {
    User.findOne({where: {username: req.params.username}})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error:err}))
})

router.get('/get/:id', (req, res) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error: err}))
})

// get all users
router.get('/get/all', (req, res) => {
    User.findAll()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({error: err}))
})

// update 
router.put('/:id', (req, res) => {
    const username = req.body.user.username;
    // const password = req.body.user.password;
    const profile = req.body.user.profile;
    // const profilePic = req.body.user.pic

    User.update({
        username: username,
        // password: bcrypt.hashSync(password, 10),
        profile: profile,
        // profilePic: profilePic
    }, {where: {id: req.params.id}})
    .then(user => res.status(200).json(user))
    .catch(err => res.json({error: err}))
})

// delete
router.delete('/:id', (req, res) => {
    User.destroy({where: {id: req.params.id}})
    .then(pie => res.status(200).json(pie))
    .catch(err => res.json({error: err}))
})

// functions for adding/removing friends, viewing liked posts, etc would go down here

module.exports = router