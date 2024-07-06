const express=require('express');
const app=express();
const db=require('./mongo');



const bodyParser=require('body-parser');
app.use(bodyParser.json());

const PORT=3000;


const userRoutes=require('./routes/userRoutes');
app.use('/user',userRoutes);


const candidateRoutes=require('./routes/candidateRoutes');
app.use('/candidate',candidateRoutes);   

app.listen(PORT,()=>{

    console.log('listening on : 3000');

});