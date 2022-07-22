const graphql = require('graphql');
const {
    GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull,
    GraphQLList
} = graphql;
import {
    getAllTodo, getOneTodo, addNewTodo, updateATodo, deleteATodo
} from '../service/todo.service'

// creates the todoType
const todoType = new GraphQLObjectType({
    'name':'Todo',
    'fields': () => ({
        'id': {type: GraphQLInt},
        'description': {type: GraphQLString},
        'msg': {type: GraphQLString}
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
    args: {
        token: {type: GraphQLNonNull(GraphQLString)}
    },
    resolve(parents: any, args: any) {
        return getAllTodo(args.token)
    }
}
//--END--

//--START-- Mutations
// Adding a new todo to the list of todo's'
const addNewTodoQuery = {
    type: todoType,
    args: {
        description: {type: GraphQLNonNull(GraphQLString)},
        token: {type: GraphQLNonNull(GraphQLString)}
    },
    resolve(parents: any, args: any) {
        return addNewTodo(args.description, args.token);
    }
}

// updating a todo
const updateTodoQuery = {
    type: todoType,
    args: {
        id: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        token: {type: GraphQLNonNull(GraphQLString)},
    },
    resolve(parents: any, args: any) {
        return updateATodo({id: args.id, description: args.description, token: args.token, getResult:'yes'})
    }
}

// deleting a todo
const deleteATodoQuery = {
    type: todoType,
    args: {
        id: {type: GraphQLNonNull(GraphQLString)}
    },
    resolve(parents: any, args: any) {
        deleteATodo(args.id)
        return {id: args.id, description: ''}
    }
}
//--END--


module.exports = {
    todoType, getOneTodoQuery, getAllTodoQuery,
    addNewTodoQuery, updateTodoQuery
}

/**
 * the below line is to solve an error caused by typescript that wouldn't let me import graphql and  {GraphQLObjectType, GraphQLString, GraphQLInt} = graphql;
 * telling me typescript-cannot-redeclare-block-scoped-variable
 * read this article - https://bobbyhadz.com/blog/typescript-cannot-redeclare-block-scoped-variable
*/
export {}
