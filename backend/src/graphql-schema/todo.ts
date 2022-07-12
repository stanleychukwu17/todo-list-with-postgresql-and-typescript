const graphql = require('graphql');
const {
    GraphQLObjectType, GraphQLString, GraphQLInt,
    GraphQLList
} = graphql;

const todoType = new GraphQLObjectType({
    'name':'Todo',
    'fields': () => ({
        'id': {type: GraphQLInt},
        'description': {type: GraphQLString}
    })
})


//--START-- all of the belows are for resolvers
// for fetching of one item
const getOneTodo = {
    type: todoType,
    args: {
        id: {type: GraphQLInt}
    },
    resolve(parents: any, args: any) {
        return {'id':1, 'description':'See the book is here'}
    }
}

// for fetching all the todo's
const getAllTodo = {
    type: new GraphQLList(todoType),
    resolve(parents: any, args: any) {
        return [{'id':1, 'description':'See the book is here'}, {'id':2, 'description':'All the items are here now'}]
    }
}

module.exports = {todoType, getOneTodo, getAllTodo}

/**
 * the below line is to solve an error caused by typescript that wouldn't let me import graphql and  {GraphQLObjectType, GraphQLString, GraphQLInt} = graphql;
 * telling me typescript-cannot-redeclare-block-scoped-variable
 * read this article - https://bobbyhadz.com/blog/typescript-cannot-redeclare-block-scoped-variable
*/
export {}
