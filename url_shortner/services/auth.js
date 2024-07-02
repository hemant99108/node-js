

// const sessionIdtoUserMap=new Map();
//we will use stateless token now 

const jwt =require('jsonwebtoken');
const secret="hello@world";

function setUser(user){
    // sessionIdtoUserMap.set(id,user);
   
    //token assignment  to user 
    return jwt.sign({
        _id:user._id,
        email:user.email,   
    },secret);    
}


function getUser(token){
    if(!token) return null;

   try{
    return jwt.verify(token,secret);
   }
   catch(err){
    return null;
   }
}



module.exports={
    setUser,
    getUser,
         
}