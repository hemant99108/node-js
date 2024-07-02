const express=require('express');

const path=require('path');
const cookieParser=require('cookie-parser');    
const {checkForAuthentication,restrictTo}=require('./middlewares/auth');

const urlRoute=require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user');



const PORT=8001;

const {connectMongo}=require('./connection');

const app=express();
const URL=require('./models/url');

connectMongo('mongodb://localhost:27017/urlshortner')
.then(()=>console.log("mongo connected!"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));


app.use('/url',restrictTo(['NORMAL','ADMIN']),urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);    

app.get('/url/:shortId',async(req,res)=>{
    const shortId=req.params.shortId;
    const entry= await URL.findOneAndUpdate({
        shortId
    },
   { $push:{
        visitHistory:{
            timestamps:Date.now(),
        },
          },}
    );

    res.redirect(entry.redirectURL);

})

app.listen(PORT,()=>console.log(`server started at: @${PORT}`));