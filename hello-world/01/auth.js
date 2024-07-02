//for authentication -username and password 
const passport=require('passport');
const person=require('./models/person');


const LocalStrategy=require('passport-local').Strategy;



passport.use(new LocalStrategy(async (username,password,done)=>{
    //authentication logic here 
    try {
        console.log('credentials recieved',username,password);
        
        const user=await  person.findOne({username:username});
        //three cases occur here wron id ,password and all found 
        if(!user)
            return done(null,false,{message:'Invalid Username'});//1st case 


        const isPassswordMatched=user.comparePassword(password);

        if(isPassswordMatched){
            return done(null,user);//user found case 
        }else{
            return done(null,false,{message:'Wrong Password'});//last case 
        }
    } catch (error) {
        return done(error);
    }
}))



module.exports=passport;