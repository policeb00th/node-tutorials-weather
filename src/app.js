const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Diptanshu'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Diptanshu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Diptanshu'
    })
})
app.get('/weather', (req, res) => {
    if (req.query.address) {
        geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            forecast(latitude, longitude, (error, foreCastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                return res.send({
                    forecast: foreCastData,
                    location,
                    address:req.query.address
                })
            })
        })
        // return res.send({
        //     location: 'location',
        //     forecast: 'forecast',
        //     address : req.query.address
        //         })
    }
    // res.send({error:'Error, enter address'})
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not found.',
        name: 'Diptanshu',
        title: '404'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        error: 'Page not found.',
        name: 'Diptanshu',
        title: '404'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})