import { Router } from 'express';
import signup from '../controllers';

const userRouter = Router();

userRouter.post('/signup', signup)

export default userRouter;

