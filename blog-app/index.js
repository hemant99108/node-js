const express =require("express");
const path=require('path');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const Blog=require('./models/blog');

const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app=express();
const PORT=8000;
//connecting mongo db 
mongoose.connect('mongodb://localhost:27017/blogger')
.then(()=>console.log("mongo connected!"));

app.set('view engine','ejs');
app.set('views',path.resolve('./views')); 
app.use(express.urlencoded({extended:false}));  
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.get('/',async(req,res)=>{
    const allBlogs=await Blog.find({}).sort('createdAt',-1);

    res.render('home',{
        user:req.user,
        blogs:allBlogs,
    });
});


app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=>console.log("running @:8000"));

    