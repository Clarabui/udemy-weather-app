import request from 'postman-request'

const geocode = (address, callback) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address)+ `.json?access_token=pk.eyJ1IjoiY2xhcmFidWkiLCJhIjoiY2tqbWRzbGFrMGoybzJxbjBvaXlqa2NtbyJ9.ii9lLyd1x7IbiG3h1z_UyA&limit=1`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect server', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try again', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

export default geocode;