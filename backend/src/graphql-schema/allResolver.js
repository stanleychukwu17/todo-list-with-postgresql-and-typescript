const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema} = graphql
const {getOneTodo} = require('./todo.js')

const RootQuery = new GraphQLObjectType({
    'name':'RootQueryType',
    fields: {
        getOneTodo
    }
})

module.exports = new GraphQLSchema({
    'query': RootQuery
})