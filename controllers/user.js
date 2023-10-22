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
}


exports.signin = async (req, res, next)=>{
    
    try{
        const {email, password} =req.body;
        if(!email || !password){
            return res.status(400).json({
                success: true,
                message: "Email and password are required"
            })
        }

        //check user e-mail
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({
                success: true,
                message: "Invalid Credentials"
            })
        }

        // verify user password
        const isMatched = await user.comparePassword(password);
        
        if (!isMatched) {
            return res.status(400).json({
                success: true,
                message: "Invalid Credentials"
            })
        }
        res.status(200).json({
            success: true,
            user
        })

    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success: true,
            message: "Can not log in, check your credentials"
        })

    }
}