const pool = require('../db') // database connection
import bcrypt from "bcrypt";

// registers a new user
type registerProps = {name: string, email: string, password: string, passwordConfirmation: string}
export async function registerNewUser({name, email, password, passwordConfirmation}: registerProps) {
    if (password !== passwordConfirmation) {
        return {'msg':'error', 'cause':'Password missMatch'}
    }

    // checks to see if the user already exists
    const exists = await pool.query("SELECT id from users WHERE email = $1 LIMIT 1", [email])
    if (exists.rowCount > 0) {
        // res.status(401)
        return {'msg':'error', 'cause':'This user already exists'}
    }

    // hashes the password using bcrypt
    const saltWorkFactor = 10;
    const salt = await bcrypt.genSalt(saltWorkFactor);
    const hash = await bcrypt.hashSync(password, salt);

    const newTodo = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hash])
    // console.log(newTodo.rows[0])
}

// fetches the record of a user using the user id
export async function getThisUserDts (id: number) {
    const userDts = pool.query("SELECT name, email, password from users where id = $1", [id])
    return userDts.rows[0];
}