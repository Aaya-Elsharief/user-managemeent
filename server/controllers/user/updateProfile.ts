import { Response } from "express";
import { User } from "../../models";
import { userInterface, validation, CustomError } from "../../utils";

const updateProfile = async (req: any, res: Response) => {
    try {
        const id = req.user.id;

        const { username, email, age }: userInterface = req.body
        await validation('user', 'upate', { username, email, age, password: "" })

        const emailExist = await User.findOne({ email, _id: { $ne: id } });
        const usernameExist = await User.findOne({ username, _id: { $ne: id } });
        if (emailExist) throw new CustomError(409, 'email already exist');
        if (usernameExist) throw new CustomError(409, 'username already exist');

        await User.findByIdAndUpdate(id, {
            $set: { username, email, age, updatedAt: Date.now() }
        })

        res.status(200).send('User profile updated successfully')

    } catch (error) {
        if (error instanceof Error)
            res.status(400).send({ message: error.message });
        else if (error instanceof CustomError) {
            res.status(error.status).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'internal server error' });
        }
    }
}


export default updateProfile;