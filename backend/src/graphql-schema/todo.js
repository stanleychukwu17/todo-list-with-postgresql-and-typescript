const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLInt} = graphql

const todoType = new GraphQLObjectType({
    'name':'Todo',
    'fields': () => ({
        'id': {type: GraphQLInt},
        'description': {type: GraphQLString}
    })
})


const getOneTodo = {
    type: todoType,
    args: {
        id: {type: GraphQLInt}
    },
    resolve(parents, args) {
        return {'id':1, 'description':'See the book is here'}
    }
}

module.exports = {todoType, getOneTodo}