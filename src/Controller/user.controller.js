import user from '../Model/user.model.js';
import bcrypt from 'bcryptjs';
import quiz from '../Model/quiz.model.js'
import jwt from 'jsonwebtoken'

export let signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body || {}

        if (!name || !email || !password || !confirmPassword || !role) {
            return res.status(404).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        let isEmailExists = await user.findOne({ email: email })


        if (isEmailExists) {
            return res.status(401).json({
                status: false,
                message: "Email Allready Exists",
                data: null
            })
        }


        if (password != confirmPassword) {
            return res.status(400).json({
                status: false,
                message: "password and confirmPassword Does Not Match",
                data: null
            })
        }


        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        let User = new user({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        })

        try {
            await User.save()

            if (User._id) {
                return res.status(200).json({
                    status: false,
                    message: "User Added Sucessfully",
                    data: null
                })
            }


        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error.message,
                data: null
            })
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            data: null
        })
    }

}



export let login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        let isEmailExists = await user.findOne({ email: email });


        if (!isEmailExists) {
            return res.status(404).json({
                status: false,
                message: "Your Account Does Not Exists",
                data: null
            })
        }


        let isPasswordMatch = await bcrypt.compare(password, isEmailExists.password);
        let userId = isEmailExists._id;
        let name = isEmailExists.name;
        let Useremail = isEmailExists.email;
        let role = isEmailExists.role;



        if (isPasswordMatch) {

            var token = jwt.sign({ id: userId, name: name, email: Useremail, role: role }, process.env.jwt_secret);

            return res.status(200).json({
                status: false,
                message: "Logged In Sucessfully",
                data: {
                    accessToken: token
                }
            })



        } else {
            return res.status(404).json({
                status: false,
                message: "Username or Password Does Not Match",
                data: null
            })
        }

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message,
            data: null
        })
    }

}



export let addQuiz = async (req, res) => {
    try {
        const { question, options, ans } = req.body;

        if (!question || !options || !ans) {
            return res.status(404).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        let addQuiz = new quiz({
            question: question,
            options: options,
            ans: ans
        })


        try {

            addQuiz.save();

            if (addQuiz._id) {
                return res.status(200).json({
                    status: false,
                    message: "Quiz Added Sucessfully",
                    data: null
                })
            }


        } catch (error) {
            return res.status(200).json({
                status: false,
                message: error.message,
                data: null
            })
        }

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message,
            data: null
        })
    }

}


export let getQuiz = async (req, res) => {
    try {

        const questions = await quiz.aggregate([{ $sample: { size: 5 } }]);

        if (questions.length == 0) {
            return res.status(200).json({
                status: false,
                message: "No Quiz Found",
                data: null
            })
        } else {
            return res.status(200).json({
                status: true,
                message: "Quiz Data Fetched Sucessfully",
                data: questions
            })
        }

    } catch (error) {
        return res.status(404).json({
            status: false,
            message: error.message,
            data: questions
        })
    }

}


export let submitQuiz = async (req, res) => {
    try {

        const { userId, marks } = req.body;


        if (!userId || !marks) {
            return res.status(200).json({
                status: false,
                message: "All Fields Are Required",
                data: null
            })
        }

        let updateQuizDetails = await user.updateOne({ _id: userId }, { $push: { scores: marks } });

        console.log(updateQuizDetails)

        if (updateQuizDetails.modifiedCount == 1) {
            return res.status(200).json({
                status: false,
                message: "Quiz Submitted Sucessfully",
                data: null
            })
        } else {
            return res.status(200).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }
    } catch (error) {
        return res.status(200).json({
            status: false,
            message: error.message,
            data: null
        })
    }
}







