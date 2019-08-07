const router = require('express').Router();
const sequelize = require('../db');
const Comment = sequelize.import('../models/Comment');

// get all comments on post
router.get('/post/:postId', (req, res) => {    // :id NEEDS to be the id of the POST, NOT a comment
    Comment.findAll({where: {postId: req.params.id}})
    .then(com => res.status(200).json(com))
    .catch(err => res.status(500).json({error: err}))
});

// get comment by id
router.get('/:id', (req, res) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(com => res.status(200).json(com))
    .catch(err => res.status(500).json({error: err}))
});

// create comment
router.post('/:postId', (req, res) => {
    const newCom = {
        userId : req.user.id,
        postId : req.params.postId,
        text : req.body.text
    }
    Comment.create(newCom)
    .then(com => res.status(200).json(com))
    .catch(err => res.status(500).json({error: err}))
});

// update comment
router.put('/:id', (req, res) => {
    Comment.update({text: req.body.text}, {where: {id: req.params.id}})
    .then(com => res.status(200).json(com))
    .catch(err => res.status(500).json({error: err}))
});

// delete comment
router.delete('/:id', (req, res) => {
    Comment.destroy({where: {id: req.params.id}})
    .then(com => res.status(200).json(com))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router