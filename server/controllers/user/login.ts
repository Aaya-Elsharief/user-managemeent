import { Request, Response } from "express"
import  {compare} from "bcryptjs"
import User from "../../models";
import { userInterface , CustomError, generatToken} from "../../utils"


const login = async(req: Request, res: Response) => {
   try{
    const {username, password}: userInterface = req.body;

    const user = await User.findOne({username})
    if(!user) throw new CustomError(401, 'invalid username')

    const match = await compare(password, user.password)
    if(! match) throw new CustomError(401, 'invalid password')

    const  token =  await generatToken(user.id)
    res.cookie("token", token).send({"token" : token})
    
   }catch(error){
        if (error instanceof CustomError) {
        res.status(error.status).send({ message: error.message });
    }else{
        res.status(500).send({ message: 'Internal server error'});
    }
   } 
}

export default login