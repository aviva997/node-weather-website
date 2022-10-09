const path = require('path')
const express = require('express')

const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public')) // כדי להגיע לINDEX נבצע את זה

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const paritialPath = path.join(__dirname,'../templates/partials')

//Setup handelbar
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(paritialPath)


//SetUp static directory to server
app.use(express.static(publicDirectoryPath))

//
app.get('',(req, res)=>{
    res.render('index',{//Redirects to the page registered to it
        title:'Weather ',
        name : 'Aviva Malako'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{//Redirects to the page registered to it
        title:'about ',
        name : 'Aviva Malako'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{ //Redirects to the page registered to it
        title:'help ',
        name: 'Aviva malako',
        some_text : 'if you need help u can tell me'
    })
})

app.get('/weather',(req, res)=> {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {longtud, location,latitud } = {}) => {
        if(error){
            return res.send({error})
        }
        weather(latitud ,longtud,(error,forcast)=>{
            if(error){
                return res.send({error})
            }
            else{
                res.send({
                    forcast :forcast ,
                    location: location,
                    address:req.query.address
                })
            
            }
    
        })
    })
})
app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error:'YOU must provid a search term'
        })
    }
    res.send({
        prosuct: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('errorPage',{
        name: 'Aviva Malako',
        title:'404',
        erroMassage:'Help artical not found'

    })
})

app.get('*',(req, res)=>{
    res.render('errorPage',{
        name:'Aviva malako',
        title:'404',
        erroMassage:'Page not found'
     
    })
})


app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})



// app.get('',(req, res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res)=>{
//     res.send([{
//         name:'Aviva',
//         age: 24
//     },
//     {
//         name:'Dviva',
//         age: 24
//     }

//     ])

// })

// app.get('/about',(req, res)=>{
//     res.send('<h2>About Page</h2>')
// })