import applicationModel from '../model/applicationModel.js';
import jobModel from '../model/jobModel.js';


//APPLYTO JOB
export const applyToJob =async(req,res)=>{
    try{
        const{id} = req.params;
        const{applicantName,applicantMail,coverNote} = req.body;

        const job = await jobModel.findById(id)

        if(!job){
            return res.status(404).json({message:"job not found"})
        };
        if(job.status==='closed'){
            return res.status(400).json({message:"This job is no longer accepting application"})
        };

        const application = await applicationModel.create({
            job:id,
            applicantName,
            applicantMail,
            coverNote,

           });
           return res.status(201).json({message:"Application submitted successfully",application})
    }catch(error){
        return res.status(500).json({message:"error submitting application",error:error.message})
    }
};


//GETAPPLICATION FOR JOB
export const getApplicationForJob = async(req,res)=>{
    try{
        const {id} = req.params;
        const job = await jobModel.findById(id);
        if(!job){
            return res.status(404).json({message:"job not found"})
        };
        if(job.employer.toString()!==req.employerId){
            return res.status(403).json({message:"Not authorized to view application for this job"});
        };
        const application = await applicationModel.find({job:id})
        return res.status(200).json({message:"Application Retrieved successfully",application})
    }catch(error){
        return res.status(500).json({message:"Error retrieving application",error:error.message})
    }
};