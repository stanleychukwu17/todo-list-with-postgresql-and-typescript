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

