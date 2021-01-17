import request from 'postman-request'
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longtitude , callback) => {
  const url = `http://api.weatherstack.com/current?access_key=7e60746cd13a18fd4b35827d148e8127&query=` + latitude + `,`+ longtitude + `&units=m`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect weather server', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, "The temperature currently is " + body.current.temperature + " degrees C")
    }
  })
}

export default forecast;