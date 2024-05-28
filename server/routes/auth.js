const express=require('express');
const router=express.Router();

const {signup,signin,signout}=require('../controller/auth')
const {userSignupValidator,userSigninValidator}=require('../validator/index')




router.post('/signup',userSignupValidator,signup)
router.post('/signin',userSigninValidator,signin)
router.get('/signout', signout);


module.exports=router