import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({

    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true,
    },
    applicantName:{
        type:String,
        required:true,
    },
    applicantMail:{
        type:String,
        required:true,
    },
    coverNote:{
        type:String,
    },
    resumeUrl:{
        type:String,
        
    },
    status:{
        type:String,
        enum:['pending','reviewed','rejected','hired'],
        default:'pending',
    },
},{
    timestamps:true
});

export default mongoose.model('application', applicationSchema)