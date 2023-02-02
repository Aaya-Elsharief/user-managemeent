import { Response, NextFunction } from "express";
import { CustomError, verifyToken } from "../utils"

const userAuth = async (req: any, res: Response, next: NextFunction) => {
   try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token) throw new CustomError(401, 'not authorize');
      const verified = await verifyToken(token)
      req.user = verified;
      if(req.user.role !== 'user')throw new Error();
      next();
   } catch (error) {
      res.status(401).send({ message: 'not authorize' });
   }

}

export default userAuth;