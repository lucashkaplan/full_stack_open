import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    } else {
      alert(`${newName} has already been added to the phonebook`);
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => 
        <li key={person.name}>{person.name} : {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App