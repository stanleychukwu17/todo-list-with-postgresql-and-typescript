import {Express, Request, Response} from 'express';
import {
    getAllTodoHandler, getOneToDoHandler, addNewTodoHandler,
} from './controller/todo.controller'

export default function (app: Express) {

    // get all the todo's
    app.get('/todo', getAllTodoHandler)

    // get just one request
    app.get('/todo/:id', getOneToDoHandler)

    // creating/adding a new todo
    app.post('/todo', addNewTodoHandler)
}
