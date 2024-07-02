const { getUser }=require('../services/auth');

function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null;

    if(!tokenCookie) return next();

    const token=tokenCookie;
    const user=getUser(token);

    req.user=user;
    return next();

}

//closure function to provide the role to user like admin or normal user or any other role also
function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect('/login');
    }

    if(!roles.includes(req.user.role)) return res.end("unauthorized");      

    return next();
}

// async function restricToLoginUserOnly(req,res,next){
//     // const userUid=req.cookies.uid;
//     const userUid=req.headers['authorization'];

//     if(!userUid) return res.redirect('/login');

//     const token =userUid.split("Bearer ")[1];   

//     const user=getUser(userUid); 
//     if(!user) return res.redirect('/login');

//     req.user=user;
//     next();
// }

//not enforcing like the above function to must have the user in the req.cookie to login 
//this only checks and if not then also forwards further 
// async function checkAuth(req,res,next){
//     // const userUid=req.cookies.uid;
//     const userUid=req.headers['authorization'];
//     const token =userUid.split("Bearer ")[1];  
//     const user=getUser(token);

//     req.user=user;
//     next();
// }



module.exports={
    // restricToLoginUserOnly,
    // checkAuthk,
   checkForAuthentication, 
   restrictTo,
}