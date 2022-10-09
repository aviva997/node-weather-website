const request = require('request')


const geocode = (address, callback) => {
  
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXZpdmEyIiwiYSI6ImNsOG9kZ3NyejI5ZjUzd281YWlueGppM3MifQ.cQQ2i22r_B6jpXFrx-HPKQ"

    request({url, json: true},(error, {body}) =>{
        if(error){
            callback("Unable to conatct to thr services")

        }else if(body.features.length === 0){
            callback("Unable to find the location")
        }else{
            callback(undefined,{
              latitud :body.features[0].center[1], //רוחב
              longtud :body.features[0].center[0],//אורך
              location:body.features[0].place_name

            })
        }
    })
} 
module.exports = geocode