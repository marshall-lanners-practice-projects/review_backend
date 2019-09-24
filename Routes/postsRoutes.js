const express = require('express');
const router = express.Router();
const knex = require('knex')
require('dotenv').config()
require('custom-env').env('production')
const dbConfig = require('../knexfile')
const db = knex(dbConfig.production)
const protects = require('./middleWear.js');

//create a post
router.post('', (req, res) => {
	const { title, content, user_id } = req.body
	db.insert({title, content, user_id}).into('posts')
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json(error)
	})
})

//get all posts
router.get('', (req, res) => {
	db('posts')
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

//get a specific post
router.get('/:id', (req, res) => {
	const { id } = req.params
	db('posts')
	.where({ id })
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(200).json(error)
	})
})

//get all posts by a user
router.get('/user/:id', (req, res) => {
	const { id } = req.params
	db('users')
	.join('posts', 'posts.user_id', '=', 'users.id')
	.where('users.id', id)
	.select('username', 'email', 'title', 'content')
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

//update a post
router.put('/:id', (req, res) => {
	const { title, content } = req.body 
	const { id } = req.params
	db('posts')
	.where({ id })
	.update({ title, content })
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(200).json(error)
	})
})

//delete a specific post
router.delete('/:id', (req, res) => {
	const { id } = req.params
	db('posts')
	.where({ id })
	.del()
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(200).json(error)
	})
})

module.exports = router;