import { gql } from '@apollo/client';

const LOGIN_THIS_USER_MUTATION = gql`
    mutation loginThisUser($email: String!, $password: String!) {
        loginThisUser(email: $email, password: $password) {
            msg
            cause
            token
        }
    }
`;

export { LOGIN_THIS_USER_MUTATION };