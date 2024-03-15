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
            visitor_login: "",
            visitor_logout: "",
            visit_date,
            visit_status: "pending",
            visit_completed: "no",
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
    const { visit_status } = req.query;
    // console.log("Query", visit_status);
    try {
        var visitors = null;
        switch (visit_status) {
            case "pending":
                visitors = await VisitorModel.find({ visit_status });
                break;
            case "accepted":
                visitors = await VisitorModel.find({ visit_status });
                break;
            case "rejected":
                visitors = await VisitorModel.find({ visit_status });
                break;
            default:
                visitors = await VisitorModel.find();
                break;
        }
        if (visitors.length > 0) {
            return res.json({
                data: visitors,
                status: 200
            });
        } else {
            return res.json({
                message: "No data found",
                status: 200
            });
        }
    } catch (err) {
        return res.json({ message: err.message, status: err.status });
    }
}

var visitorApprovalController = async (req, res) => {
    // const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    // function parseJwt (token) {
    //     return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    // }
    // var parseToken = parseJwt(token);
    // console.log("parse: ", parseToken);

    const { visitor_mobile, approval } = req.query;
    try {
        const visitor = await VisitorModel.findOne({ visitor_mobile })
        if (visitor) {
            visitor.visit_status = approval;
            await visitor.save();
            let message = approval == 'accepted' ? 'Visit Accected' : 'Visit Rejected';
            return res.json({
                message: message,
                status: 200
            });
        } else {
            return res.json({
                message: "No data found",
                status: 404
            });
        }

    }
    catch (err) {
        return res.json({ message: err.message, status: err.status });
    }
}

export { createVisitorController, visitorListController, visitorApprovalController };