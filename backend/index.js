const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(n => n.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const { content, important} = req.body
  if (!content) return res.status(400).json({error: 'Content is missing'})

  const maxID = notes.length === 0
    ? 0
    : Math.max(...notes.map(n => Number(n.id))) 

  const note = {
    content, 
    important: important || true,
    id: maxID + 1
  }

  res.json(note)
})


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})