import express from "express";
import path from "path";
import ejsLayouts from 'express-ejs-layouts';
import UserController from "./src/controller/user.controller.js";
import session from 'express-session';
import JobController from "./src/controller/job.controller.js";
import { uploadFile } from "./src/middleware/apply.middleware.js";
import { auth } from "./src/middleware/auth.middleware.js";

const server = express();

server.use(ejsLayouts);

server.use(express.static('public'));

//setting up session
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))

//setting up the ejs layout
server.set("view engine", "ejs");

server.use(express.static('src/views'));
//path of our views
server.set("views", path.join(path.resolve(),"src","views"));


//parsing form data
server.use(express.urlencoded({extended: true}))

let userController = new UserController();
server.get('/', userController.home)

server.get('/register',userController.register);


let jobController = new JobController();
server.get('/jobs',jobController.getJobs)

server.post('/register',userController.registerUser)

server.post('/login', userController.loginUser);

server.get('/logout',userController.logout);

server.get('/postjob', jobController.displayPostJob);
server.post('/postjob', jobController.postJob);
server.get('/detailjobview/:id', jobController.detailJobView)
server.post('/applyjob', uploadFile.single('resume') ,jobController.applyToJob)
server.get('/applicants/:id', auth ,jobController.applicantsView)
// server.get('/applicants/:id', jobController.applicantsResumeView)

server.get('/applicants/:id/resume/:filename', auth ,(req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(path.resolve(), 'public', 'resume', filename);
  
    // Send the PDF file as a response
    res.sendFile(filePath);
  });

server.get('/update-job/:id', jobController.updateJobView)
server.post('/update-job', jobController.updatedJob);


server.post('/delete-job/:id', jobController.deleteJob);

server.listen(3400, ()=>{
    console.log('Server is Listening on port 3400');
})
