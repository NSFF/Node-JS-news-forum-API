// Mysql //
const mysql = require('mysql')
const config = require('../config.js')

const connection = mysql.createConnection(config.db)
    
connection.connect(function(err){
  if (err) throw err
  console.log('Connection to your mysql server established')
})

module.exports = connection
