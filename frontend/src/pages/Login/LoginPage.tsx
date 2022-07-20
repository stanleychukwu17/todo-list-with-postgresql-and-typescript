import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

// import what is needed for redux
import {updateLoggedIn} from '../../redux/userSlice'
import { useAppDispatch } from '../../redux/hooks';

// importing the stylesheet
import './LoginPage.scss';

// importing of types
import type {logInUserProps} from  './loginPage.d'

// importing of mutations and queries
import {LOGIN_THIS_USER_MUTATION} from '../../GraphQL/mutations/userMutations'

export default function LoginPage() {
    const [logEmail, setLogEmail] = useState<string>('')
    const [logPass, setLogPass] = useState<string>('')
    const dispatch = useAppDispatch()

    // initiates the mutation functions
    const [loginThisUser, { data: data4login }] = useMutation(LOGIN_THIS_USER_MUTATION, {
        variables: {'email':logEmail, 'password':logPass }
    });

    // updates the token after successful log in
    useEffect(() => {
        if (!data4login) { return }

        const {msg, token, name, cause} = data4login.loginThisUser
        if (msg === 'okay') {
            // update the redux state to reflect the user has logged in and send them back to home page
            dispatch(updateLoggedIn({token, name}))
        } else {
            alert(cause)
        }

    }, [data4login])
    
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