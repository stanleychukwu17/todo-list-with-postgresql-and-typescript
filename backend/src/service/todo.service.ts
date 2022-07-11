const pool = require('../db') // database connection

// gets all the todo's
export async function getAllTodo() {
    try {
        const todo = await pool.query("SELECT * from todo")
        return todo
    } catch (error: any) {
        throw new Error(error);
    }
}

// gets just one todo item
export async function getOneTodo(id: number) {
    try {
        const todo = await pool.query("SELECT * from todo where id = $1 LIMIT 1", [id])
        return todo
    } catch (error: any) {
        throw new Error(error);
    }
}