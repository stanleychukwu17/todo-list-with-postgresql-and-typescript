import jwt from 'jsonwebtoken'
import {Secret} from 'jsonwebtoken' // used for typescript types
require('dotenv').config()

// generates a token for sign a user into the website
export function jwtGenerator(userId: number) {
    const payload = {userId}
    const secret = process.env.jwtSecret as Secret

    // the line below generates a token
    const token = jwt.sign(payload, secret, {expiresIn: '3hr'})
    return token
}