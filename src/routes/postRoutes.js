const express = require('express')
const postController = require('../controllers/postController')
const postValidator = require('../middleware/postValidator')
const router =  express.Router()

// example get one post: /post/1
router.get('/post/:id', postController.find)

// example to get all posts: /post 
// example with offset and limit: /post?limit=5&offset=2
// example get all posts by user_id: /post?user_id=11
// example get all posts by title: /post?title="title"
// example get all post by content: /post?content="content"
router.get('/post', postController.find)

router.post('/post', postValidator.postValidation, postController.create)

// example: /post/1
router.put('/post/:id', postValidator.postUpdateValidation, postController.update)

// example: /post/1
router.delete('/post/:id', postController.deletePost)
router.delete('/post', postController.deleteAll)

module.exports = router