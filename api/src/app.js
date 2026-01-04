const express = require('express')
const cors = require('cors')

const filesRoutes = require('./routes/files.routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/files', filesRoutes)

module.exports = app
