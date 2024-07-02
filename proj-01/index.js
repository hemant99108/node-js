const express=require('express');
const fs=require('fs');
const app=express();
const PORT=8000;
const {connectMongoDb}=require('./connection');
const {logReqRes}=require('./middlewares');

const userRouter=require('./routes/user')

//connect the application with the database
connectMongoDb('mongodb://localhost:27017/localapp-1')
.then(()=>console.log("mongo connection successful!"));

//Middleware ---: Plugin like functions 
app.use(express.urlencoded({extended:false}));

//middlewares can forward,or return or can call the next middlewaers inthe program 
//use the next to call the next middleware or the route made 

app.use((req,res,next)=>{
    console.log("hello from middle 2");
    // return res.json({msg:"hello from middleware 2 call next to move to routes"});
    next();
})

const users=require('./MOCK_DATA.json');
const { type } = require('os');
const { timeStamp } = require('console');

app.use(logReqRes('log.txt'));

app.use('/api/users',userRouter);



app.listen(PORT,()=>console.log(`server started! @ ${PORT}`));

