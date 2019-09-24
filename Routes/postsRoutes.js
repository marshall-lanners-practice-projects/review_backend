const express = require('express');
const router = express.Router();
const knex = require('knex')
const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

//create a post
router.post('', (req, res) => {
	const { title, content, user_id } = req.body
	db.insert({title, content, user_id}).into('posts')
	.then(res => {
		res.status(200).json(res)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

//get all posts
router.get('', (req, res) => {
	db('posts')
	.then(res => {
		res.status(200).json(res)
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
	.then(res => {
		res.status(200).json(res)
	})
	.catch(error => {
		res.status(200).json(error)
	})
})

//get all posts by a user
router.get('_user/:id', (req, res) => {
	const { id } = req.params
	db('users')
	.join('posts', 'posts.user_id', '=', 'users.id')
	.where('users.id', id)
	.select('username', 'email', 'title', 'content')
	.then(res => {
		res.status(200).json(res)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

//update a post
router.get('/:id', (req, res) => {
	const { title, content } = req.body 
	const { id } = req.params
	db('posts')
	.where({ id })
	.update({ title, content })
	.then(res => {
		res.status(200).json(res)
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
	.then(res => {
		res.status(200).json(res)
	})
	.catch(error => {
		res.status(200).json(error)
	})
})

module.exports = router;