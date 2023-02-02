import { Router } from 'express';
import { signup, login } from '../controllers';
import userAuth from '../middlewares'

const adminRouter = Router();

adminRouter.post('/signup', signup)
adminRouter.post('/login', login)

export default adminRouter;

