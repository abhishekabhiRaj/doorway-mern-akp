class LoginController {
    async register(req, res) {
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
            // city,
            // country,
            // usertype,
            // designation,
            // gender
        } = req.body;
        var city = req.body.city.value;
        var country = req.body.country.value;
        var usertype = req.body.usertype.value;
        var designation = req.body.designation.value;
        var gender = req.body.gender.value;
        const user = await UserModel.findOne({ username });
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
    }
    async login(req, res) {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        const userCount = await UserModel.find({});
        if (user) {
            // const isPasswordValid = await bcrypt.hash(password, 10);
            const isPasswordValid = password;
            if (isPasswordValid === user.password) {
                const token = jwt.sign({ id: user._id }, "secret")
                res.json({ message: "Successfully logged in!", status: 200, token, user, userCount: userCount.length });
            } else {
                res.json({ message: "Incorrect password!", status: 401 });
            }
        }
        else {
            res.json({ message: "User does not exist!", status: 401 })
        }
    }
}

export default LoginController;

