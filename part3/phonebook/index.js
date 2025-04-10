const express = require('express');
// create express app and store in app var
const app = express();
app.use(express.json());
const fs = require('fs');

// get info for all people in phonebook
let persons = JSON.parse(fs.readFileSync('./persons.json', 'utf8'));

// route to access all contacts
app.get('/api/persons', (request, response) => {
    if(persons){
        response.json(persons);
    }
    else{
        response.status(404).json({ 
            error: 'content missing' 
        });
    }
})

app.get('/info', (request, response) => {
    // get number of people in phonebook
    const numContacts = Array.isArray(persons)
        ? persons.length
        : 0;
    
    // Get the current time
    const requestTime = new Date().toLocaleString();

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
    const person = persons.find(person => person.id === id)

    if(person){
        // if person exists, send 200
        response.json(person)
    }
    else {
        // if person does not exist, send 404
        response.status(404).json({
            'error': 'No person exists with ID ' + id
        })
    }
})

// route to delete phonebook entry
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)    

    console.log("Removed person w/ ID", id)
    
    // respond w/ 204 no content
    response.status(204).end()
})



const PORT = 3001;
// create server (listens for conections on port 3001)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});