import {Express, Request, Response} from 'express';
import {
    getAllTodoHandler, getOneToDoHandler, addNewTodoHandler, updateATodoIHandler, deleteATodoHandler
} from './controller/todo.controller'

import {regUserHandler} from './controller/user.controller'

export default function (app: Express) {
    //--START-- the todo routes
    // get all the todo's
    app.get('/todo', getAllTodoHandler)

    // get just one request
    app.get('/todo/:id', getOneToDoHandler)

    // creating/adding a new todo
    app.post('/todo', addNewTodoHandler)

    // updating an item from the todoList
    app.put('/todo/:id', updateATodoIHandler)

    // deleting an item from the todoList
    app.delete('/todo/:id', deleteATodoHandler)
    //--END--

    //--START-- the user routes
    app.post('/user/register', regUserHandler)
    //--END--
}
