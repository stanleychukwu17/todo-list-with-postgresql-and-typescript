const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema} = graphql;
const {
    getOneTodoQuery, getAllTodoQuery
} = require('./todo');

const RootQuery = new GraphQLObjectType({
    'name':'RootQueryType',
    fields: {
        getOneTodoQuery,
        getAllTodoQuery
    }
})

module.exports = new GraphQLSchema({
    'query': RootQuery
});
export {}; // coverts this file to an ES module
