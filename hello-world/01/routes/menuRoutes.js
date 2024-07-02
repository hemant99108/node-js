const express=require('express');
const router=express.Router();

const menu=require('../models/menu');

//interaction with the menu list in the database

router.post('/',async(req,res)=>{
    try {
        const data=req.body;
        const newMenu=new menu(data);
        const response=await newMenu.save();
        console.log('menu created sucess');
        res.status(200).json(response);
    } catch (error) {
        console.log('error in menu card creation');
        res.status(500).json({err:'Error in saving menu card'});
    }
});


//get method to get the menu card from database
router.get('/',async(req,res)=>{
    try {   
        const data=await menu.find();
        console.log('menu card fetchedd');
        res.status(200).json(data);
    } catch (error) {
        console.log('error in fetching menu from db');
        res.status(500).json({err:'error in fetching menu'});
    }
});



module.exports=router;

