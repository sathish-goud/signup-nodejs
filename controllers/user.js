const User = require('../models/user')

exports.signup = async (req, res, next)=>{
    const {email} = req.body;
    const userExist = await User.findOne({email});

    if(userExist){
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        })
    }

    try {
        const user = await User.create(req.body); // Fixed: pass req.body instead of req,res
        res.status(201).json({
            success: true,
            user
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

    res.json({message: "Controller user is working"})
}