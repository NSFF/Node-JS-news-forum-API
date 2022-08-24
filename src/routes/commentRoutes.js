const express = require('express')
const commentController = require('../controllers/commentController')
const commentValidator = require('../middleware/commentValidator')
const router =  express.Router()

// example: /comment/1
router.get('/comment/:id', commentController.find)

// example to get all comments: /comment 
// example with offset and limit: /comment?limit=5&offset=2
// example get all comments by user_id: /comment?user_id=11
// example get all comments by content: /comment?content="content"
// example get all comments by post_id: /comment?post_id=1
router.get('/comment', commentController.find)

router.post('/comment', commentValidator.commentValidation, commentController.create)

// example /comment/1
router.put('/comment/:id', commentValidator.commentUpdateValidation, commentController.update)

// example /comment/1
router.delete('/comment/:id', commentController.deleteComment)
router.delete('/comment', commentController.deleteAll)

module.exports = router