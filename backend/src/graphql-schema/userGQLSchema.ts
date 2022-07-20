const graphql = require('graphql');
const {
    GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull,
    GraphQLList
} = graphql;
import {
    logUserInHandler
} from '../service/user.service'

console.log(logUserInHandler, typeof logUserInHandler)

// creates the userType
const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        'id':{type: GraphQLInt},
        'name':{type: GraphQLString},
        'email':{type: GraphQLString},
        'last_seen': {type: GraphQLString}
    })
})

// the loginType
const loginType = new GraphQLObjectType({
    name: 'Login',
    fields: () => ({
        'msg':{type: GraphQLString},
        'cause':{type: GraphQLString},
        'token':{type: GraphQLString}
    })
})

//--START-- Resolvers

//--END--

//--START-- Mutations
const loginThisUser = {
    type: loginType,
    args: {
        email: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)}
    },
    resolve(parents: any, args: any) {
        return logUserInHandler({email:args.email, password:args.password})
    }
}
//--END--


module.exports = {
    loginThisUser
}

/**
 * the below line is to solve an error caused by typescript that wouldn't let me import graphql and  {GraphQLObjectType, GraphQLString, GraphQLInt} = graphql;
 * telling me typescript-cannot-redeclare-block-scoped-variable
 * read this article - https://bobbyhadz.com/blog/typescript-cannot-redeclare-block-scoped-variable
*/
export {}
