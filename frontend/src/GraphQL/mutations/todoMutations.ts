import { gql } from '@apollo/client';

const ADD_THIS_ITEM_TO_THIS_USER_TODO_LIST = gql`
    mutation addNewTodoQuery($description: String!, $token: String!) {
        addNewTodoQuery(description: $description, token: $token) {
            id
            description
        }
    }
`;

const UPDATE_THIS_TODO_ITEM = gql`
    mutation updateTodoQuery($id: String!, $description: String!, $token: String!) {
        updateTodoQuery(id: $id, description: $description, token: $token) {
            id
            description
        }
    }
`;

export {
    ADD_THIS_ITEM_TO_THIS_USER_TODO_LIST,
    UPDATE_THIS_TODO_ITEM
};