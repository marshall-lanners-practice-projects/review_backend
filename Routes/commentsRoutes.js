const express = require('express');
const router = express.Router();
const knex = require('knex');
require('dotenv').config();
require('custom-env').env('production');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.production);
const protects = require('./middleWear.js');

//create a comment
router.post('', (req, res) => {
  const { content, post_id } = req.body;

  db.insert({ content, post_id })
    .into('comments')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//get all comments for a post
router.get('/post/:id', (req, res) => {
  const { id } = req.params;
  db('posts')
    .join('comments', 'posts.id', '=', 'comments.post_id')
    .where('posts.id', id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(200).json(error);
    });
});

//update a comment
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  db('comments')
    .where({ id })
    .update({ content })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(200).json(error);
    });
});

//delete a comment
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('comments')
    .where({ id })
    .del()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//delete a comment

module.exports = router;
