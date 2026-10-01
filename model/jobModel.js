import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    employer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employer',
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        enum:['retail','food-service','delivery','trades','office','other'],
    },
    jobType:{
        type:String,
        required:true,
        enum:['full-time','part-time','gig','contract'],
    
    },
    location:{
        city:{
       type:String,
       required:true,
        },
        region:{
            type:String,
    },
    },
    pay:{
        amount:{
            type:Number,
            required:true
        },
        period:{
            type:String,
            required:true,
            enum:['hour','day','week','month','fixed']
        },
    },
status:{
    type:String,
    enum:['open','close'],
    default:'open',
},
   
},{
    timestamps:true,
});

export default mongoose.model('job',jobSchema)