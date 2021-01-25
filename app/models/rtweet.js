const mongoose = require('mongoose')

const Schema = mongoose.Schema //since, variable is in capital, it means it is a class or constructor

const new_comment = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    username:{type:String, require:true},
    comment_body:{type:String, required:true}
},{timestamps:true})

const like_array = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        //required:true,
    }
},{timestamps:true})

const rtweetSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
        },
    post_body:{type:String, required:true},
    likes:{type:Number, default:0},
    like:[like_array],
    comments:[new_comment]
}, {timestamps:true})


module.exports = mongoose.model('Rtweet',rtweetSchema)