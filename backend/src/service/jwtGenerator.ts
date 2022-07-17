import jwt from 'jsonwebtoken'
import {Secret} from 'jsonwebtoken'
require('dotenv').config()

// generates a token for sign a user into the website
export function jwtGenerator(userId: number) {
    const payload = {userId}
    const secret = process.env.jwtSecret as Secret

    const token = jwt.sign(payload, secret, {expiresIn: '1hr'})
    return token
}