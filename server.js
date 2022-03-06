const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const tutorialsRoutes = require('./routes/tutorial.routes')
require('dotenv').config()


const app = express()

let corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests do tipo content-type - application/json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.sequelize.sync({ force: true }).then(() => {
    console.log('Dropping and re-sync tables.')
})

app.get('/', (req, res) => {
    res.send({ message: 'Hello world.' })
})

app.use('/api/tutorials', tutorialsRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running. PORT = ${PORT}`)
})