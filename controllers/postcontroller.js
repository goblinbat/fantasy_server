const router = require('express').Router();
const sequelize = require('../db');
const Posst = sequelize.import('../models/Post'); // spelling it "Posst" to avoid confusion with .post

// get all posts (regardless of user)
router.get('/all', (req, res) => {
    Posst.findAll()     // i think this should work, but not 100% sure
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

// get all of a user's posts
router.get('/', (req, res) => {
    Posst.findAll({where: {userId: req.user.id}})
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

// get single post
router.get('/:id', (req, res) => {
    Posst.findOne({where: {id: req.params.id}})
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
})

// create post
router.post('/', (req, res) => {
    const newPost = {
        userId: req.user.id,
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags
    }
    Posst.create(newPost)
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

// update post
router.put('/:id', (req, res) => {
    const upPost = {
        title : req.body.title,
        text : req.body.text,
        tags : req.body.tags
    } 
    Posst.update(upPost, {where: {id: req.params.id}})
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

// delete madlib
router.delete('/:id', (req, res) => {
    Posst.destroy({where: {id: req.params.id}})
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router