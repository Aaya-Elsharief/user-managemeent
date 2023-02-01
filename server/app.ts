import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import router from './routes'
import dotenv from 'dotenv'
import connectionDb from './database/connection'
dotenv.config()


const app = express()
connectionDb();

app.set('port', process.env.PORT || 3000)

app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1', router);


export default app;
