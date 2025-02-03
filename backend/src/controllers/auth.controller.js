import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signUp = async (req, res) => {
    const {fullname, email, password} = req.body;
    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({message: "Please fill in all fields"});
        }
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }

}

export const logIn = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user  = await User.findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isPasswordCorrected  = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrected) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        generateToken(user._id, res);
        res.status(200).json({
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}

export const logOut = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({message: "Please provide a profile picture"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"});
    }
}
