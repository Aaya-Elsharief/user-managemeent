import User from "../models";
import { userInterface } from "../utils";

const createUser = async({username, email, password, age}: userInterface)=>{
   
   try{
        const user = await User.create({
            username,
            email,
            password,
            age
        })
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }

}

export default createUser;