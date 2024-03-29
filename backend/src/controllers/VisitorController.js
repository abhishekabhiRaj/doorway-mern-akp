import { VisitorModel } from "../models/VisitorModel.js";
import { mailer } from "../helpers/mailer.js";
import QRCode from "qrcode";
import moment from 'moment';

// Controller For Creating Visit
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

// Controller For Getting Visit List
var visitorListController = async (req, res) => {
    const { visit_status } = req.query;
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

// Controller For Approving Visit 
var visitorApprovalController = async (req, res) => {
    const { visitor_mobile, approval } = req.query;
    
    try {
        const visitor = await VisitorModel.findOne({ visitor_mobile });
        if (visitor) {
            visitor.visit_status = approval;
            await visitor.save();
            // QR Code
            let message = approval == 'accepted' ? 'Visit Accected' : 'Visit Rejected';
            let table = approval == 'accepted' ?
            {
                data: [
                    {
                        "Date": visitor.visit_date,
                        "Person To Meet": visitor.ptm_name,
                        "Person To Meet Mobile": visitor.ptm_mobile,
                        "Visit Purpose": visitor.visitor_purpose,
                        "Visit Address": visitor.ptm_address,
                    },
                ],
                columns: {
                    // Optionally, customize the column widths
                    customWidth: {
                        "Date": '20%',
                        "Person To Meet": '20%',
                        "Person To Meet Mobile": '20%',
                        "Visit Purpose": '20%',
                        "Visit Address": '20%',
                    },
                    // Optionally, change column text alignment
                    customAlignment: {
                        price: 'right'
                    }
                }
            }:false;
            
            let to = visitor.visitor_email;
            let sub = "Visit Approval";
            QRCode.toDataURL(to,{width:400, height:400, type: 'image/png'})
                .then(url => {
                    var response = {
                        body: {
                            name: visitor.visitor_name,
                            intro: approval == 'accepted' ? `Your Visit is Accected. Kindly check the details below.` : 'We are very sorry that your visit had been rejected.',
                            table: table,
                        },
                    }
                    approval == 'accepted' ?
                    mailer(response, to, sub, url, 'image.png'):
                    mailer(response, to, sub)
                })
                .catch(err => {
                    console.error(err)
            });
            
            
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

// Controller For Check In Visitor
var visitorCheckinoutController = async (req, res) => {
    const {email, check_in_out} = req.query;
    const token = req.headers?.authorization?.split(' ')[1];
    console.log(token);
    if(!email){
        return res.json({
            message : "Email Not Provided!",
            status:401
        })
    }
    try{
        let visitor = await VisitorModel.findOne({ visitor_email : email });
        if(visitor){
            if(check_in_out == 'i'){
                visitor.visitor_login = moment().format('DD-MM-YYYY HH:mm A');
                await visitor.save();
                return res.json({
                    message : "Visitor Checked In Successfully!",
                    status: 200
                })
            }else{
                if(visitor.visit_completed == "no"){
                    return res.json({
                        message : "Visit is not completed!",
                        status: 200
                    })
                }
                if(visitor.visitor_login != ""){
                    visitor.visitor_logout = moment().format('DD-MM-YYYY HH:mm A');
                    await visitor.save();
                    return res.json({
                        message : "Visitor Checked Out Successfully!",
                        status: 200
                    })
                }else{
                    return res.json({
                        message : "Visitor Is Not Checked In!",
                        status: 400
                    })
                }
            }
            
        }else{
            return res.json({
                message : "Not Visitor Found By This Email!",
                status: 401
            })
        }
    }
    catch (err) {
        return res.json({ message: err.message, status: err.status });
    }
}

// Controller For Check In Visitor
var visitorMarkCompleteController = async (req, res) => {
    const {email} = req.query;
    if(!email){
        return res.json({
            message : "Email Not Provided!",
            status:401
        })
    }
    try{
        let visitor = await VisitorModel.findOne({ visitor_email : email });
        if(visitor){
            if(visitor.visitor_login != ''){
                visitor.visit_completed = "yes";
                await visitor.save(); 
                return res.json({
                    message : "Visit Marked As Completed!",
                    status: 200
                });
            }else{
                return res.json({
                    message : "Visitor Had Not Logged In Yet!",
                    status: 401
                })
            }
        }else{
            return res.json({
                message : "Not Visitor Found By This Email!",
                status: 401
            })
        }
    }
    catch (err) {
        return res.json({ message: err.message, status: err.status });
    }
}

export {
    createVisitorController,
    visitorListController,
    visitorApprovalController,
    visitorCheckinoutController,
    visitorMarkCompleteController
 };