const express=require('express');
const db=require('./mongo');
const app=express();
const person=require('./models/person');
const bodyParser=require('body-parser');

//menu item model for the menu list of the hotel 
const menu=require('./models/menu');


app.use(bodyParser.json()); //stores the data in req.body ,data was sent using  post method 


app.get('/',(req,res)=>{
    res.send("Hotel world");
});

//import and use the routes defined for the /person
const personRoute=require('./routes/personRoutes');
app.use('/person',personRoute);



const menuRouter=require('./routes/menuRoutes');
app.use('/menu',menuRouter);



app.listen(3000,()=>console.log("server started at :3000"));