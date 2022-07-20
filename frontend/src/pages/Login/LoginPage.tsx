import { useState } from 'react';


// importing the stylesheet
import './LoginPage.scss';

// importing of types
import type {logInUserProps} from  './loginPage.d'

export default function LoginPage() {
    const [logEmail, setLogEmail] = useState<string>('')
    const [logPass, setLogPass] = useState<string>('')

    // the function that logs the user in
    const logThisUserIn = async (obj: logInUserProps) => {
        
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
                        logThisUserIn({logEmail, logPass})
                    }}>Done</button>
                </div>
            </div>
        </div>
    )
}