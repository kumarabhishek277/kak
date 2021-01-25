const mongoose = require('mongoose')

const Schema = mongoose.Schema //since, variable is in capital, it means it is a class or constructor

const userSchema = new Schema({
    username:{type:String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true}
}, {timestamps:true})

module.exports = mongoose.model('User',userSchema)