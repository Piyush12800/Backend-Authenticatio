
// auth isStudent , isAdmin

const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.auth=(req , res,next)=>{
    try {
        // const token = req.header('Authorization').replace('Bearer ','');
        const token = req.body.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            });
        }
        try {
            
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
        } catch (error) {
            console.error(error);
        return res.status(401).json({
            success:false,
            message:"token is invalid"
        });
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
}


exports.isStudent = (req , res ,next)=>{
    try {
        
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students",
            });
        }
        next();


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"USer role is not matching to students"
        });
    }
}
exports.isAdmin = (req , res ,next)=>{
    try {
        
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin",
            });
        }
        next();


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"USer role is not matching to admins"
        });
    }
}






