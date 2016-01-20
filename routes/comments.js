var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Comments(){
  return knex('comments');
}

// GET ALL COMMENTS FOR POST
router.get('/posts/:p_id/comments', function(req, res, next) {
  Comments().where('post_id', req.params.p_id).select().then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

// ADD NEW COMMENT TO POST
router.post('/posts/:p_id/comments', function(req, res, next) {
  req.body.post_id = req.params.p_id;
  Comments().insert([req.body]).then(function (result) {
    res.redirect('/posts/'+ req.params.p_id +'/comments');
  })
});

// GET SINGLE COMMENT
router.get('/posts/:p_id/comments/:c_id', function(req, res, next) {
  Comments().where('id', req.params.c_id).first().then(function (posts) {
    res.json({'SUCCESS': posts });
  })
});

// EDIT A COMMENT
router.get('/posts/:p_id/comments/:c_id/edit', function(req, res, next) {
  res.send('200');
});

// UPDATE COMMENT
router.post('/posts/:p_id/comments/:c_id', function(req, res, next) {
  Comments().where('id', req.params.c_id).update(req.body).then(function (result) {
    res.redirect('/posts/'+ req.params.p_id +'/comments/');
  })
});

// DELETE COMMENT
router.post('/posts/:p_id/comments/:c_id/delete', function(req, res, next) {
  Comments().where('id', req.params.c_id).del().then(function (result) {
    res.redirect('/posts/'+ req.params.p_id +'/comments');
  })
});

module.exports = router;
