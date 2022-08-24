const mysql = require('../services/mysql')

class Comment {
    constructor(comment) {
        this.id = comment.id
        this.content = comment.content
        this.created_at = comment.created_at
        this.updated_at = comment.updated_at
        this.post_id = comment.post_id
        this.user_id = comment.user_id
    }
    static create(newComment, result) {
        let query = "insert into Comments set ?"
        mysql.query(query, newComment, (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }
            console.log("Created Comment : ", res)
            result(null, { id: res.insertId, ...newComment })
        })
    }
    static find(req, result) {
        let query = ""
        if(req.query.user_id){
            query = `select * from Comments where user_id = ${req.query.user_id}`
        }else if(req.params.id){
            query = `select * from Comments where id = ${req.params.id}`
        }else if(req.query.content){
            query = `select * from Comments where content = ${req.query.content}`
        }else if(req.query.post_id){
            query = `select * from Comments where post_id = ${req.query.post_id}`
        }else if(req.query.limit){
            const limit = req.query.limit
            const offset = req.query.offset
            console.log(`Limit: ${limit} offset: ${offset}`)
            query = `select * from Comments limit ${limit} offset ${offset}`
        }else{
            query = "select * from Comments"
        }

        mysql.query(query, (err, res) => {
            if (err) {
                console.log('error: ', err)
                result(null, err)
                return
            }
            if (res.length) {
                console.log('Found Comment: ', res)
                result(null, res)
                return
            }
            result({ code: "not found" }, null)
        })
    }
    static update(id, newComment, result) {
        let query = "update Comments set content = ?, updated_at = ? where id = ?"
        mysql.query(query, [newComment.content, newComment.updated_at, id]), (err, res) => {
            if (err) {
                console.log('error: ', err)
                result({ code: 'not found' }, null)
                return
            }
            console.log("Comment updated as: ", { id: id, ...newComment })
            result(null, { id: id, ...newComment })
        }
    }
    static delete(id, result){
        let query = "delete from Comments where id = ?"
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
            console.log(`Comment with id: ${id} got deleted`)
            result(null, res)
        })
    }
    static deleteAll(result){
        let query = "delete from Comments"
        mysql.query(query, (err, res) => {
            if(err){
                console.log("error: ", err)
                result(null, err)
                return
            }
            console.log(`deleted ${res.affectedRows} of Comments`)
            result(null, res)
        })
    }
}

module.exports = Comment