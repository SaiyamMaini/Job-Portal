export default class JobSeekerModel{
    constructor(_jobId, _id, _name, _contact, _email, _resumeUrl){
        this.jobId = _jobId;
        this.id = _id;
        this.name = _name;
        this.contact = _contact;
        this.email = _email;
        this.resumeUrl = _resumeUrl;
    }

    static addApplicant(user, url){
        let id = applicants.length + 1;
        let jobId = user.id;
        let name = user.name;
        let contact = user.contact;
        let email = user.email;
        let resumeurl = url
        let newApplicant = new JobSeekerModel(jobId, id, name, contact, email, url);
        applicants.push(newApplicant);
        return newApplicant;
    }

    static getApplicants(){
        return applicants;
    }

    static getApplicantsById(id){
        return applicants.filter(p=> p.jobId == id)
    }

    static getById(id){
        const applicant = applicants.find(p=> p.id == id)
        return applicant.resumeUrl;
    }
}

var applicants =[];