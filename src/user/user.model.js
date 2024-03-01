import { Schema, model } from "mongoose";

const userSchema = Schema({
    names: {
        type: String,
        required: true
    },
    surnames: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'ADMIN',
        uppercase: true,
        required: true  
    }
},
{
    versionKey: false
})

export default model('user', userSchema)