import { Router } from 'express';
import { signup, login, profile, updateProfile } from '../controllers';
import userAuth from '../middlewares'

const userRouter = Router();

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get('/profile', userAuth, profile)
userRouter.put('/profile', userAuth, updateProfile)
export default userRouter;

