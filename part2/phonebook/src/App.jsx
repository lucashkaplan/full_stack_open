import { useState, useEffect } from 'react'
import axios from 'axios'

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

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <NameInput newName={newName} handleNameChange={handleNameChange}/>
      <NumberInput newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PersonList = ({persons, filter}) => {
  // filter person list based on filter
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <ul>
      {filteredPersons.map(person => 
        <li key={person.name}>{person.name} : {person.number}</li>
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

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // get initial list of people from server on App render
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log("Axios effect response: ", response)
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

  // event handler for form submission
  const addPerson = (event) => {
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
      console.log('Added person:', newName, newNumber)
      setPersons(persons.concat(personObject))
      setNewName('') // set name back to default
      setNewNumber('') // set number back to default
      setFilter('') // reset filter
    } else {
      alert(`${newName} has already been added to the phonebook`);
    }
  }

  // event handler for filtering the phonebook
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add New</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter}/>
    </div>
  )
}

export default App