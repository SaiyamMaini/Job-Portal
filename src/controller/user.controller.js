import UserModel from "../model/user.model.js"
import JobModel from "../model/job.model.js";

export default class UserController{

    home(req,res){
        if(req.session.userEmail){
        const user = UserModel.findByEmail(req.session.userEmail);
        res.render('home', {user:user, userEmail: req.session.userEmail});
        }else{
            res.render('home', {user:null})
        }
    }

    register(req, res){
        res.render('register',{user:null});
    }

    registerUser(req, res){
        console.log(req.body);
        const newUser = UserModel.addUser(req.body);
        console.log(newUser.userName);
        res.render('login',{errorMessage: null, user:null});
    }

    login(req, res){
        res.render('login');
    }

    loginUser(req, res){
        const {email, password} = req.body;
        const user = UserModel.isValidUser(email, password)
        console.log(user.userName);
        if(!user){
           return res.render('login', {errorMessage:'Invalid user credentials', user:null})
        }
        req.session.userEmail = email;
        const jobs = JobModel.getJobs();
        res.render('home',{user: user.userName, userEmail: req.session.userEmail, jobs:jobs});
    }

    logout(req, res){
        req.session.destroy(err =>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/')
            }
        })
    }
}