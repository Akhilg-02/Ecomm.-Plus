const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")



const register = async (req,res,next) =>{
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        bcrypt.hash(req.body.password, 10, async (err, hashedPass) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPass,
            });

            try {
                const savedUser = await newUser.save();
                res.status(200).json({
                    userData: savedUser,
                    message: "User added successfully!"
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: "An error occurred while saving user" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while registering the user" });
    }

}

const login = async (req,res,next)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "No user found" });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.json({ error: err });
            }

            if (result) {
                const token = jwt.sign({ name: user.name }, process.env.JWT_SECRET, { expiresIn: '1hr' });
                return res.json({
                    message: "Login successful",
                    token,
                    user
                });
            } else {
                return res.json({ message: "Password does not match" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while logging in the user" });
    }
}


module.exports = {register,login}



