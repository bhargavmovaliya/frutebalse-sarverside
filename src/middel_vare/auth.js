const jwt = require('jsonwebtoken');
const Users = require('../models/users.models');

const auth = (roles=[]) => async(req,res,next) => {
    console.log(roles);
    
    try {
        const token = req.cookies.accesstoken || req.header("Authorization")?.replace("Bearer ","")

        if (!token) {
            return res.status(401).json({
                success:false,
                message : "please enter token"
            })
        }
        console.log(token);

        try {
            //verify token code
            const verified = jwt.verify(token,"vi242@242");
            console.log(verified);

            const user = await Users.findById(verified._id)
            console.log(user);
            
            if (!roles.some((v) => v === user.role)) {
                return res.status(400).json({
                    success:false,
                    message : "you have not access"
                })
            }
            console.log("okok");

            req.user = user
            next();
        } catch (error) {
            return res.status(400).json({
                success:false,
                message : "Invalid token"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message : "Invalid token"
        })
    }
}

module.exports = auth