import { Request, Response } from "express";
import { User } from "../../models";

const allUsers = async (req: Request, res: Response) => {
    const { page, limit, username, email } = req.body;

    const filter = []
    if (username) filter.push({ username: username })
    if (email) filter.push({ email: email })
    console.log('filter: ', [...filter]);
    const users = await User.find({ $or: [...filter] }, { username: 1, email: 1, age: 1, })
        .skip((email | username) ? 0 : ((page - 1) * limit)).limit(limit)
    res.send(users)
}

export default allUsers;

