const express = require('express');
// create express app and store in app var
const app = express();
app.use(express.json());
const fs = require('fs');

// get info for all people in phonebook
const personsJSON = JSON.parse(fs.readFileSync('./persons.json', 'utf8'));

// route to access all contacts
app.get('/api/persons', (request, response) => {
    if(personsJSON){
        response.json(personsJSON);
    }
    else{
        response.status(404).json({ 
            error: 'content missing' 
        });
    }
})

app.get('/info', (request, response) => {
    // get number of people in phonebook
    const numContacts = Array.isArray(personsJSON)
        ? personsJSON.length
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

const PORT = 3001;
// create server (listens for conections on port 3001)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});