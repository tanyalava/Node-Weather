const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=695e9c16d4e6c5372bbf5ca775ec4ae3&units=metric`

    request({url,json:true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to the weather service!!',undefined)
        } else if(body.message) {
            callback(body.message,undefined)
        } else {
            callback(undefined,`It is currently ${body.current.temp} celsius temerature out there!`)
        }
    })
}

module.exports = forecast