import express from 'express'
require('dotenv').config()

import routes from './routes'
import log from './logger/'
const {graphqlHTTP} = require('express-graphql')
const pool = require('./db') // database connection
const gqlSchema = require('./graphql-schema/allResolver.js')

//* creates an express app
const port = process.env.PORT || 4000
const app = express();
app.use(express.json());

//* creates the receiving end for graphQl api
app.use('/graphql', graphqlHTTP({schema: gqlSchema, graphiql:true}))

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

