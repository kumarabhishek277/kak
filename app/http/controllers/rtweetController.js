const Rtweet = require('../../models/rtweet')
const mongoose = require('mongoose')

function rtweetController(req,res){
    return {
        index(req,res){
            //console.log(req.body)
            let new_post = req.body.new_post
            new_post = new_post.trim()
            const ans = new Rtweet({
                userId: req.session.user._id,
                post_body: new_post
            })
            ans.save().then(result=>{
                console.log('saved successfully')
                return res.redirect('/')
            }).catch(err=>{
                console.log("There is some error")
                console.log("A lot of error")
                console.log(err)
                return res.redirect('/')
            })
        },
        updateComment(req,res){
            const tweetId = mongoose.Types.ObjectId(req.body.tweet_id)
            const userId = req.session.user._id;
            console.log(req.session.user)
            const new_comment = {
                userId: userId,
                username:req.session.user.username,
                comment_body:req.body.new_comment
            }
            Rtweet.findOne({_id:tweetId}).then(result=>{
                if(result){
                    result.comments.push(new_comment)
                    const updated_comment = result.comments
                    Rtweet.updateOne({_id:tweetId},{$set:{comments:updated_comment}}).then(result=>{
                        console.log("updated")
                    }).catch(err=>{
                        console.log("failed to update")
                    })
                    return res.redirect('/')
                }
                console.log("couldn't find the record")
                return res.redirect('/')

            }).catch(err=>{
                console.log(err)
                return res.redirect('/')
            })
        },
        updateLike(req,res){
            //console.log(req.body)
            const tweet = JSON.parse(req.body.total_likes)
            //console.log(tweet)
            let user_exist = 0
            if(tweet.like.length != 0){
                let len = tweet.like.length
                for(let i=0;i<len;i++){
                    if(tweet.like[i]._id == req.session.user._id){
                        user_exist = 1
                        break
                    }
                }
            }
            if(user_exist == 1){
                return res.redirect('/')
            }
            Rtweet.findOne({_id: tweet._id}).then(result=>{
                if(!result){
                    return res.redirect('/')
                }
                result.like.push(req.session.user._id)
                const updated_like = result.like
                const total_likes = result.likes+1
                Rtweet.updateOne({_id:tweet._id},{$set:{likes:total_likes,like:updated_like}}).then(result=>{
                    if(!result){
                        console.log("record not found")
                        return res.redirect('/')
                    }
                    console.log("Like updated")
                    return res.redirect('/')
                }).catch(err=>{
                    console.log("error while updated")
                    console.log(err)
                    return res.redirect('/')
                })
            })
        }
    }
}

module.exports = rtweetController