const express = require('express');
const zod = require('zod');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWTSECRET = require('../config');
const { User,Account } = require('../db');
const { authMiddleware } = require('../middlewares');

router.use(express.json());


const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
});

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
});

router.get("/me",async (req,res)=>{
    // console.log("request");
    authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if(!authHeader || authHeader.startsWith('Bearer null') || token == ""){
        return res.json({
         msg : "invalid"
        });    
     } else{
        try{
          
            const decoded = jwt.verify(token,JWTSECRET);
            const response = await User.findOne({_id :decoded.userId});
            const account = await Account.findOne({userId : decoded.userId});
            res.status(200).json({
                username : response.username,
                firstName : response.firstName,
                lastName : response.lastName,
                balance : account.balance,
                msg:'valid'
            })
            
        } catch(error){
            
            return res.json({
                msg : "invalid"
            });

        }

     }
})

router.post("/signup",async (req,res)=>{
    const body = req.body;
    const result = signupSchema.safeParse(body);
    if(!result.success){
        return res.json({
            message : "Incorrect Output"
        });
    };

    const user = await User.findOne({
        username : body.username
    })  

    if(user){
        return res.json({
            message : "Email already taken"
        });
    };

    try {
        const dbUser = await User.create({
            username : body.username,
            password : body.password,
            firstName : body.firstName,
            lastName : body.lastName,
        })
        
        // After creating the user, create an associated account

        const newAccount = await Account.create({
            userId: dbUser._id,
            balance: Math.ceil(Math.random()*10000) + 10000 // or any initial balance you want to set
        });
        
        const userId = dbUser._id;
    
        const token = jwt.sign({
            userId
        },JWTSECRET);
    
        res.json({
            message : "User Created Successfully",
            token : token,
        });
        console.log('User and Account created successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
    

});

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWTSECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})


router.put("/",authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message : "Error while updating information"
        });
    }
    await User.updateOne(req.body,{
        id : req.userID
    })
    res.json({
        message : "Updated Successfully",
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const currentId = jwt.decode(token);
    console.log(authHeader,);
    console.log(token);
    console.log(currentId);
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
            currentId

        }))
    })
})


module.exports =  router


