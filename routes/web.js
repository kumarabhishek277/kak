const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const rtweetController = require('../app/http/controllers/rtweetController')

function initRoutes(app){
    app.get('/',homeController().index)/*(req,res)=>{
        //console.log(req.session)
        if(req.session.user){
            return res.render('home')
        }   
        return res.render('main_page')
    })*/

    //Register
    app.get('/register',authController().register)
    app.post('/register',authController().addUser)
    
    //login
    app.get('/login',authController().login)
    app.post('/login',authController().postlogin)
    
    //logout
    app.get('/logout',authController().logout)

    //messages_request
    app.post('/postTweet',rtweetController().index)

    //comment_post
    app.post('/new_comment',rtweetController().updateComment)
    //update like
    app.post('/update_like',rtweetController().updateLike)

    //find another users 
    app.post('/finduser',homeController().findUser)

}

module.exports = initRoutes