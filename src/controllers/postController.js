const Post = require('../models/post');

function create(req, res){
    // Validate Request
    if(!req.body){
        res.status(400).send({
            message: 'Post cannot be empty'
        })
    }
    // Create a Post
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        user_id: req.body.user_id || 0
    })
    // Save a Post to the database
    Post.create(post, (err, data) =>{
        if (err)
            res.status(500).send({
                message: err.message || "Error while creating Post.create data"
      });
        else res.send(data);
    })
}

// Find 1 post by id
function find(req, res){
    Post.find(req, (err, data) => {
        if(err){
            if(err.code == "not found"){
                res.status(404).send({
                    message: `Post not Found`
                })
            }else {
                res.status(500).send({
                    message: `Error retrieving Post`
                })
            }
        }else res.send(data)
    })
}


// Update a post by Id
function update(req, res){
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: 'Post cannot be empty'
        })
    }
    console.log(req.body)

    // Create a Post
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        created_at: req.body.created_at,
        updated_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
        user_id: req.body.user_id
    })

    Post.update(req.params.id, post, (err, data) => {
        if(err){
            if(err.code === "not found"){
                res.status(404).send({
                    message: `Post with id: ${req.params.id} not found`
                })
            } else {
                res.status(500).send({
                    message: `Error while updating Post.update data with id: ${req.params.id}`
                })
            }
        }else res.send(data)
    })
}

function deletePost(req, res){
    Post.delete(req.params.id, (err, data) => {
        if(err){
            if(err.code === 'not found'){
                res.status(404).send({
                    message: `Post with id ${req.params.id} not found`
                })
            }else{
                res.status(500).send({
                    message: `Post with id ${req.params.id} could not be deleted`
                })
            }
        }else res.send({message: 'Post has been deleted successfully'})
    })
}

function deleteAll(req, res){
    Post.deleteAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Error while deleting all posts'
            })
        }else res.send({ message: 'All posts have been deleted successfully'})
    })
}

module.exports = {create, find, update, deletePost, deleteAll}