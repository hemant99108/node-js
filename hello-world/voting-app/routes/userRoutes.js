const express=require('express');
const router=express.Router();
const {jwtAuthMiddleware,generateToken}=require('./../jwt');
const User=require('./../models/user');



//create a new user 
router.post('/signup',async(req,res)=>{
    try {
          const data=req.body;
          const newUser=new User(data);
          
          const response=await newUser.save();
          console.log('data saved');

          const payload={
            id:response.id,
          }

          console.log(JSON.stringify(payload));
          const token=generateToken(payload);
          console.log('token is:',token);

          res.status(200).json({response:response,token:token});


    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Error while creating user'});
    }
});

//user login 
router.post('/login',async(req,res)=>{
    try {
        const {adharCardNumber,password}=req.body;
        
        const user=await User.findOne({adharCardNumber:adharCardNumber});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({err:'Invalid Adhar or Password '});

        }

        //generate token 
        const payload={
            id:user.id
        }


        const token =generateToken(payload);

        //return the token as the response

        res.json({token});
    
    } catch (err) {
        console.log(err);
        res.status(500).json({err:'Error while login '});
    }
});


router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userData=req.user;
        const userId=userData.id;
        const user=await User.findById(userId);
        res.status(200).json({user});

    } catch (err) {
        console.log(err);
        res.status(500).json({err:'Error in getting profile'});
    }
});


//to update the password of the user 
router.put('/profile/password',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userId=req.user.id;
        const {currentPassword,newPassword}=req.body;

        //find the user and update the password 
        const user=User.findById(userId);

        //if password doesnot match return error 
        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({err:'Invalid password! enter again '});
        }

        //update the password 
        user.password=newPassword;
        await user.save();

        console.log('password changed ');
        res.status(200).json({message:'Password Changed'});


    } catch (error) {
        
    }
});


module.exports=router;


