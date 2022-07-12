const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema} = graphql;
const {
    getOneTodo, getAllTodo
} = require('./todo');

const RootQuery = new GraphQLObjectType({
    'name':'RootQueryType',
    fields: {
        getOneTodo,
        getAllTodo
    }
})

module.exports = new GraphQLSchema({
    'query': RootQuery
});
export {}; // coverts this file to an ES module
