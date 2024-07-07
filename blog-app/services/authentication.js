const jwt =require('jsonwebtoken');

const secret="hello@world";

//takes in a user object and returns the generated token based on payload and secret given 
function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role,
    };

    const token=jwt.sign(payload,secret);

    return token;

}


//extract from payload 
function validateToken(token){
    const payload=jwt.verify(token,secret);

    return payload;

}


module.exports={
    createTokenForUser,
    validateToken,
}