import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { check_this_user_is_logged_in } from '../../utils/functions';

// importing the values needed for graphql queries
import { GET_ALL_OF_THIS_USER_TODO_ITEMS } from '../../GraphQL/queries/todoQueries';

// importing of types needed
import type {todoProps} from '../todo/TodoEch'

// importing of components
import './App.scss';
import rocket from '../../images/rocket.jpg'
import {Input} from '../input/Input'
import {TodoEch} from '../todo/TodoEch'


function App() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    let {loggedIn, name, token} = useAppSelector((state)=> state.user)
    const {error: errorTodo, data:todoItems, refetch} = useQuery(GET_ALL_OF_THIS_USER_TODO_ITEMS, {
        variables:{token}
    })

    // calls a utility function to see if the user is logged in
    if (!loggedIn) {
        loggedIn = check_this_user_is_logged_in({dispatch})
    }

    // take this user to loginPage user is not logged in
    useEffect(() => {
        if (!loggedIn) {
            return navigate('/login')
        }
    }, [loggedIn, navigate])

    // error from graphql request
    if (errorTodo) { alert(errorTodo.message) }

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

            <Input token={token} callBack={refetch} />

            <div className="AppMain__EchT">
                <div className="EchT1">Description</div>
                <div className="EchT2">Edit</div>
                <div className="EchT3">Delete</div>
            </div>
            <div className="AppShow__EchT">
                {todoItems && (
                    todoItems.getAllTodoQuery.map((todo1: todoProps, index: number) => {
                        return (<TodoEch key={todo1.id} todo={todo1} token={token} />)
                    })
                )}
                
            </div>
        </div>
    );
}

export default App;
