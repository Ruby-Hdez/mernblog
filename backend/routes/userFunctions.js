import express from "express"
import User from "../models/UserSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserRouter = express.Router()

// create a user
UserRouter.use(express.json())



// get router for a user 
UserRouter.get("/", async (req, res)=> {
    await User.find()
    .then((result)=>{
        res.status(200).json({result})
    })
    .catch(err => {
        res.status(400).json({error: err})
    })
})



// post router 
UserRouter.post("/register", async (req, res) => {
    try {

        const {name, email, password} = req.body;
        // validation for the name, email & pass
        if (name && email && password) {
            // hash the password to protect - ten times
            const hashPassword = await bcrypt.hash(password, 10)
            const user = await User.create({name, email, password: hashPassword})
            res.status(208).json({msg: "You have successfully registered for a blog!", user: user})
        } else {
            res.status(400).json({msg: "Required fields not filled!"})
        }

    } catch (error) {
        res.status(400).json({error: error})
    }
})



// login router
UserRouter.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        // find user 
        const existUser = await User.findOne({email})
        if (!existUser) {
            res.status(404).json({error: "User not found!"})
        }

        // bc of encryption, need to double check both versions of pass 
        const ogPassword = await bcrypt.compare(password, existUser.password)
        if (!ogPassword) {
            res.status(400).json({msg: "Invalid credentials!"})
        }

        // create token to save cookies/info
        const token = jwt.sign({id: existUser._id}, process.env.MYSTERY)
        res.status(201).json({msg: "Successfully logged in!", token: token})
        
    } catch (error) {
        res.status(400).json({error: error})
    }
})


export default UserRouter;
