const user = require("../models/userschema");
const { StatusCodes } = require("http-status-codes");



const register = async (req, res, err) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `please provide name,email,password` });
    }

    // if (err.code && err.code === 11000) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ msg: `please provide unique email` });
    // }

    const users = await user.create({ ...req.body });
    const token = users.createJWT();
    res.status(StatusCodes.CREATED).json({ users: { name: users.name }, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: `Please Provide Email and Password` })
    }

    const users = await user.findOne({ email });
    if (!users) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: `Invalid Credentials` })
    }

    const isPassword = await users.comparePassword(password);
    if (!isPassword) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: `Invalid Credentials` })
    }
    const token = users.createJWT();
    res.status(StatusCodes.OK).json({ users: { name: users.name }, token });

}

module.exports = { register, login }