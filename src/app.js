const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express();

// console.log(__dirname)


const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// console.log(viewPath)
// console.log(publicDirectory)
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))


app.get('', (req,res)=>{
    res.render('index',{
        title: 'weather',
        name: 'Prateek'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'help',
        name: 'Prateek'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'about',
        name: 'Prateek'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'please provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error: 'please provide an address'
                })
              }
            res.send({
                location,
                forecastData
            })
            
        })
  })
})






// app.get('', (req,res)=>{
//     res.send('<h1>hii this is front page</h1>')
// })

// app.get('/docs', (req,res)=>{
//     res.send('hii this is documentation page')
// })
// app.get('/contact', (req,res)=>{
//     res.send('hii this is contact page')
// })

app.listen(3000,()=>{
    console.log('app is running now')
})

