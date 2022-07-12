const graphql = require('graphql');
const {
    GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLList
} = graphql;
import {
    getAllTodo,
    getOneTodo
} from '../service/todo.service'

// creates the todoType
const todoType = new GraphQLObjectType({
    'name':'Todo',
    'fields': () => ({
        'id': {type: GraphQLInt},
        'description': {type: GraphQLString}
    })
})


//--START-- Resolvers
// for fetching of one item
const getOneTodoQuery = {
    type: todoType,
    args: {
        id: {type: GraphQLInt}
    },
    resolve(parents: any, args: any) {
        return getOneTodo(args.id)
    }
}

// for fetching all the todo's
const getAllTodoQuery = {
    type: new GraphQLList(todoType),
    resolve(parents: any, args: any) {
        return getAllTodo()
    }
}
//--END--

//--START-- Mutations
//--END--


module.exports = {todoType, getOneTodoQuery, getAllTodoQuery}

/**
 * the below line is to solve an error caused by typescript that wouldn't let me import graphql and  {GraphQLObjectType, GraphQLString, GraphQLInt} = graphql;
 * telling me typescript-cannot-redeclare-block-scoped-variable
 * read this article - https://bobbyhadz.com/blog/typescript-cannot-redeclare-block-scoped-variable
*/
export {}
