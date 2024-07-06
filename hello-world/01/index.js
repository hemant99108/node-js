const express=require('express');
const db=require('./mongo');
const app=express();
const person=require('./models/person');
const bodyParser=require('body-parser');
const passport=require('./auth');

app.use(express.urlencoded({extended:false}));


//menu item model for the menu list of the hotel 
const menu=require('./models/menu');


app.use(bodyParser.json()); //stores the data in req.body ,data was sent using  post method 


//middleware functions 
// const logRequest=(req,res,next)=>{
//     console.log(`${new Date().toLocaleString} req made to : ${req.originalUrl}`);
//     next();
// };
// //apply it to the all routes present in the appp
// app.use(logRequest);

//for authentication
const localAuthMiddleware=passport.authenticate('local',{session:false});

app.get('/',(req,res)=>{
    res.send("Welcome To  Hotel world");
});

//import and use the routes defined for the /person
const personRoute=require('./routes/personRoutes');
app.use('/person',personRoute);



const menuRouter=require('./routes/menuRoutes');
app.use('/menu',menuRouter);



app.listen(3000,()=>console.log("server started at :3000"));