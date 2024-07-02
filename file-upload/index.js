const path=require('path');
const express=require('express');
const multer=require('multer');
const { prototype } = require('events');

const app=express();
const PORT=8002;
 
//code for the file uploading of our required type 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        //at null we can place error 
        return cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}--${file.originalname}`);
    },
});

const upload=multer({storage});

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    return res.render('homepage');
});

app.post('/upload',upload.single('profileImage'),(req,res)=>{

    // console.log("req.body");
    // console.log(req.file);

    return res.redirect('/');
})



app.listen(PORT,()=>console.log("running@ 8002")); 