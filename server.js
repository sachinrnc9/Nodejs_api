
import express from 'express';
import mongoose from 'mongoose'
import userRouter from './Routers/user.js'
import contctRouter from './Routers/contact.js'
import bodyParser from 'body-parser';

import { config } from 'dotenv';

config({path:'.env'})

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URL,{
    dbName:"Nodejs_course"
}).then(()=>console.log("Mongo db connected....")).catch((err)=>console.log(err))

//api for user route
app.use('/api/user',userRouter);
//api for contact route to insert data
app.use('/api/contact',contctRouter);

app.use((req,res)=>res.send('Invalid Request'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
