import { Request, Response } from "express"
import { hash } from "bcryptjs"
import { validation, userInterface, CustomError } from "../../utils"
import { checkUser, createNew } from "../../queries"

const signup = async (req: Request, res: Response) => {
  try {

    let role: string;
    req.originalUrl.includes('/user/') ? role = 'user' : role = 'admin';

    const { username, email, password, age }: userInterface = req.body
    await validation(role, null, { username, email, password, age })

    const { nameCheck, emailCheck } = await checkUser(role, username, email);
    if (nameCheck) throw new CustomError(409, 'username already exist');
    if (emailCheck) throw new CustomError(409, 'email already exist');

    const hashedPassword = await hash(password, 12);

    await createNew(role, { username, email, password: hashedPassword, age });

    res.send(`${role} created successfully`)

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

export default signup;