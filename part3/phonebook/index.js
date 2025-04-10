const express = require('express')
// create express app and store in app var
const app = express()
app.use(express.json())
const fs = require('fs');

// route to access all contacts
app.get('/api/persons', (request, response) => {
    const personsJSON = JSON.parse(fs.readFileSync('./persons.json', 'utf8'));

    if(personsJSON){
        response.json(personsJSON)
    }
    else{
        response.status(404).json({ 
            error: 'content missing' 
        })
    }
})

const PORT = 3001
// create server (listens for conections on port 3001)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})