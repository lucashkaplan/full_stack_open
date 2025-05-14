import { useState, useEffect } from 'react'
import personServer from './server/person'

const NumberInput = ({newNumber, handleNumberChange}) => {
  return(
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
  )
}

const NameInput = ({newName, handleNameChange}) => {
  return(
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
  )
}

const PersonForm = ({handlePersonForm, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={handlePersonForm}>
      <NameInput newName={newName} handleNameChange={handleNameChange}/>
      <NumberInput newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const deleteButton = (handleDeletePerson, id) => {
  return(
    <button onClick={() => handleDeletePerson(id)}>delete</button>
  )
}

const PersonList = ({persons, filter, handleDeletePerson}) => {
  // filter person list based on filter
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <ul>
      {filteredPersons.map(person => 
        <li key={person.name}>
          {person.name} : {person.number}
          {deleteButton(handleDeletePerson, person.id)}
        </li>
      )}
    </ul>
  );
}

const Filter = ({filter, handleFilterChange}) => {
  return(
    <div>
      Filter names containing: <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Notification = ({message}) => {
  const notifcationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  if (message == null){
    return null
  }

  // if message exists, create div w/ message
  return(
    <div style={notifcationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)

  // get list of people from server every time list of people changes
  useEffect(() => {
    personServer
      .getAllPeople()
      .then(response => {
        setPersons(response.data)
        console.log("Axios effect response for getting initial people: ", response)
      })
  }, [])


  // event handler for changing name
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // event handler for changing number
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const createNotificationMsg = (message) => {
    console.log("Notification message changed to:", message)
    setNotificationMsg(message)
    setTimeout(() => {
      setNotificationMsg(null)
    }, 5000)
  }

  // event handler for form submission
  const handlePersonForm = (event) => {
    // prevent the default form submission behavior
    event.preventDefault()

    // create a new person object
    const personObject = {
      name: newName,
      number: newNumber
    }

    // check if the person is already in the phonebook
    const personExists = persons.some(person => person.name === newName)

    // add person to phonebook if they're not already in it
    if (!personExists) {
      personServer
        .addPerson(personObject)
        .then(returnedPerson => {
          // update state w/ person obj returned from backend
          setPersons(persons.concat(returnedPerson))
          // reset state
          setNewName('') // set name back to default
          setNewNumber('') // set number back to default
          setFilter('') // reset filter
          createNotificationMsg(`Added ${returnedPerson.name}!`)
          console.log('Added person: ', returnedPerson)
        })
        .catch(error => {
          console.error(`Error adding person ${newName}:`, error)
          createNotificationMsg('Failed to add person. Please try again.');
        })
    } else {
      alert(`${newName} has already been added to the phonebook`);
    }
  }

  // event handler for filtering the phonebook
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // handler for deleting person
  const handleDeletePerson = (id) => {
    console.log("Attempting to delete person with ID: ", id)
    
    // confirm deletion
    const personToDelete = persons.find(person => person.id === id)
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`)
    if (!confirmDelete) return
    
    // delete person from local state
    setPersons(persons.filter(person => person.id !== id))
    // delete person from server
    personServer.deletePerson(id)
  }

  return (
    <div>
      <Notification message={notificationMsg}/>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add New</h2>
      <PersonForm 
        handlePersonForm={handlePersonForm}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App