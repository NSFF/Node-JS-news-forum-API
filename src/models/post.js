const mysql = require('../services/mysql')

class Post {
    constructor(post) {
        this.id = post.id
        this.title = post.title
        this.content = post.content
        this.created_at = post.created_at
        this.updated_at = post.updated_at
        this.user_id = post.user_id
    }
    static create(newPost, result) {
        let query = "insert into posts set ?"
        mysql.query(query, newPost, (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }
            console.log("Created post : ", res)
            result(null, { id: res.insertId, ...newPost })
        })
    }
    static find(req, result) {
        let query = ""
        if(req.query.user_id){
            query = `select * from posts where user_id = ${req.query.user_id}`
        }else if(req.params.id){
            query = `select * from posts where id = ${req.params.id}`
        }else if(req.query.title){
            query = `select * from posts where title = ${req.query.title}`
        }else if(req.query.content){
            query = `select * from posts where content = ${req.query.content}`
        }else if(req.query.limit){
            const limit = req.query.limit
            const offset = req.query.offset
            console.log(`Limit: ${limit} offset: ${offset}`)
            query = `select * from posts limit ${limit} offset ${offset}`
        }else{
            query = "select * from posts"
        }

        mysql.query(query, (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }
            if (res.length) {
                console.log('Found post: ', res)
                result(null, res)
                return
            }
            result({ code: "not found" }, null)
        })
    }
    static update(id, newPost, result) {
        let query = "update posts set title = ?, content = ?, updated_at = ? where id = ?"
        mysql.query(query, [newPost.title, newPost.content, newPost.updated_at, id]), (err, res) => {
            if (err) {
                console.log('error: ', err)
                result({ code: 'not found' }, null)
                return
            }
            console.log("Post updated as: ", { id: id, ...newPost })
            result(null, { id: id, ...newPost })
        }
    }
    static delete(id, result){
        let query = "delete from posts where id = ?"
        mysql.query(query, id, (err, res) => {
            if(err){
                console.log('error: ', err)
                result(null, err)
                return
            }
            if(res.affectedRows == 0 ){
                result({ code: 'not found'}, null)
                return
            }
            console.log(`Post with id: ${id} got deleted`)
            result(null, res)
        })
    }
    static deleteAll(result){
        let query = "delete from posts"
        mysql.query(query, (err, res) => {
            if(err){
                console.log("error: ", err)
                result(null, err)
                return
            }
            console.log(`deleted ${res.affectedRows} of posts`)
            result(null, res)
        })
    }
}

module.exports = Post