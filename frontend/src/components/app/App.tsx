import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {updateLoggedIn} from '../../redux/userSlice'


// importing of components
import './App.scss';
import rocket from '../../images/rocket.jpg'
import {Input} from '../input/Input'
import {TodoEch} from '../todo/TodoEch'


function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    let {loggedIn, name, token} = useAppSelector((state)=> state.user)
    let dts1 = window.localStorage.getItem('todoUserDts')

    // if the user is not logged in, we check the localStorage to see if there are any stored details(i.e the user name and token)
    if (dts1 && dts1.length > 0 && !loggedIn) {
        let dts2 = JSON.parse(dts1)
        dispatch(updateLoggedIn(dts2))
        loggedIn = true
    }

    // take this user to loginPage user is not logged in
    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login')
        }
    }, [loggedIn, navigate])


    return (
        <div className="AppMain">
            <div className='AppMain__Header'>
                <div>
                    <div><h1>A Todo List</h1></div>
                    <div className='AppPrf_name'>
                        <span>{name}</span>
                        <button onClick={() => navigate('/logout')}>Logout</button>
                    </div>
                </div>
                <div className='AppPrf_img'>
                    <img src={rocket} alt="" />
                </div>
            </div>
            <Input />
            <div className="AppMain__EchT">
                <div className="EchT1">Description</div>
                <div className="EchT2">Edit</div>
                <div className="EchT3">Delete</div>
            </div>
            <div className="AppShow__EchT">
                <TodoEch />
            </div>
        </div>
    );
}

export default App;
