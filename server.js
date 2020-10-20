require('dotenv').config()

var express = require('express')
var mongoose = require('mongoose')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')

const webpack = require('webpack')
const compiler = webpack(webpackConfig)

// Require all models
var db = require('./models')
console.log(db)

// Connect to MongoDB
mongoose.connect(process.env.REACT_APP_NOT_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

var PORT = 3000

// Initialize Express
var app = express()

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Make public static folder
app.use(express.static('public'))

// Routes
// Route to get all products
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
)
app.use(
  webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })
)

app.get('/products', function (req, res) {
  db.Product.find({})
    .then(function (dbProducts) {
      res.json(dbProducts)
    })
    .catch(function (err) {
      res.json(err)
    })
})

// Route to get all reviews
app.get('/reviews', function (req, res) {
  db.Review.find({})
    .then(function (dbReviews) {
      res.json(dbReviews)
    })
    .catch(function (err) {
      res.json(err)
    })
})

// Route for creating a new Product
app.post('/product', function (req, res) {
  console.log('bryan', req.body)
  db.Product.create(req.body)
    .then(function (dbProduct) {
      // If we were able to successfully create a Product, send it back to the client
      res.json(dbProduct)
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err)
    })
})

// Route for creating a new Review and updating Product "review" field with it
app.post('/product/:id', function (req, res) {
  // Create a new note and pass the req.body to the entry
  db.Review.create(req.body)
    .then(function (dbReview) {
      // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
      // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Product.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reviews: dbReview._id } },
        { new: true }
      )
    })
    .then(function (dbProduct) {
      // If we were able to successfully update a Product, send it back to the client
      res.json(dbProduct)
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err)
    })
})

// Route for retrieving a Product by id and populating it's Review.
app.get('/products/:id', function (req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  db.Product.findOne({ _id: req.params.id })
    // ..and populate all of the notes associated with it
    .populate('reviews')
    .then(function (dbProduct) {
      // If we were able to successfully find an Product with the given id, send it back to the client
      res.json(dbProduct)
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err)
    })
})
// Home route. Currently just to make sure app is running returns hello message.

// app.get('/', function (req, res) {
//   res.send('Hello from demo app!')
// })

app.get('/', (_, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

// Start the server
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT + '.')
})
