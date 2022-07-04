import express from 'express'
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql')
const {ObjectId} = require('mongodb');
const pool = require('./db') // import {connectToDb, getDb} from './db'


//* creates an express app
const port = process.env.PORT || 4000
const app = express();
app.use(express.json());


// get all the todo
app.get('/todo', async (req, res) => {
    try {
        try {
            const newTodo = await pool.query("SELECT * FROM todo");
            res.json({msg:'okay', 'result': newTodo.rows});
        } catch (err) {
            res.json({msg:'bad', 'result':err});
        }
    } catch (err) {
        res.json({msg:'bad', 'result':'A try and catch error', err});
    }
})

// get just one request
app.get('/todo/:id', async (req, res) => {
    const id = req.params.id;

    try {
        try {
            const newTodo = await pool.query("SELECT * FROM todo where id = $1", [id]);
            res.json({msg:'okay', 'result': newTodo.rows[0]});
        } catch (err) {
            res.json({msg:'bad', 'result':err});
        }
    } catch (err) {
        res.json({msg:'bad', 'result':'A try and catch error', err});
    }
})

// creating/adding a new todo
app.post('/todo', async(req, res) => {
    try {
        const {description} = req.body;

        try {
            const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
            res.json({msg:'okay', 'result': newTodo.rows[0]});
        } catch (err) {
            res.json({msg:'bad', 'result':'A try and catch error', err});
        }

    } catch (err) {
        res.json({msg:'bad', 'result':'A try and catch error', err});
    }
})

// updating an item from the todoList
app.put('/todo/:id', async (req, res) => {
    const id = req.params.id;
    const {description} = req.body;

    pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id], (err: any, result: any) => {
        if (err) {
            res.json({msg:'bad', 'result':err});
        }

        res.json({msg:'okay', 'result': 'Todo updated successfully'});
    })
})

// deleting an item from the todoList
app.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;

    try {
        try {
            const newTodo = await pool.query("SELECT * FROM todo where id = $1", [id]);
            res.json({msg:'okay', 'result': newTodo.rows[0]});
        } catch (err) {
            res.json({msg:'bad', 'result':err});
        }
    } catch (err) {
        res.json({msg:'bad', 'result':'A try and catch error', err});
    }
})



// connect to the database and then allow express to receive request
pool.connect((err: any, client: any, release: () => void) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }

    app.listen(port, () => {
        console.log(`now listening to request from port ${port}`)
    })

    release()
})

