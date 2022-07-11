const pool = require('../db') // database connection

export async function getAllTodo() {
    try {
        const todo = await pool.query("SELECT * from todo")
        return todo
    } catch (error: any) {
        throw new Error(error);
    }
}
