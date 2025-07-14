import jwt from 'jsonwebtoken';



export let auth = (req, res, next) => {

    try {

        const { authorization } = req.headers

        let token = authorization.split(" ")[1];

        if (!token) {
            return res.status(200).json({
                status: false,
                message: "Token Not Found",
                data: null
            })
        }

        let decoded = jwt.verify(token, process.env.jwt_secret);

        console.log(decoded)

        if (decoded) {
            req.user = decoded;
            next()
        } else {
            return res.status(400).json({
                status: false,
                message: "Something went wrong",
                data: null
            })
        }



    } catch (error) {
        return res.status(200).json({
            status: false,
            message: error.meesage,
            data: null
        })
    }

}