import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
    // Visitor Fields
    visitor_name:{type:String, required: true},
    visitor_purpose:{type:String, required:true},
    visitor_mobile:{type:Number, required:true},
    visitor_email:{type:String, required:true, unique:true},
    visitor_address:{type:String, required:true},
    visit_date:{type:Date},
    // Person To Meet Fields
    ptm_name:{type:String, required:true},
    ptm_mobile:{type:Number, required:true},
    ptm_email:{type:String, required:true},
    ptm_address:{type:String, required:true}, 
    
    visitor_logout:{type:String},
    visitor_login:{type:String},
    visitor_image:{type:String},
    visit_completed:{type:String, required:true},
    visit_status:{type:String, required:true},
});

export const VisitorModel = mongoose.model('visitors', VisitorSchema);