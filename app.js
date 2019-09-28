const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

class Todo {
    constructor(task) {
        this.task = task;
        this.status = true;
    }
}
let todos = [
    { id: 1, title: 'test todo 1', completed: false },
    { id: 2, title: 'test todo 2', completed: true },
    { id: 3, title: 'test todo 3', completed: false },
    { id: 4, title: 'test todo 4', completed: true }
]

app.get('/hello', (req, res) => {
    res.send({ message: 'Hello' })
})
app.get('/todos', (req, res) => {
    res.send(todos)
})
app.get('/todos/:id', (req, res) => {
    let id = req.params.id
    let result = todos.filter(todo => todo.id.toString() === id)
    let todo = result[0]
    res.send(todo)
})
app.get('/todoscompleted', (req, res) => {
    let tmp = []
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed == true) {
            tmp.push(todos[i])
        }
    }

    res.send(tmp)
})
app.get('/todosuncompleted', (req, res) => {
    let tmp = []
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed == false) {
            tmp.push(todos[i])
        }
    }

    res.send(tmp)
})
app.get('/todosqty', (req, res) => {
    let tmp = []
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed == false) {
            tmp.push(todos[i])
        }
    }
    res.send(tmp.length + " items left")
})
app.post('/create', (req, res) => {
    let title = req.body.task
    let todo = { title: title, completed: false, id: todos.length + 1 }
    todos.push(todo)
    res.status(201).send(todo)
})
app.put('/edit/:id', (req, res) => {
    let id = req.params.id
    let result = todos.filter(todo => todo.id.toString() === id)
    result.title = req.body.title
    todos[id-1] = result
    res.send(202)

})

app.delete('/del/:id', (req, res) => {
    let id = req.params.id
    delete todos[id-1]
    todos = todos.filter(todo => todo !== null)
    res.status(204).send(todos)
})

app.delete('/delcompleted', (req, res) => {
    let tmp = []
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].completed == true) {
            delete todos[i]
        }
    }
    todos = todos.filter(todo => todo !== null)
    res.status(204).send(todos)
})

app.listen(port, () => {
    console.log(`API started at ${port}`)
})

