const express = require('express')
// create express app and store in app var
const app = express()

app.use(express.json())

app.get('/api/persons', (request, response) => {
    // TODO
})