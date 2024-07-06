const express=require('express');
const router=express.Router();
const {jwtAuthMiddleware,generateToken}=require('./../jwt');
const User=require('./../models/user');
const Candidate=require('./../models/candidate');

//function to check admin role is present or not with the given id 
const checkAdminRole=async(userId)=>{
    try {
        const user=await User.findById(userId);
        return user.role==='admin';
    } catch (error) {   
        console.log('error in checking admin role ');
        return false;
    }
}

//create a new user by admin role 
router.post('/',jwtAuthMiddleware,async(req,res)=>{
    try {
          
        if(!await checkAdminRole(req.user.id)){
            return res.status(404).json({message:'user has no admin role '});
        }
        
          const data=req.body;
          const newCandidate=new Candidate(data);
          
          const response=await newCandidate.save();
          console.log('data saved');

       
          res.status(200).json({response:response});


    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Error while creating user'});
    }
});





router.put('/:candidateID',jwtAuthMiddleware,async(req,res)=>{
    try {

        if(!await checkAdminRole(req.user.id)){
            return res.status(403).json({message:'user has no admin role '});
        }

        const candidateID=req.params.candidateID;
        const updatedCandidateData=req.body;

        const response=await Candidate.findByIdAndUpdate(candidateID,updatedCandidateData,{
            new:true,//return the updated document 
            runValidators:true,

        });

        if(!response){
            return res.status(404).json({err:'Candidate not found to update'});
        }

        console.log('candidate data updated');

        res.status(200).json(response);

    } catch (error) {
            console.log(err);
            res.status(500).json({err:'error while updating user'});
    }
});


router.delete('/:candidateID',jwtAuthMiddleware,async(req,res)=>{
    try {

        if(! await checkAdminRole(req.user.id)){
            return res.status(403).json({message:'user has no admin role '});
        }

        const candidateID=req.params.candidateID;        

        const response=await Candidate.findByIdAndDelete(candidateID);

        if(!response){
            return res.status(404).json({err:'Candidate not found to delete'});
        }

        console.log('candidate deleted');

        res.status(200).json(response);

    } catch (error) {
            console.log(err);
            res.status(500).json({err:'error while deleting candidate'});
    }
});

//vote the candidate 

router.post('/vote/:candidateID',jwtAuthMiddleware,async(req,res)=>{
    //no admin can vote 
    //user can vote only once 

    candidateID=req.params.candidateID;
    userId=req.user.id;

    try {
        //find the candidate 
        const candidate = await Candidate.findById(candidateID);

        if(!candidate){
            return res.status(404).json({msg:'Candidate not found'});
        }

        //find the user
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({err:'user not found to vote the candidate'});

        }

        //already voted cant vote again 
        if(user.isVoted){
            res.status(400).json({msg:"Cant vote again "});
        }

        if(user.role==='admin'){
            res.status(403).json({err:'Admin cant vote '});
        }

        //update the candidate document to record the vote and register the userid in the array of the vote 
        candidate.votes.push({user:userId});
        candidate.voteCount++;

        await candidate.save();

        //lastly update the user document so he cant vote again 
        user.isVoted=true;
        await user.save();

        res.status(200).json({msg:'Vote recorded successfully'});


    } catch (err) {
        console.log(err);
        res.status(401).json({err:'Error while recording the vote '});
    }
});


// vote count 

router.get('/vote/count',async(req,res)=>{
    try {
        //get the votes and also arange them in the ascending order of the vote they get 
        
        const candidate=await Candidate.find().sort({voteCount:'desc'});

        //map the candidate to only return their name and the vote count j
        const voteRecord=candidate.map((data)=>{
            return {
                party:data.party,
                count:data.voteCount
            }
        });



        return res.status(200).json(voteRecord);
    } catch (err) {
        console.log(err);
        res.status(500).json({err:'eror while geting the vote count '});
    }
})




module.exports=router;


