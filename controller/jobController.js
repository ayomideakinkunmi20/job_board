import jobModel from '../model/jobModel.js'


//CREATING JOB

export const createJob = async(req,res)=>{
    try{
        const {title,description,category,jobType,location,pay} = req.body;
        const job = await jobModel.create({
            employer:req.employerId,
            title,
            description,
            category,
            jobType,
            location,
            pay
        });
        return res.status(201).json({message:"Job created successfully",job})
    }catch(error){
        return res.status(500).json({message:"Erorr creating job",error:error.message})
    }
};


//GETALL JOB
export const getAllJob = async(req,res)=>{
    try{
        const getAll = await jobModel.find();
        return res.status(200).json({message:"jobs secured successfully",jobs:getAll});
    
    }catch(error){
        return res.status(500).json({message:"Erorr securing job",error:error.message})
    }
};


//GETONEJOB
export const getOne = async(req,res)=>{
    try{
        const job = await jobModel.findById(req.params.id);
        if(!job){
            return res.status(404).json({message:"job not found"})
        };
        return res.status(200).json({message:"job retrieved successfully",job})
        
        }catch(error){
        return res.status(500).json({message:"Erorr retrieving job",error:error.message})
        
    }
};

//UPDATE JOB
export const updateJob = async(req,res)=>{
    try{
    const{id}=req.params;
    const job = await jobModel.findById(id);
    if(!job){
        return res.status(404).json({message:"job not found"})
    };
    if(job.employer.toString()!==req.employerId){
        return res.status(403).json({message:"Not authorzed to update this job"})
    }

    const {title, description,category,jobType,location,pay,status} = req.body;
    if(title) job.title = title;
    if(description)job.description=description;
    if(category) job.category = category;
    if(jobType) job.jobType = jobType;
    if(location) job.location = location;
    if(pay) job.pay = pay;
    if(status) job.status = status;

    const updatedJob = await job.save();
    return res.status(200).json({message:"job updated successfully",job:updatedJob})
}catch(error){
    return res.status(500).json({message:"Erorr updating job", error:error.message})
}

};

//DELETE JOB
export const deleteJob = async (req,res)=>{
    try{
        const {id}= req.params;
        const job = await jobModel.findById(id);

        if(!job){
            return res.status(404).json({message:"job not found"})
        }
        if(job.employer.toString() !== req.employerId) {
            return res.status(403).json({message:"Not authoized to delete this job"})
        }
        await jobModel.findByIdAndDelete(id);
        return res.status(200).json({message:"job deleted successfully"})
    }catch(error){
        return res.status(500).json({message:"Erorr deleting job-", error:error.message})
    }
};