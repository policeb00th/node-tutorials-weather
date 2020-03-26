const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a533518228161cc5877aa17dc3849fc4/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' It is ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'+'\nThe maximum temperature for the day is '+body.daily.data[0].temperatureHigh+' degrees Celsius. The minimum temperature for the day is ' +body.daily.data[0].temperatureLow)
        }
    })
}

module.exports = forecast