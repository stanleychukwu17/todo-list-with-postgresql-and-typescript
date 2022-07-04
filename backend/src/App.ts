import express from 'express'
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql')
const {ObjectId} = require('mongodb');
const pool = require('./db') // import {connectToDb, getDb} from './db'


//* creates an express app
const port = process.env.PORT || 4000
const app = express();
app.use(express.json());


// creating/adding a new todo
app.post('/todo', async(req, res) => {
    try {
        const {description} = req.body;

        try {
            const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);
            res.json({msg:'okay', 'result': newTodo.rows[0]});
        } catch (err) {
            console.log(err);
            return {'msg':'bad', 'cause':err}
        }

    } catch (err) {
        console.log(err)
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

