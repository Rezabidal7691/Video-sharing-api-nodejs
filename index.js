import express from 'express'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// Routes
import Routes from './routes/index.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;


const connect = ()=>{
       mongoose.connect(mongoUrl )
              .then(()=>{
                     console.log('Connected to DB');
              })
              .catch(err=>{
                     throw err;
              })
}
app.use(cookieParser())
app.use(express.json())
app.use('/api' , Routes)

app.use((err , req, res , next)=>{
       const status = err.status || 500;
       const message = err.message || 'Somthing went wrong!'
       res.status(status).json({
              success : false ,
              status ,
              message
       })
})

app.listen(PORT , ()=>{
       connect()
       console.log(`Server is running on port ${PORT}`);
})