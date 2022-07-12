import {graphql} from 'graphql'
const {GraphQLObjectType, GraphQLString, GraphQLInt} = graphql

export const todoType = new GraphQLObjectType({
    'name':'Todo',
    'fields': () => ({
        'id': {type: GraphQLInt},
        'description': {type: GraphQLString}
    })
})


export const getOneTodo = {
    type: todoType,
    args: {
        id: {type: GraphQLInt}
    },
    resolve(parents, args) {
        return {'id':1, 'description':'See the book is here'}
    }
}