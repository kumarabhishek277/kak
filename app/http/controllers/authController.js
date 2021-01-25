const User = require('../../models/user')

function authController(){
    return {
        register(req,res){
            return res.render('auth/register')
        },
        addUser(req,res){
            console.log(req.body)
            const {username,email,password} = req.body
            if(!username || !email || !password){
                req.flash('error','All fields are required')
                req.flash('username',username)
                req.flash('email',email)
                return res.redirect('/register')
            }
            User.exists({email:email},(err,result)=>{
                if(err){
                    res.flash('error','Something went wrong. Try again!!!')
                    req.flash('username',username)
                    req.flash('email',email)
                    return res.redirect('/register')
                }
                if(result){
                    req.flash('error','email id already exist')
                    req.flash('username',username)
                    return res.redirect('/register')
                }
                
            })
            User.exists({username:username},(err,result)=>{
                if(err){
                    res.flash('error','Something went wrong. Try again!!!')
                    req.flash('username',username)
                    req.flash('email',email)
                    return res.redirect('/register')
                }
                if(result){
                    req.flash('error','username already exist')
                    req.flash('email','email')
                    return res.redirect('/register')
                }
            })
            const user = new User({
                username: username,
                email:email,
                password:password
            })
            user.save().then(user=>{
                return res.redirect('/login')
            }).catch(err=>{
                req.flash('Something went wrong')
                return res.redirect('/register')
            })
        },
        login(req,res){
            return res.render('auth/login')
        },
        postlogin(req,res){
            const {email, password} = req.body
            if(!email || !password){
                req.flash('error','All fields are required')
                if(email){
                    res.flash('email',email)
                }
                
                res.redirect('/login')
            }
            User.findOne({email:email}).then(result=>{
                if(result){
                    const pass = result.password
                    if(pass != password){
                        req.flash('error','Wrong email id or password')
                        return res.redirect('/login')
                    }
                    req.session.user = result
                    //console.log(req.session)
                    res.redirect('/')
                }
                else{
                    req.flash('error','Wrong email id or password')
                    req.flash('email',email)
                    res.redirect('/login')
                }
            }).catch(err=>{
                console.log(err)
            })

        },
        logout(req,res){
            delete req.session.user
            console.log(req.session)
            return res.redirect('/')
        }

    }
}


module.exports = authController

