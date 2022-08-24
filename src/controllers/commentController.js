const Comment = require('../models/comment');

function create(req, res){
    // Validate Request
    if(!req.body){
        res.status(400).send({
            message: 'Comment cannot be empty'
        })
    }
    // Create a Comment
    const comment = new Comment({
        content: req.body.content,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        post_id: req.body.post_id,
        user_id: req.body.user_id || 0
    })
    // Save a Comment to the database
    Comment.create(comment, (err, data) =>{
        if (err)
            res.status(500).send({
                message: err.message || "Error while creating Comment.create data"
      });
        else res.send(data);
    })
}

// Find 1 Comment by id
function find(req, res){
    Comment.find(req, (err, data) => {
        if(err){
            if(err.code == "not found"){
                res.status(404).send({
                    message: `Comment not Found`
                })
            }else {
                res.status(500).send({
                    message: `Error retrieving Comment`
                })
            }
        }else res.send(data)
    })
}


// Update a Comment by Id
function update(req, res){
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: 'Comment cannot be empty'
        })
    }
    console.log(req.body)

    // Create a Comment
    const comment = new Comment({
        content: req.body.content,
        created_at: req.body.created_at,
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        post_id: req.body.post_id,
        user_id: req.body.user_id
    })

    Comment.update(req.params.id, comment, (err, data) => {
        if(err){
            if(err.code === "not found"){
                res.status(404).send({
                    message: `Comment with id: ${req.params.id} not found`
                })
            } else {
                res.status(500).send({
                    message: `Error while updating Comment.update data with id: ${req.params.id}`
                })
            }
        }else res.send(data)
    })
}

function deleteComment(req, res){
    Comment.delete(req.params.id, (err, data) => {
        if(err){
            if(err.code === 'not found'){
                res.status(404).send({
                    message: `Comment with id ${req.params.id} not found`
                })
            }else{
                res.status(500).send({
                    message: `Comment with id ${req.params.id} could not be deleted`
                })
            }
        }else res.send({message: 'Comment has been deleted successfully'})
    })
}

function deleteAll(req, res){
    Comment.deleteAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Error while deleting all Comments'
            })
        }else res.send({ message: 'All Comments have been deleted successfully'})
    })
}

module.exports = {create, find, update, deleteComment, deleteAll}