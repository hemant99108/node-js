const jwt =require('jsonwebtoken');
const SECRET=12345;

const jwtAuthMiddleware=(req,res,next)=>{

    //first check the req header has authorization or not 
    //as authorization field is automatically added while generating the token  
    const Authorization=req.headers.authorization;
    
    if(!Authorization) return res.status(401).json({error:'Invalid Token'});

    //extract the jwt token from the request header     
    const token =req.headers.authorization.split(' ')[1];//takes all after Bearer 

    if(!token) return res.status(401).json({error:'Unauthorized'});

    try {
        //just verify the token and obtain the payload 

        const decoded=jwt.verify(token,SECRET,{expiresIn:3000}); //30sec 

        //attatch user information to the req object 
        req.user=decoded;

        next();


    } catch (error) {
        console.log(error);
        res.status(401).json({error:'Invalid Token'});
    }
};


//function to generate the jwt tokens 

const generateToken=(userData)=>{
    return jwt.sign(userData,SECRET);
}

module.exports={
    jwtAuthMiddleware,
    generateToken,

}