import jsonwebtoken from 'jsonwebtoken';

export const protect = async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){;
        return res.status(401).json({message:"Not authorized, no token provide"})
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET)
        req.employerId = decoded.id;
        next();
    }catch(error){
        console.log('JWT error:',error.message);
        return res.status(401).json({message:"Not authorized,invalid or expired token"})
    }
};

export default protect;