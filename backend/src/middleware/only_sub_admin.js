import { jwtDecode } from "jwt-decode";

const only_sub_admin = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    try{
        if(token){
            const decoded = jwtDecode(token);
            if(decoded.usertype != "SS"){
                next();
            }
            else{
                return res.json({
                    message : "Permission Denied: Access to this task is unauthorized.",
                    state: 401
                });
            }
        }
    }
    catch(err){
        return res.status(401).json({
            message: err.message,
            status: 401
        });
    }
}

export default only_sub_admin;