import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
    },
    contactName:{
      type:String,
      required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        toLowerCase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:'false'
    },
    location:{
        type:String,
        required:true,
    },
    about:{
        type:String,
        required:true,
    },
    about:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true

});

export default mongoose.model('employer',employerSchema)
