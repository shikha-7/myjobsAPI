const User = require("../models/userschema");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");


const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: `Authentication Invalid!` })
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        // const user = User.findById(payload.id).select('-password');
        // req.user = user;
        req.user = { userId: payload.AuthID, username: payload.name }
        next();
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = auth;