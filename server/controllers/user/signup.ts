import { Request, Response } from "express"
import { hash } from "bcryptjs"
import { userValidation, userInterface, CustomError } from "../../utils"
import { checkUser, createUser} from "../../queries/"

const signup = async(req: Request , res: Response) => {
    try{
        const {username, email, password, age }: userInterface = req.body
        await userValidation({username, email, password, age })
             
        const {emailCheck,usernameCheck } = await checkUser(username,email);
        if (emailCheck) throw new CustomError(409, 'email already exist');
        if (usernameCheck) throw new CustomError(409, 'username already exist');

     
        const hashedPassword = await hash(password, 12);

        await createUser({username, email, password:hashedPassword, age} );
        res.send('User Created Successfully')

    }catch (error) {
        if (error instanceof Error)
            res.status(400).send({ message:  error.message });
        else if (error instanceof CustomError) {
          res.status(error.status).send({ message: error.message });
        } else {
          res.status(500).send({ message: 'internal server error' });
        }
    }

}

export default signup;