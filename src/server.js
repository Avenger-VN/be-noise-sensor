const express = require("express")
const connectDB = require("./config/dbConnect")
const initWebRoutes = require("./routes/api")
const bodyParser = require("body-parser")
const app = express()

connectDB()

// app.use(express.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

initWebRoutes(app)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
