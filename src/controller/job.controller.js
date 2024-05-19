import JobModel from "../model/job.model.js";
import UserModel from "../model/user.model.js"
import JobSeekerModel from "../model/jobSeeker.model.js";
export default class JobController{
    getJobs(req, res){
        const jobs = JobModel.getJobs()
        console.log(jobs);
        if(req.session.userEmail){
            const user = UserModel.findByEmail(req.session.userEmail);
            res.render('alljobs',{jobs:jobs, userEmail: req.session.userEmail, user:user});
        }else{
            res.render('alljobs',{jobs:jobs});
        }
        
    }

    displayPostJob(req, res){
        const jobs = JobModel.getJobs()
        const user = UserModel.findByEmail(req.session.userEmail);
        res.render('postjob',{jobs:jobs, userEmail: req.session.userEmail, user:user});
    }

    postJob(req, res){
        console.log(req.body);
        JobModel.addjob(req.body)
        const jobs = JobModel.getJobs();
        const user = UserModel.findByEmail(req.session.userEmail);
        res.render('alljobs',{jobs:jobs, userEmail: req.session.userEmail, user:user});
    }

    detailJobView(req, res){
        const id = req.params.id;
        const job = JobModel.getById(id);
        if(req.session.userEmail){
            const user = UserModel.findByEmail(req.session.userEmail);
            res.render('job',{job:job, userEmail: req.session.userEmail, user:user});
        }else{
            res.render('job', {job:job});
        }
        
    }

    applyToJob(req, res){
        const resumeUrl = 'resume/' + req.file.filename;
        const applicant = JobSeekerModel.addApplicant(req.body, resumeUrl);
        const {id} = req.body;
        const job = JobModel.getById(id);
        job.applicants++;
        console.log(job.applicants)
        console.log(applicant);
        res.render('job', {job:job, userEmail: req.session.userEmail});
    }

    applicantsView(req, res){
        const id = req.params.id;
        const applicants = JobSeekerModel.getApplicantsById(id);
        
        console.log(applicants);
        res.render('applicants',{applicants:applicants})
    }

    applicantsResumeView(req, res){
        const id = req.params.id;
        const url = JobSeekerModel.getById(id)
         console.log(url);
        res.render('home');
    }

    // for updating the job
    updateJobView(req, res){
        const id = req.params.id;
        const job = JobModel.getById(id);
        if(job){
            const user = UserModel.findByEmail(req.session.userEmail);
            console.log(user);
            res.render('update-job',{job:job, user:user,userEmail: req.session.userEmail})
        }else{
            res.status(401).send('Job not Found');
        }
    }

    updatedJob(req, res){
        console.log(req.body);
        JobModel.updateJob(req.body);
        const jobs = JobModel.getJobs();
        const user = UserModel.findByEmail(req.session.userEmail);
        res.render('alljobs',{jobs:jobs, user:user, userEmail: req.session.userEmail});
    }

    deleteJob(req, res){
        JobModel.deleteJob(req.params.id);
        const jobs = JobModel.getJobs();
        const user = UserModel.findByEmail(req.session.userEmail);
        res.render('alljobs',{jobs:jobs, user:user, userEmail: req.session.userEmail});

    }
}