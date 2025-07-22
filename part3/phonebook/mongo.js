/* This file completes all interactions b/w the phonebook app and the MongoDB database
* (e.g. adding a contact, deleting a contact, retrieving contacts).
*/

const mongoose = require('mongoose')

if (!((process.argv.length == 5) || (process.argv.length == 3))) {
  console.log('Program call should be either: \n \
    node mongo.js password "name" number \n \
    node mongo.js password'
    )
  console.log('NOTE: If name contains whitespace, it must be enclosed in quotes')
  process.exit(1)
}

const password = process.argv[2]
const db_name = 'phonebook_fso'

const url = `mongodb+srv://lhkaplan:${password}@fso-cluster.m2zulkx.mongodb.net/${db_name}?retryWrites=true&w=majority&appName=FSO-Cluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

// define schema for phonebook app
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Person', personSchema)

// display all contacts
if (process.argv.length == 3){
    Contact.find({}).then(
        result => {
            result.forEach(contact => {
                console.log(contact)
            })

            mongoose.connection.close()
        }
    )
}

// add new contact
if (process.argv.length == 5){
    // create contact
    const newContact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })

    // save to DB
    newContact.save().then(result => {
        console.log("New contact added!")
        console.log(`name: ${process.argv[3]} | number: ${process.argv[4]}`)
        mongoose.connection.close()
    })
}