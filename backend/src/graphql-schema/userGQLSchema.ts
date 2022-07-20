const graphql = require('graphql');
const {
    GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull,
    GraphQLList
} = graphql;
import {
    logUserInHandler
} from '../service/user.service'


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
// for login of users
const loginThisUser = {
    type: loginType,
    args: {
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    },
    resolve(parents: any, args: any) {
        return logUserInHandler({email:args.email, password:args.password})
    }
}
// const loginThisUser = {
//     type: loginType,
//     resolve(parents: any, args: any) {
//         return logUserInHandler({email:'stanley', password:'chukwu'})
//     }
// }
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
