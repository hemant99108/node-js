const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
//define the person schema 

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
    },

    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

//mongo use pre function to add the salt and hash the function before saving to database
personSchema.pre('save',async function(next){

    const person=this;
    //hash the password only  if it has been modified or been created new 

    if(person.isModified('password')) return next();//no hashing required 

    try{
        //hash password generation 
        const salt=await bcrypt.genSalt(10);

        //hash password 
        const hashedPassword=await bcrypt.hash(person.password,salt);

        //override the plain password with the hashed one 
        person.password=hashedPassword;
        next();
    }catch (error){
        return next(err);
    }
});


//define the method to check the authentication in the auth file 
personSchema.methods.comparePassword=async function(cadidatePassword){
    try {
        //entered password is rehashed using the salt obtained from previous password then matched with entered 
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    } catch (error) {
        throw error;
    }
}



//create person model 
const person=mongoose.model('person',personSchema);
module.exports=person;