import express from 'express'
require('dotenv').config()

import routes from './routes'
import log from './logger/'
const {graphqlHTTP} = require('express-graphql')
const {ObjectId} = require('mongodb');
const pool = require('./db') // database connection


//* creates an express app
const port = process.env.PORT || 4000
const app = express();
app.use(express.json());



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
            const newTodo = await pool.query("DELETE FROM todo where id = $1", [id], (err: any, result: any) => {
                if (err) { res.json({msg:'bad', 'result':err}); }
            });

            res.json({msg:'okay', 'result':'Todo item deleted from our list', newTodo});
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
        return log.info('Error acquiring client', err.stack)
    }

    app.listen(port, () => {
        console.log(`now listening to request from port ${port}`)
        routes(app)
    })

    release()
})

