
import bcrypt from 'bcryptjs'
import {SignJWT, jwtVerify} from 'jose'

export const verifyPassword = async (enteredPassword,storedHash) => {
  return  bcrypt.compare(enteredPassword,storedHash)
}


export const createToken = async () => {
  const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
    const token = await new SignJWT({
        role:"admin"
    })
    .setProtectedHeader({
        alg:'HS256'
    })
    .setExpirationTime('7d')
    .sign(secret)
    return token

}


export const verifyToken = async (token) => {
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    return await jwtVerify(token,secret)
    
}