const User=require('../models/user');    

async function handleGetAllUsers(req,res){
    const alldbUsers=await User.find({});

    return res.json(alldbUsers);
}

async function handlegetUserById(req,res){
    const user=await User.findById(req.params.id);
    
    if(!user) return res.status(404).json({error:"no user with this id"});

    return res.json(user);
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName:"changed "});
    return res.json({status:"pending"});
}

async function handleDeleteUserById(req,res){
    await findByIdAndDelete(req.params.id)
    
    return res.json({status:"succeed"});
}


async function handleCreateNewUser(req,res){
     //create new user use req.body to get the data from outside 
     const body=req.body;
    
     // console.log("body:",body); //initially undefined 
 
     if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title){
         return res.status(400).json({msg: "provide full info to move "})
     }
 
     // users.push({...body, id:users.length+1});
 
     // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
 
     //       return res.status(202).json({status:"success",id:users.length});
 
     // })
 
     const result= await User.create({
         firstName:body.first_name,
         lastName:body.last_name,
         email:body.email,
         gender:body.gender,
         jobTitle:body.job_title,
     });
 
     console.log("result pushed is: ",result);
 
     return res.status(201).json({msg:"success",id:result._id});
   
 
}


module.exports={
    handleGetAllUsers,
    handlegetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,

}