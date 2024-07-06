const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    mobile:{
        type:String,
        
    },
    email:{
        type:String,
        
       
    },
    address:{
        type:String,
        required:true,
    },
    adharCardNumber:{
        required:true,
        type:Number,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter',
    },
    isVoted:{
        type:Boolean,
        default:false,
    }
});



//mongo use pre function to add the salt and hash the function before saving to database
userSchema.pre('save',async function(next){

    const User=this;
    //hash the password only  if it has been modified or been created new 

    if(!User.isModified('password')) return next();//no hashing required 

    try{
        //hash password generation 
        const salt=await bcrypt.genSalt(10);
        console.log('salt generated');
        //hash password 
        const hashedPassword=await bcrypt.hash(User.password,salt);

        //override the plain password with the hashed one 
        User.password=hashedPassword;
        console.log('hashing done ]');
        next();
    }catch (error){
        return next(error);
    }
});


//define the method to check the authentication in the auth file 
userSchema.methods.comparePassword=async function(cadidatePassword){
    try {
        //entered password is rehashed using the salt obtained from previous password then matched with entered 
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    } catch (error) {
        throw error;
    }
}


const User=mongoose.model('User',userSchema);
module.exports=User;

