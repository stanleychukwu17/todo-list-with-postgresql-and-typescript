const graphql = require('graphql');
const {
    GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull,
    GraphQLList
} = graphql;
const {
    logUserInHandler
} = require('../service/user.service')


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
        return logUserInHandler()
    }
}
//--END--