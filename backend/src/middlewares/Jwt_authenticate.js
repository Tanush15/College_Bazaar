const jwt =require('jsonwebtoken');
const User= require('../models/userSchema');
require('dotenv').config({ path: 'config.env' });


const Jwt_authenticate= async (req,res,next)=>{
    try
    {
        console.log("<<<<<>>>>>");
        const token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.JWT_KEY);
        const rootUser =await User.findOne({_id: verifyToken._id,"tokens.token":token})
        if(!rootUser)
        {
            throw new Error('User not found');
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    }
    catch(err){
        res.status(400).send('Unauthorised:_NO_token_provided');
        console.log(err);

    }
}
module.exports=Jwt_authenticate;