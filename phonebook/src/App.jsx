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

const Notification = ({ error }) => {

  const [ message, type ] = error

  const successStyle = {
    color: 'green',
    border: '2px solid green',
    borderRadius: '5px'
  }

    const failureStyle = {
    color: 'red',
    border: '2px solid red',
    borderRadius: '10px'
  }

  return (
    <div className='error' style={ type === 'success' ? successStyle : failureStyle}>
      {message}
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
  const [ errorMessage, setErrorMessage ] = useState(['', ''])


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
          return personService
            .update(inPhonebook.id, {...inPhonebook, number: newNumber})
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id === inPhonebook.id ? updatedPerson : person))
              setNewName('')
              setNewNumber('')
              setErrorMessage(['Successfully Updated Phonebook', 'success'])
              setTimeout(() => {
                setErrorMessage(['', ''])
              }, 3000)
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
        setErrorMessage(['Successfully added to phonebook', 'success'])
        setTimeout(() => {
          setErrorMessage(['', ''])
        }, 3000)
      })
  }

  const handleDelete = (id) => {
    personService
      .deletePerson(id)
      .then(res => {
        const newPersons = persons.filter(person => person.id !== id)
        setPersons(newPersons)
      })
      .catch(error => {
        setErrorMessage(['Entry already deleted', 'fail'])
        setTimeout(() => {
          setErrorMessage(['', ''])
        }, 4000)
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage[0] && <Notification error={errorMessage} />}
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