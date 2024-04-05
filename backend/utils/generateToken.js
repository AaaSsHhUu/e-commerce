const sendToken = (user,res,statusCode) => {
    const token = user.generateAccessToken();

    // cookie options
    const options = {
        expiresIn : new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly : true
    }

    res.status(statusCode).cookie("token",token,options).json({
        success : true,
        user,
        token
    })
}

module.exports = sendToken;