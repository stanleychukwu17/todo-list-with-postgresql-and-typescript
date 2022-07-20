import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

// importing the stylesheet
import './LoginPage.scss';

// importing of types
import type {logInUserProps} from  './loginPage.d'

// importing of mutations and queries
import {LOGIN_THIS_USER_MUTATION} from '../../GraphQL/mutations/userMutations'

export default function LoginPage() {
    const [logEmail, setLogEmail] = useState<string>('')
    const [logPass, setLogPass] = useState<string>('')

    // initiates the mutation functions
    const [loginThisUser, { data: tokenLogin, loading: loadingLogin }] = useMutation(LOGIN_THIS_USER_MUTATION, {
        variables: {'email':logEmail, 'password':logPass }
    });
    // const [loginThisUser, { data: tokenLogin, loading: loadingLogin }] = useMutation(LOGIN_THIS_USER_MUTATION);

    // updates the token after successful log in
    useEffect(() => {
      console.log(tokenLogin)

    }, [tokenLogin])
    
    // logs the user in
    const loginFunction = async (obj: logInUserProps) => {
        if (logEmail === '' || logPass === '') {
            return alert('Please fill in all fields');
        }

        loginThisUser();
        // console.log({
        //     variables: {
        //         email: logEmail,
        //         password: logPass
        //     }
        // })
    }

    return (
        <div className="LgP_cvr">
            <div className='LgP_hdr'>
                <div className='LgP_ht1'><h2>Login</h2></div>
                <div className='LgP_ht2'>or Register </div>
            </div>
            <div>
                <div className='LgpInpCvr'>
                    <div>Email:</div>
                    <div><input type="text" value={logEmail} onChange={ (e)=>{ setLogEmail(e.target.value) } } /></div>
                </div>
                <div className='LgpInpCvr'>
                    <div>Password</div>
                    <div><input type="password" value={logPass} onChange={ (e)=>{ setLogPass(e.target.value) } } /></div>
                </div>
                <div className='LgpBtn'>
                    <button onClick={async () => {
                        loginFunction({logEmail, logPass})
                    }}>Done</button>
                </div>
            </div>
        </div>
    )
}