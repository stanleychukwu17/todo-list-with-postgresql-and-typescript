const graphql = require('graphql');
const {GraphQLObjectType, GraphQLSchema} = graphql;
const {
    getOneTodoQuery, getAllTodoQuery, addNewTodoQuery, updateTodoQuery
} = require('./todoGQLSchema');
const {
    loginThisUser
} = require('./userGQLSchema');

const RootQuery = new GraphQLObjectType({
    'name':'RootQueryType',
    fields: {
        getOneTodoQuery,
        getAllTodoQuery
    }
})

const mutation = new GraphQLObjectType({
    'name':'Mutation',
    fields: {
        addNewTodoQuery,
        updateTodoQuery,
        loginThisUser
    }
})

module.exports = new GraphQLSchema({
    'query': RootQuery,
    mutation
});
export {}; // coverts this file to an ES module
