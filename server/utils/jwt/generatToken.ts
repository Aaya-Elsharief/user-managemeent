import { Secret, sign } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const {SECRET_KEY : SECRET_KEY}  = process.env;

const generatToken = async(id: string) => {
    return await sign({id}, SECRET_KEY as Secret)
}

export default generatToken;