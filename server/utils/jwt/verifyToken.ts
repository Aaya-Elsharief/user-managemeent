import { Secret, verify } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const {SECRET_KEY : SECRET_KEY}  = process.env;

const verifyToken = async(token: string) => {
    return await verify(token, SECRET_KEY as Secret)
}

export default verifyToken;