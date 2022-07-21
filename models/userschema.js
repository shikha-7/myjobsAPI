const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50,
    },

    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please provide password"],
        minlength: 6,
        // maxlength: 12
    }

});

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ AuthID: this._id, name: this.name }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_LIFETIME });
}


UserSchema.methods.comparePassword = async function (candidatepassword) {
    const isMatch = await bcrypt.compare(candidatepassword, this.password);
    // console.log(isMatch)
    return isMatch;
}


module.exports = mongoose.model("User", UserSchema);