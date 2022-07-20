import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

// import what is needed for redux
import {updateLoggedIn} from '../../redux/userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

// importing the stylesheet
import './LoginPage.scss';

// importing of types
import type {logInUserProps} from  './loginPage.d'

// importing of mutations and queries
import {LOGIN_THIS_USER_MUTATION} from '../../GraphQL/mutations/userMutations'


export default function LoginPage() {
    const [logEmail, setLogEmail] = useState<string>('chukwu@gmail.com')
    const [logPass, setLogPass] = useState<string>('missmetoday')
    const loggedIn = useAppSelector((state)=> state.user.loggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    //
    if (loggedIn) {
        console.log('show home page')
    }

    // initiates the mutation functions
    const [loginThisUser, { data: data4login }] = useMutation(LOGIN_THIS_USER_MUTATION, {
        variables: {'email':logEmail, 'password':logPass }
    });

    // updates the token after successful log in
    useEffect(() => {
        // if the data is undefined, means the request to login has not been called
        if (!data4login) { return }

        // destructure the values returned from the graphql request
        const {msg, token, name, cause} = data4login.loginThisUser

        if (msg === 'okay') {
            navigate('/') // back to the home page
            dispatch(updateLoggedIn({token, name}))  // update the redux state to reflect the user has logged in
        } else {
            alert(cause)
        }
    }, [data4login, dispatch, navigate])

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