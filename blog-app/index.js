const express =require("express");
const path=require('path');
const { execPath } = require("process");
const mongoose=require('mongoose');

const userRoute=require('./routes/user');

const app=express();
const PORT=8000;
//connecting mongo db 
mongoose.connect('mongodb://localhost:27017/blogger')
.then(()=>console.log("mongo connected!"));

app.set('view engine','ejs');
app.set('views',path.resolve('./views')); 
app.use(express.urlencoded({extended:false}));  

app.get('/',(req,res)=>{
    res.render('home');
})


app.use('/user',userRoute);

app.listen(PORT,()=>console.log("running @:8000"));

    