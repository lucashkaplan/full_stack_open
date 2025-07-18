// use environment variables for configuration
require('dotenv').config()

// create express app and store in app var
const express = require('express');
const app = express();

const fs = require('fs');
const morgan = require('morgan');
// define custom token to show request body
morgan.token('body', (req, res) => {
    // convert request body (JavaScript obj) to JSON string
    return JSON.stringify(req.body);
});

// import DB model
const PeopleModel = require('./models/person')

/* MIDDLEWARE */
app.use(express.json());
// for each HTTP request, tiny option will output:
// :method :url :status :res[content-length] - :response-time ms :body
// :body defined in custom morgan token
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
// serve static files (React frontend) stored in dist folder
app.use(express.static('dist'))

// route to access all contacts
app.get('/api/persons', (_, response) => {
    PeopleModel.find({}).then(contact => {
        response.json(contact)
    })
})

// route to get info about DB
app.get('/info', async (_, response) => {
    // Get the current time
    const requestTime = new Date().toLocaleString();
    
    // get number of people in phonebook
    const numContacts = await PeopleModel.countDocuments({});

    // html response
    const htmlResponse = `
        <html>
            <div>
                Phonebook has info for ${numContacts} people.
            </div>
            <div>
                ${requestTime}
            </div>
        </html>
    `;
    
    // set content type to HTML and send response
    response.setHeader('Content-Type', 'text/html');
    response.send(htmlResponse);
})

// get individual person
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    PeopleModel.findById(id).then(contact => {
        response.json(contact)
    })
})

// route to delete phonebook entry
app.delete('/api/persons/:id', async (request, response) => {
    const id = request.params.id
    await PeopleModel.findByIdAndDelete(id)

    console.log("Removed person w/ ID", id)
    
    // respond w/ 204 no content
    response.status(204).end()
})

// add person to phonebook
app.post('/api/persons', (request, response) => {
    const body = request.body

    // error catching
    // person added must have name and number
    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    }
    if (!body.number) {
        return response.status(400).json({ 
            error: 'number missing' 
        })
    }

    PeopleModel.create({
        name: body.name,
        number: body.number
    }).then(
        person => response.status(201).json(person)
    )
})


const PORT = process.env.PORT;
// create server (listens for conections on port 3001)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});