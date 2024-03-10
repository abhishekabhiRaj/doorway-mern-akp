import jsonwebtoken from 'jsonwebtoken';

const jwt_auth = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message: 'No token provided',
            status: 401
        });
    }
    try{
        jsonwebtoken.verify(token, 'secret', (error, decoded)=>{
            if(error){
                return res.status(401).json({
                    message: error.message,
                    status: 401
                });
            }else{
                req.email = decoded.email;
                req.usertype = decoded.usertype;
                next();
            }
        });
    }
    catch(err){
        return res.status(401).json({
            message: err.message,
            status: 401
        });
    }
}

export default jwt_auth;