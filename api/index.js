import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import bodyParser from 'body-parser';

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log(err);
})

const app = express()

app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

app.listen(3000, ()=>{
    console.log(`Server is running on port 3000!`);
})