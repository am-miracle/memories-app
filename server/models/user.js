import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    id: {
        type: String,
    },
})

const User = mongoose.model('user', userSchema)

export default User;