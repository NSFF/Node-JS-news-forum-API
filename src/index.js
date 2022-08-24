// imports
const express = require('express')
const postRoutes = require('./routes/postRoutes.js')
const commentRoutes = require('./routes/commentRoutes')

// constants
const app = express()
const port = 3000

// middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use(postRoutes)
app.use(commentRoutes)

// Server startup
app.listen(port, () => {
  console.log(`Server listening on url: localhost:${port}`)
})
