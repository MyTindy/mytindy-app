const { join } = require('path')
const express = require('express')
const cors = require('cors')
const router = require('./src/routes')

const app = express()

app.use(express.static(join(__dirname, '..', 'dist', 'mytindy')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use('/api', router);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'mytindy-app', 'index.html'))
})

module.exports = app