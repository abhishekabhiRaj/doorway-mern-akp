import { VisitorModel } from "../models/VisitorModel.js";

var createVisitorController = async (req, res) => {
    try {
        const { 
            visitor_name,
            visitor_mobile,
            visitor_email,
            visitor_address,
            visitor_image,
            visitor_purpose,
            visit_date,
            ptm_name,
            ptm_mobile,
            ptm_email,
            ptm_address, 
        } = req.body;
        const newVisitor = new VisitorModel({
            visitor_name,
            visitor_mobile,
            visitor_email,
            visitor_address,
            visitor_image,
            visitor_purpose,
            visitor_login:"",
            visitor_logout:"",
            visit_date,
            visit_status:"pending",
            visit_completed:"no",
            visit_date,
            ptm_name,
            ptm_mobile,
            ptm_email,
            ptm_address,
        });
        await newVisitor.save();
        return res.json({ message: "created successfully" });
    }
    catch (error) {
        return res.json({ message: error.message });
    }
};

var visitorListController = async (req, res) => {
    try {
        const visitors = await VisitorModel.find();
        if(visitors.length > 0) {
            return res.json({
                data : visitors,
                status: 200
            });
        }else{
            return res.json({
                message: "No data found",
                status: 200
            });
        }
    }catch (err) {
        return res.json({ message: err.message, status: err.status});
    }
}

export { createVisitorController, visitorListController };