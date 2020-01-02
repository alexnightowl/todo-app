const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')

const tedoRoute = require('./routes/todos')

const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    defaultView: 'default',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(tedoRoute)



async function start() {
    try {
        await mongoose.connect('mongodb+srv://alex:alex1212@cluster0-ekzv6.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })
    } catch (error) {
        console.log(error)
    }
}

start()