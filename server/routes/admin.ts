import { Router } from 'express';
import { signup, login, allUsers } from '../controllers';
import {adminAuth} from '../middlewares'

const adminRouter = Router();

adminRouter.post('/signup', signup)
adminRouter.post('/login', login)
adminRouter.get('/users',adminAuth,  allUsers)

export default adminRouter;

