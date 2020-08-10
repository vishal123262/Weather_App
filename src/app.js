const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

//setup handlebars engine and views location
app.set('view engine' ,'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req , res) => {
    res.render('index' , {
        title:'Weather app',
        name:'vishal'
    })
})


app.get('/about' , (req , res) => {
    res.render('about' , {
        title:'About Me',
        name:'vishal Modani'
    })
})


app.get('/help' , (req , res) => {
    res.render('help' , {
        title:'Help',
        message:'I am ready to help',
        name:'Vishal modani'
    })
})

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide the address!'
        })
    }
    geocode(req.query.address , (error , {latitude , longitude , location} = {}) => {
        if(error){
            return res.send({error})
        } 
        forecast(latitude , longitude , (error , forecastdata) => {
              if(error){
                 return res.send({error})
              }
              res.send(
                {
                    address: req.query.address,
                    location,
                    forecast: forecastdata
                }
            )
               
        })   
    })     
})

app.get('/products' ,(req , res) => {
    if(!req.query.search){
        return res.send({
            error:'Please provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*' , (req , res) => {
    res.render('404' , {
        title:'404 Page',
        name:'Vishal Modani',
        errorMessage:'Help article not found!'
    })
})

app.get('*' , (req , res) => {
    res.render('404' , {
        title:'404 Page',
        name:'Vishal Modani',
        errorMessage:'Page Not Found!'
    })
})

app.listen(3000 , () => {
    console.log('server is on port 3000!')
})
