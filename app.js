const express = require('express')
const path = require('path')
const methodOverride = require('method-override')

const rootRoute = require('./src/routes/rootRoute')
const taskRoute = require('./src/routes/taskRoute')
const personRoute = require('./src/routes/personRoute')

require('./config/database')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'assets')))

// este metodo sobreecrevre o post e o get e auxilia no put e delete
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }))

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use('/', rootRoute)
app.use('/persons', personRoute)
app.use('/tasks', taskRoute)

app.listen(3000, ()=>{
    console.log('Sevidor ligado')
})

