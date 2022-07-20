import express from 'express'
require('dotenv').config()


//* creates an express app
const port = process.env.PORT || 4000
const app = express();
const cors = require('cors');
app.use(express.json());
// app.use(cors({
//     origin: ['http://localhost:3000/', 'https://www.google.com/']
// }));
app.use(cors());

import routes from './routes'
import log from './logger/'
const {graphqlHTTP} = require('express-graphql')
const pool = require('./db') // database connection for postgresSQL
const gqlSchema = require('./graphql-schema/allResolver') // graphql resolvers for both mutation and queries



//* creates the receiving end for graphQl api
app.use('/graphql', (req, res, next) => {
    console.log(req.body.query)
    console.log('next now')
    next()
})
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