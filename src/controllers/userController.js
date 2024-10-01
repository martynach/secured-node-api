import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {UserSchema} from "../models/userModel";

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
    console.log("- - - loginRequired START - - - ")
    if (req.user) {
        next();
    } else {
        return res.status(401).send({message: "Unauthorized user"});
    }
};

export const registerUser = async (req, res) => {
    console.log('- - - registerUser START - - - ');

    try {
        const newUser = new User(req.body);
        newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
        await newUser.save();
        newUser.hashPassword = undefined;
        console.log('- - - registerUser creating new user - - - ');
        return res.send(newUser);
    } catch (err) {
        console.log('- - - registerUser some error - - - ');
        return res.status(400).send({message: err});
    }
};

export const loginUser = async (req, res) => {
    console.log('- - - loginUser START - - - ');
    const existingUser = await User.findOne({email: req.body.email});

    if (!existingUser) {
        console.log('- - - loginUser email not found  - - - ');
        return res.status(401).send({message: 'Authentication failed. No user found.'});
    }

    // const passwordMatch = await bcrypt.compare(req.body.password, existingUser.hashPassword);
    const passwordMatch = existingUser.comparePassword(req.body.password, existingUser.hashPassword);
    if(!passwordMatch) {
        console.log('- - - loginUser wrong password  - - - ');
        return res.status(401).send({message: 'Authentication failed. Wrong password.'});
    }

    console.log('- - - loginUser success  - - - ');
    const tokenPayload = {email: existingUser.email, username: existingUser.username, _id: existingUser._id};
    const token = jwt.sign(tokenPayload, 'some_secret');
    return res.json({token: token});
};
