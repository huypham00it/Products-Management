import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        minLength: 2,
        maxLength: 30,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLength: 6,
        maxLength: 30,
        select: false
    },
    lastname: {
        type: String,
        maxLength: 30,
        trim: true,
        default: 'last name'
    },
    image: {
        type: String,
        trim: true,
        default: 'https://cdn.pixabay.com/photo/2018/10/23/08/18/sexy-girl-3767276_960_720.jpg'
    },
    location: {
        type: String,
        maxLength: 30,
        trim: true,
        default: 'HCM city'
    }
});

UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

export default mongoose.model('User', UserSchema)