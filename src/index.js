const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routers/router')

const app = express()
app.use(cors())

app.use(express.json())
app.use(router)
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
