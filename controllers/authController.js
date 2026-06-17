//Request reaching controller
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerUser (req, res) {

    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password


        //Validation 
        switch(true) {

            case name === "":
                res.status(400).json({ error: "Name is requried"});    
                return;

        }

        switch(true) {

            case email === "":
                res.status(400).json({ error: "Email is requried"});
                return;

            case !email.includes("@"):
                res.status(400).json({ error: "Email must contain @"});
                return;
        }

        switch(true) {

            case password === "": 
                res.status(400).json({ error: "Password is requried"});
                return;

            case password.length < 6:
                res.status(400).json({ error: "Minimum 6 characters"});
                return;
        }

        // Check for existing user
        const existUser = await User.findOne({ email : email })

        if(existUser) {
            res.status(400).json({ error: "User already exist!"})
            return;
        }


        // Hashing password

        const hashed = await bcrypt.hash(password, 10);


        //Create a new user document and save it in MongoDB

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashed,

        })

        // Response to User
        res.status(200).json({ message: "Register endpoint works" ,
                    

     });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}   

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }



        //Create JWT token 

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            "supersecretkey",
            { expiresIn: "7d" }
        );

        // Success
        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    registerUser,
    loginUser,
}