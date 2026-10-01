import jsonwebtoken from 'jsonwebtoken';

const generateToken = (employerId)=>{
    return jsonwebtoken.sign(
        {id:employerId},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    );
};

export default generateToken;