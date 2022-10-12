const request = require('request')

const weather = (cord1,cord2, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=44eb30cf1e104d011a04059835ad7a44&query=' + cord1 + ',' + cord2 +'&units=f'
    request({url, json: true},(error, {body})=>{
        if(error){
            callback("Unable to contect to weather service",undefined)

        }else if(body.error){

            callback("Unable to find location",undefined)

        }else{
            callback(undefined,body.current.weather_descriptions[0]+'. it is a currently '+body.current.temperature+' out. It feels ' +body.current.feelslike+' degrees out .')

        }
    })
}

module.exports = weather

