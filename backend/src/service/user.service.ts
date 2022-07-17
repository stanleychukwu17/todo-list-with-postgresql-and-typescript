const pool = require('../db') // database connection
import bcrypt from "bcrypt";
const omit = require('lodash').omit
import {jwtGenerator} from '../service/jwtGenerator'

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

    // saves the new user to the database
    const newTodo = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hash])
    const userDts = omit(newTodo.rows[0], 'password')
    const newUserId = userDts.id;

    // creates the user token using jwt
    const token = jwtGenerator(newUserId)
    return {'msg':'okay', token:token, userDts}
}

// fetches the record of a user using the user id
type f_props = {identity:number | string, toUse:'id'|'email'}
export async function getThisUserDts (dts: f_props) {
    const userDts = await pool.query(`SELECT id, name, email, password from users where ${dts.toUse} = $1`, [dts.identity])
    return userDts;
}

// login a user
type loginProps = {email: string, password: string}
export async function logUserInHandler ({email, password: receivedPassword}: loginProps) {
    // first of all, we check to see if the user exist's on the database
    const userDts = await getThisUserDts({'identity':email, 'toUse':'email'})
    const found = userDts.rowCount || 0

    // if <= 0, it means the user does not exist or the email received is inValid
    if (found <= 0) {
        // res.status(401).json({'msg':'bad', 'cause':'No user found with this email address'})
        return {'msg':'bad', 'cause':'No user found with this email address'}
    }

    // compare the password received to see if the match
    const {id:userId, password:userPassword} = userDts.rows[0]
    const validPassword = await bcrypt.compare(receivedPassword, userPassword)
    if (!validPassword) {
        return {'msg':'bad', 'cause':'InValid password received'}
    }

    const token = jwtGenerator(userId)
    return {'msg':'okay', token:token}
}