import { Request, Response } from "express"
import { compare } from "bcryptjs"
import { User, Admin } from "../../models";
import { userInterface, CustomError, generatToken } from "../../utils"


const login = async (req: Request, res: Response) => {
    try {
        let role: string;
        req.originalUrl.includes('/user/') ? role = 'user' : role = 'admin';

        const { username, password }: userInterface = req.body;

        const person = role === 'user' ?
            await User.findOne({ username }) :
            await Admin.findOne({ username })
        if (!person) throw new CustomError(401, 'invalid username')

        const match = await compare(password, person.password)
        if (!match) throw new CustomError(401, 'invalid password')

        const token = await generatToken(role, person.id)
        res.cookie("token", token).send({ "token": token })

    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}

export default login