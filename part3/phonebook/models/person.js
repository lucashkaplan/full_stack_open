/* This file sets up the connection b/w the backend server and the Persons DB in MongoDB.
*/

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

// Set up connection to MongoDB
console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
  })

// define schema for phonebook app
const peopleSchema = new mongoose.Schema({
    name: String,
    number: String
})

// JSON representation of contacts
peopleSchema.set('toJSON', {
    transform: (_, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', peopleSchema)