export let rbac = (roles) => {

    return (req, res, next) => {

        console.log(roles)

        if (roles.includes(req.user.role)) {
            console.log(req.user)
            next()
        } else {
            return res.status(200).json({
                status: false,
                message: "You Are Not Authrized To Access This Route",
                data: null
            })
        }


    }



}