const Rtweet = require('../../models/rtweet')
const User = require('../../models/user')
function homeController(){
    
    return {
        async index(req,res){
            if(!req.session.user){
                return res.render('main_page')
            }
            const userId = req.session.user._id
            let username
            User.findOne({_id:userId}).then(result=>{
                username = result.username                
            })
            const tweet = await Rtweet.find({userId:userId})
            return res.render('home',{tweet:tweet,username:username})
        },
        findUser(req,res){
            const userName = req.body.userName
            User.findOne({username:userName}).then(async result=>{
                if(!result){
                    req.flash('error','Invalid username')
                    return res.redirect('/')
                }
                const userId = result._id
                const tweet = await Rtweet.find({userId:userId})
                
                return res.render('home',{tweet:tweet,username:userName},)
            }).catch(err=>{
                console.log(err)
                return res.redirect('/')
            })

        }
    }
}

module.exports = homeController