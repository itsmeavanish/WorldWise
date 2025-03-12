const jwt = require("jsonwebtoken")
const generateToken = (res,userId) => {
    const JWT_SECRET="ilovenobody"
    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn:"7d",
    })
    // set jwt http only cookie
    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSide : 'strict',
        maxAge : 30*24*60*60*1000
    })

    return token
}

module.exports=generateToken;