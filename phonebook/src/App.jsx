// to do
  // extract components to own file
    // confirm deletion with window.confirm
  // use put method to update number if already existing user has new number submitted
    // have user confirm the action

import personService from './services/backend'
import { useState, useEffect } from 'react'

const Person = ({ name, number, id, handleDelete }) => {


  return (
    <div>
      {name}: {number}
      <button onClick={() => handleDelete(id)}>X</button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleNameInput = ({ target }) => {
    setNewName(target.value)
  }

  const handleNumberInput = ({ target }) => {
    setNewNumber(target.value)
  }

  const handleSearchNameInput = ({ target }) => {
    setSearchName(target.value)
  }

  const handleNameSubmit = (event) => {
    event.preventDefault()
    // search for newName in persons
    const inPhonebook = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (inPhonebook) {
      // handle update
        // first ask if want to update
        if (!window.confirm(`Do you want to update ${newName}'s number in the phonebook?`)) {
          return alert(`${newName}'s number not updated'`)
        } else {
          personService
            .update(inPhonebook.id, {...inPhonebook, number: newNumber})
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id === inPhonebook.id ? updatedPerson : person))
              setNewName('')
              setNewNumber('')
            })
        }
    }

    // create a new entry
    const newPerson = {
      name: newName,
      number: newNumber, 
      id: Math.floor(Math.random() * 5000).toString()
    }

    personService
      .create(newPerson)
      .then(res => {
        setPersons([...persons, res])
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id) => {
    personService
      .deletePerson(id)
      .then(res => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input onChange={handleSearchNameInput} />
      <form onSubmit={handleNameSubmit}>
        <div>
          name: <input onChange={handleNameInput}/>
          number: <input onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons[0] ?
        persons.filter(({name}) => name.toLowerCase().startsWith(searchName.toLowerCase()))
        .map(({ name, number, id }) => <Person key={id} id={id} name={name} number={number} handleDelete={handleDelete}/>)
        : 'Phonebook empty'}
    </div>
  )
}

export default App