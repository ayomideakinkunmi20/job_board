import mongoose from 'mongoose'

const connectDB = async(req,res)=>{
    try{
        await mongoose.connect(process.env.LIVE_URL)
        console.log('Database connected successfully')
    }catch(error){
        console.error('Database connection failed',error.message)
    }
};
export default connectDB