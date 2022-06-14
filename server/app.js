const {join}=require('path')
const express=require('express')
const cors=require('cors')
const router=require('./src/routes')

const app=express()

// app.use(express.static(join(__dirname, '..', 'client', 'www')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())
app.use('/', (req, res) => {
  res.send({message: "Hello World"})
})
app.use('/api', router);

// app.get('*', (_req, res) => {
//   res.sendFile(join(__dirname, '..', 'client/www', 'index.html'))
// })

module.exports=app
