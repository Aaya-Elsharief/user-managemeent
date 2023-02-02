import { Response } from "express";
import { User } from "../../models";
import { CustomError } from '../../utils'

const profile = async (req: any, res: Response) => {

    try {
        const user = await User.findById(req.user.id).select({ 'username': 1, 'email': 1, 'age': 1, '_id': 0 })
        res.json(user)

    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.status).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'Internal server error' });
        }
    }
}

export default profile;