const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ec1b52dd078a9f3e41af121fdf46a2b7&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if ( body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0] +'.It is currently ' + 
            body.current.temperature + ' degress out. There is a ' +  
            body.current.precip + '% chance of rain.'+'The humidity is '+body.current.humidity+'%')
        }   

    })
}

module.exports = forecast