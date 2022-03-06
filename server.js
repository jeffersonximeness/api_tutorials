const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

let corsOptions = {
    origin: 'http://localhost:8081'
}

app.use(cors(corsOptions))

// parse requests do tipo content-type - application/json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send({ message: 'Hello world.' })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running. PORT = ${PORT}`)
})