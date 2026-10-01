import employerModel from '../model/employerModel.js'
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

//SIGNINGUP EMPLOYER
export const signUp = async(req,res)=>{
    try{
        const {companyName,contactName,email,password,location} = req.body;
        const existingEmployer = await employerModel.findOne({email});
        if(existingEmployer){
            return res.status(409).json({message:"An account with this email alreay exist"})
        };
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const employer = await employerModel.create({companyName, contactName,email,password:hashedPassword,location});

        const token = generateToken(employer._id);
        return res.status(200).json({message:"sign up succesful",token,
            employer:{
                id:employer._id,
                companyName:employer.companyName,
                email:employer.email
            }
        });
    }catch(error){
        return res.status(500).json({message:"Error signing up",error:error.message})
    }
};


//LOGGING IN 

export const loggin = async(req,res)=>{
    try{
        const{email,password} = req.body;
        const employer = await employerModel.findOne({email}).select('+password');
        if(!employer){
            return res.status(404).json({message:"Employer not found"})
        };
        const isMatch = await bcrypt.compare(password,employer.password);
        if(!isMatch){
            return res.status(404).json({message:"invalid password"})
        };
        const token = generateToken (employer._id);
        return res.status(200).json({message:"loggin successful",token,
            employer:{
                id:employer._id,
                companyName:employer.companyName,
                email:employer.email
            }
        })
    }catch(error){
        return res.status(500).json({message:"Error logging in", error:error.message});
    }
};