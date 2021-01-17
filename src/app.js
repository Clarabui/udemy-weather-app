import express from 'express'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const app = express();
const port = 3000;

//Define path for Express Config
const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsResetToTemplates = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlerbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsResetToTemplates)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Tram Bui"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: "Tram Bui"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    name: "Tram Bui",
    message: "All you need is in this page"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must send the address"})
  }

  let address = req.query.address

  geocode(address, (error, {latitude, longtitude, location} = {} ) => {
    if (error) {
      return res.send({error: error})
    }

    forecast(latitude, longtitude, (error, forecastData) => {
      if (error) {
        return res.send({error: error})
      }

      res.send({
        location: location,
        data: forecastData
      })
    })
  })
})


app.get('/help/*', (req, res) => {
  res.render('error', {
    title: "ERROR",
    name: "Tram Bui",
    message: "Help article not found"
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: "ERROR",
    name: "Tram Bui",
    message: 'Page not found'
  })
})



app.listen(port, () => {
  console.log("Listening at port 3000")
})