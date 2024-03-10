import { UserModel } from '../models/UserModel.js';
import jsonwebtoken from 'jsonwebtoken';

// controller for login function calling in auth.js
var registerController = async (req, res) => {
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
};

// controller for login function calling in auth.js
var loginController = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await  UserModel.findOne({ email });
    console.log(email);
    
    if (user) {
        if (user.password == password) {
            const token = jsonwebtoken.sign({ email:email, usertype:user.usertype }, 'secret', { expiresIn: '3600sec' });
            console.log(token);
            res.json({
                message: "Successfully logged in",
                status: 200,
                token:token
            });
        } else {
            res.json({
                message: "Invalid password",
                status: 401
            })
        }
    } else {
        res.json({
            message: "Invalid email",
            status: 401
        })
    }
}

export { loginController, registerController };