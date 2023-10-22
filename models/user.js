const mongoose = require('mongoose');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const passwordRegexp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required'],
        maxlength:32
    },

    email: {
        type: String,
        trim:true,
        required: [true, 'Email is required'],
        unique: true,
        match: [emailRegexp,'Please add valid Email']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password required'],
        minlength: [6, 'Password must have at least six(6) characters'],
        match: [passwordRegexp, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and a special character"]
    },
    role: {
        type: Number,
        default: 0,
    }
},{timestamps: true})
module.exports = mongoose.model('User', userSchema);