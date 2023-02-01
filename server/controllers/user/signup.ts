import { Request, Response } from "express"
import { userValidation, userInterface, CustomError } from "../../utils"


const signup = async(req: Request , res: Response) => {
    try{
        const {username, email, password, age }: userInterface = req.body
        await userValidation({username, email, password, age })
        
        //check validation in db 
        //create new user in db

        res.send('Success')
    }catch (error) {
        const customError = new CustomError(400, 'Invalid Inserted Data');
        return res.status(customError.status).send({ message: customError.msg });    
    }

}

export default signup;