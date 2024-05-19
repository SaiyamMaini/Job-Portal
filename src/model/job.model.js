export default class JobModel{
    constructor(_id, _category, _designation, _location, _Cname, _salary, _positions, _skills, _date){
        this.id = _id;
        this.category = _category;
        this.designation = _designation;
        this.location =_location;
        this.Cname =_Cname;
        this.salary = _salary;
        this.positions = _positions
        this.skills = _skills;
        this.date = _date
        this.applicants = 0;
    }

    static getJobs(){
        return jobs;
    }

    static addjob(job){
        const id = jobs.length + 1;
        const category = job.category;
        const designation = job. designation;
        const location = job.location;
        const Cname = job.Cname;
        const salary = job.salary;
        const positions = job.positions;
        const skills = job.skills;
        const date = job.date;

        const newJob = new JobModel(id, category, designation, location, Cname, salary, positions, skills, date);
        jobs.push(newJob);
    }

    static getById(id){
        return jobs.find(p=> p.id == id)
      }

    static updateJob(jobObj){
        const index = jobs.findIndex(j=> j.id == jobObj.id);
        jobs[index] = jobObj;
    }  

    static deleteJob(id){
        const updateJobs = jobs.filter((job)=> job.id != id)
        updateJobs.map((j, index)=> j.id = index + 1);
        jobs = updateJobs;
    }
}

var jobs = [
    new JobModel(
    1,
    'Tech',
    'SDE',
    'Gurgaon HR IND Remote',
    'IND Money',
    '14-20',
    '5',
    ['HTML', 'CSS', 'JS'],
    '2024-05-18'
),

]