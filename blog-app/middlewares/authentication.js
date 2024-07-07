


//check and verify the user login cookie is valid or not 

const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){

    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if(!tokenCookieValue)
            {return  next();} //no user cookie means no user is there to verify 


        try {
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload; 
        } 
        catch (err) {}

       return  next();
    }
};


module.exports={
    checkForAuthenticationCookie,
}