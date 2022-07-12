import {graphql} from 'graphql'
const {GraphQLObjectType, GraphQLString, GraphQLInt} = graphql
import {getOneTodo} from './todo'

const RootQuery = new GraphQLObjectType({
    'name':'RootQueryType',
    fields: {
        getOneTodo
    }
})