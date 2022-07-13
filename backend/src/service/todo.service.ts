const pool = require('../db') // database connection

export async function getAllTodo() {
    try {
        const todo = await pool.query("SELECT * from todo")
        return todo.rows
    } catch (error: any) {
        throw new Error(error);
    }
}

// gets just one todo item
export async function getOneTodo(id: number) {
    try {
        const todo = await pool.query("SELECT * from todo where id = $1 LIMIT 1", [id])
        return todo.rows[0]
    } catch (error: any) {
        throw new Error(error);
    }
}

// adds a new item to the todo list
export async function addNewTodo (description: string) {
    try {
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
        return newTodo.rows[0]
    } catch (error: any) {
        throw new Error(error);
    }
}

// updates an item in the todo list
type updateType = { id: number, description: string, getResult?: 'yes' | 'no' }
export async function updateATodo ({id, description, getResult}: updateType) {
    const update = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id], (err: any, result: any) => {
        if (err) {
            throw new Error(err);
        }
        return result;
    })

    if (getResult === 'yes') {
        const newTodo = await getOneTodo(id)
        return newTodo
    } else {
        return {msg:'okay', 'result': 'Todo updated successfully'}
    }
}

// for deleting an item in the todoList
export async function deleteATodo (id: number) {
    try {
        const newTodo = await pool.query("DELETE FROM todo where id = $1", [id], (err: any, result: any) => {
            if (err) { throw new Error(err); }
        });
        return newTodo
    } catch (error: any) {
        throw new Error(error);
    }
}