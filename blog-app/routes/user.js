const {Router}=require('express');
const User=require('../models/user');



const router=Router();

router.get('/signup',(req,res)=>{
    return  res.render('signup');
})

//post request on signup to create new user 
router.post('/signup',async(req,res)=>{
    const {fullname,email,password}=req.body;

    await User.create({
        fullname,email,password,
    });

    
    return res.redirect('/');
})


router.get('/signin',(req,res)=>{
    return  res.render('signin');
})

//just to login the user with existing email and password 
router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;

    try {
        const token=await User.matchPasswordGenerateToken(email,password);        

        return res.cookie('token',token).redirect('/');

    } catch (err) {
        return res.render('signin',{err:'Incorrect Email or Password'});
    }
});


router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
});





module.exports=router;