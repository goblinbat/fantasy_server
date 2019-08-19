const router = require('express').Router();
const sequelize = require('../db');
const Posst = sequelize.import('../models/Post'); // spelling it "Posst" to avoid confusion with .post

// // get all posts (regardless of user)
// router.get('/all', (req, res) => {
//     Posst.findAll() 
//     .then(pst => res.status(200).json(pst))
//     .catch(err => res.status(500).json({error: err}))
// });

// get all of a user's posts
router.get('/', (req, res) => {
    Posst.findAll({where: {userId: req.user.id}})
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

// get single post      [Use the one in authcontroller]
// router.get('/:id', (req, res) => {  
//     Posst.findOne({where: {id: req.params.id}})
//     .then(pst => res.status(200).json(pst))
//     .catch(err => res.status(500).json({error: err}))
// })

// create post
router.post('/', (req, res) => {
    const newPost = {
        userId: req.user.id,
        userName: req.user.username,
        type: req.body.type, 
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        image: req.body.image,
        iName: req.body.iName,
        iCat: req.body.iCat,
        iRange: req.body.iRange,
        iDamage: req.body.iDamage,
        iThrow: req.body.iThrow,
        iProperties: req.body.iProperties,
        iAlign: req.body.iAlign,
        iScores: req.body.iScores,
        iVuln: req.body.iVuln,
        iResist: req.body.iResist,
        iImmune: req.body.iImmune,
        iLang: req.body.iLang,
        iAction: req.body.iAction,
        iCR: req.body.iCR
    }
    Posst.create(newPost)
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

// update post
router.put('/:id', (req, res) => {
    const upPost = {
        title: req.body.title,
        text: req.body.text,
        type: req.body.type,
        tags: req.body.tags,
        image: req.body.image,
        iName: req.body.iName,
        iCat: req.body.iCat,
        iRange: req.body.iRange,
        iDamage: req.body.iDamage,
        iThrow: req.body.iThrow,
        iProperties: req.body.iProperties,
        iAlign: req.body.iAlign,
        iScores: req.body.iScores,
        iVuln: req.body.iVuln,
        iResist: req.body.iResist,
        iImmune: req.body.iImmune,
        iLang: req.body.iLang,
        iAction: req.body.iAction,
        iCR: req.body.iCR
    } 
    Posst.update(upPost, {where: {id: req.params.id}})
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

// delete post
router.delete('/:id', (req, res) => {
    Posst.destroy({where: {id: req.params.id}})
    .then(pst => res.status(200).json(pst))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router