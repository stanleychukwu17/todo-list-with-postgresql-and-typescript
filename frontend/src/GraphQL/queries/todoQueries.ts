import { gql } from "@apollo/client";

const GET_ALL_OF_THIS_USER_TODO_ITEMS = gql`
    query getAllTodoQuery($token: String!) {
        getAllTodoQuery(token: $token) {
            id
            description
        }
    }
`

export {
    GET_ALL_OF_THIS_USER_TODO_ITEMS
}