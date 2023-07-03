const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: String,
})

const UserModel = model('User', UserSchema)

module.exports = UserModel;