
//All dependencies
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


//Routes Handler
const indexRouter = require('./routes/index')


//Middlewares
app.set('view engine','ejs')
app.set('views', __dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:true}))
app.use(bodyParser.json())


//Routes Handler map
app.use('/', indexRouter)


app.listen(process.env.port || 3000)
