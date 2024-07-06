const mongoose=require('mongoose');

const mongoUrl='mongodb://localhost:27017/hello-world';

mongoose.connect(mongoUrl);


//get the default connection 
//mongoose maintain a default connection object representing the default mongodb connection 

const db=mongoose.connection;


//defining the event listeners 

db.on('connected',()=>{
    console.log("connection successful");
});

db.on('error',()=>{
    console.log("error while connecting ");
});

db.on('disconnected',()=>{
    console.log("disconnected mongodb");    
})


module.exports=db;

