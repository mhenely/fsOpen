const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423128"
    },
    { 
      "id": "5",
      "name": "Me", 
      "number": "81987481"
    }
]

app.get('/info', (req, res) => {

  res.send(
    // NOT SURE WHY THE TEMPLATE LITERAL IS THROWING AN ERROR
    `<p>Phonebook has info for ${4} people</p>`
    `<p>${new Date()}</p>`
  )
})


app.get('/api/persons', (req, res) => {
  return res.json(persons)
})

app.get('/api/persons/:id', (req, res)=> {
  const id = req.params.id;

  const person = persons.find(p => p.id === id)

  if(!person) return res.status(404).send('<h2>Nobody with that id in the phonebook</h2>')

  return res.json(person)
})

//POST
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) res.status(400).json({error: 'Missing name and/or number'})

  const newPerson = {
    name,
    number,
    id: Math.floor(Math.random() * 10000)
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})


//DELETE
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const person = persons.find(p => p.id === id)

  if (!person) return res.send('<h2>Nobody with that id in the phonebook</h2>')

  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${3001}`)
})