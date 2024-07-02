const express=require('express');
const router=express.Router();
const {handleGetAllUsers, handlegetUserById,handleUpdateUserById, handleDeleteUserById, handleCreateNewUser}=require('../controllers/user');


// router.get('/users',async(req,res)=>{

//     const alldbUsers=await User.find({});

//     const html=`
//     <ul>
//         ${alldbUsers.map(user=>`<li> ${user.firstName}- ${user.email }</li>` ).join("")}
//     </ul>
//     `;

//     res.send(html);
// })



router.route('/').get(handleGetAllUsers).post(handleCreateNewUser);

router.route('/:id')
.get(handlegetUserById)
.patch (handleUpdateUserById)

.delete(handleDeleteUserById);


module.exports=router;