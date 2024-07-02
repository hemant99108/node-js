const express=require('express');

const router=express.Router();
const person=require('../models/person');


//post request to get the data into the database 
router.post('/',async(req,res)=>{
    try {
        const data=req.body;//assuming the req body contains the person data

    const newPerson=new person(data);
    //data would automatically get arranged 
    //like : newPerson.name=data.name and all the things 

    //save the new person to the database 
     const response=await newPerson.save();
     console.log('data saved');
     res.status(200).json(response);

    } catch (err) {
        console.log('error in saving data');
        res.status(500).json({err:'Internal Server Error'});

    }

});

//get method to get the person 

router.get('/',async(req,res)=>{
    try {
        const data=await person.find();
        console.log('data found');

        res.status(200).json(data);
    } catch (error) {
        console.log('error while fetching from database');
        res.status(500).json({err:'Error while fetching db'});
    }
});

//find person with defined work type
router.get('/:workType',async(req,res)=>{
    try {
        const workType=req.params.workType;

        if(workType=='chef'||workType=="waiter"||workType=="manager"){
            const response=await person.find({work:workType});
            console.log('person found');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({err:"Invalid workType"});
        }


    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Error while fetching with worktype'});
    }
});


router.put('/:id',async(req,res)=>{
    try {
        const personId=req.params.id;
        const updatedPersonData=req.body;

        const response=await person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,//return the updated document 
            runValidators:true,//run mongoose validation to check all valid data entered 
        });

        //if the id entered was not valid to find the user then no response 
        if(!response){
            return res.status(404).json({error:`Person not found with the id: ${personId}`});
        }
        

        console.log('data updated');
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Error while updating the person with id '});
    }
});


router.delete('/:id',async(req,res)=>{
    try {
        const personId=req.params.id;
        //assuming that u have a person model 

        const response=await person.findByIdAndDelete(personId);
        
        if(!response){
            return res.status(404).json({error:'person not found to be deleted'});
        }

        console.log('data deleted successfully');
        res.status(200).json({message:'person found and deleted success'});

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Error while deleting person with id entered'});
    }
    
})



module.exports=router;

