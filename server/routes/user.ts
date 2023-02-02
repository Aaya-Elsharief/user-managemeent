import { Router } from 'express';
import {signup, login, profile} from '../controllers';
import userAuth from '../middlewares'

const userRouter = Router();

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get('/profile',userAuth, profile)
export default userRouter;

