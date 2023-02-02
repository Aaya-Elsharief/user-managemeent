import { User, Admin } from "../models";
import { userInterface } from "../utils";

const createNew = async (role: string, { username, email, password, age }: userInterface) => {

    try {
        const newOne = await role==='user' ? 
                User.create({username,email,password,age}) :
                Admin.create({username,email,password})


        return Promise.resolve(newOne);
    } catch (error) {
        return Promise.reject(error);
    }

}

export default createNew;