const express = require("express")
const connectDB = require("./config/dbConnect")
const initWebRoutes = require("./routes/api")
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const swaggerUi = require("swagger-ui-express")
const fs = require("fs")
const path = require("path")
const YAML = require("yaml")

const file = fs.readFileSync(path.resolve("swagger.yaml"), "utf8")
const swaggerDocument = YAML.parse(file)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

connectDB()

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE"],
  }),
)

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
