const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')

//define handlebars engine 
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Tanya Lavania'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About',
        name : 'Tanya Lavania'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message : 'Please contact me for more queries.',
        title : 'Help',
        name : 'Tanya Lavania'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error : 'Please provide an address.'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error) {
            return res.send({error})
        } 
        forecast(latitude,longitude,(error,forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecastData : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title : 'Error',
        name : 'Tanya Lavania',
        description : 'Help article not found!'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title : 'Error',
        name : 'Tanya Lavania',
        description : 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("on port 3000")
})