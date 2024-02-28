import express from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// import RegisterController from '../controllers/RegisterController.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body)
    const {
        username,
        password,
        email,
        mobile,
        lname,
        fname,
        age,
        salary,
        city,
        country,
        usertype,
        designation,
        gender
    } = req.body;
    // var city = req.body.city.value;
    // var country = req.body.country.value;
    // var usertype = req.body.usertype.value;
    // var designation = req.body.designation.value;
    // var gender = req.body.gender.value;
    const user = await  UserModel.findOne({ username });
    console.log(user);
    if (user) {
        return res.json({ message: "User already exist", status: 401 })
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel(
            {
                username,
                password,
                email,
                mobile,
                lname,
                fname,
                city,
                country,
                usertype,
                designation,
                gender,
                age,
                salary,
            });
        await newUser.save();
        res.json({ message: "Registered successfully", status: 200 })
    }
});


router.post('/login', async (req, res) => {
    console.log(req.body)
    const {
        username,
        password
    } = req.body;
    const user = await  UserModel.findOne({ username });
    if (user) {
        if (user.password == password) {
            res.json({
                message: "Successfully logged in",
                status: 200,
            });
        } else {
            res.json({
                message: "Invalid password",
                status: 401
            })
        }
    } else {
        res.json({
            message: "Invalid username",
            status: 401
        })
    }
});





// router.put('')

export {router as authRouter} 