import { Request, Response } from "express";
import log from '../logger/'
import {
    getAllTodo, getOneTodo, addNewTodo, updateATodo, deleteATodo
} from '../service/todo.service'
import {
    show_error_msg,
    show_good_msg
} from "../service/general.service";

// gets all of the todo's
export async function getAllTodoHandler (req: Request, res: Response) {
    try {
        const allTodo: any = await getAllTodo()
        return show_good_msg({'result':allTodo, res})
    } catch (err: any) {
        return show_error_msg({'result':err.message, res})
    }
}

// returns just one todo item
export async function getOneToDoHandler (req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (id <= 0) {
            const errMsg = 'Invalid id provided'
            return res.json({msg:'bad', 'cause':errMsg});
        }

        const oneTodo: any = await getOneTodo(id)
        return show_good_msg({'result':oneTodo, res})
    } catch (err: any) {
        return show_error_msg({'result':err.message, res})
    }
}

// adds a new todo to the list of todo's
export async function addNewTodoHandler (req: Request, res: Response) {
    const {params, body, query} = req

    try {
        const {description} = req.body;
        const newTodo = await addNewTodo(description)
        return show_good_msg({'result':newTodo.rows[0], res})
    } catch (err: any) {
        return show_error_msg({'result':err.message, res})
    }
}

// updates an item in the todoList
export async function updateATodoIHandler (req: Request, res: Response) {
    const id = Number(req.params.id);
    const {description} = req.body;

    const update = await updateATodo({id, description})
    return show_good_msg({'result':'Successfully updated', res})
}

// for deleting an item in the todoList
export async function deleteATodoHandler (req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
        const deletedTodo = await deleteATodo(id)
        show_good_msg({'result':'Todo item deleted from our list', res})
    } catch (err: any) {
        show_error_msg({'result':err, res})
    }
}