require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const PORT = process.env.PORT || 3000


//database connection
const url = process.env.MONGOURI
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected');
}).catch(err => {
    console.log('Connection failed')
});


//session store

let mongoStore = new MongoDbStore({
    mongooseConnection : connection,
    collection: 'sessions'//name of table
})


//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24} //24 hrs

}))

app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//Assests
app.use(express.static('public'))
app.use(express.json())//to tell express that we are using json data
app.use(express.urlencoded({extended:false}))
app.use(flash())


app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web.js')(app)


app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})