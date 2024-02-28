import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{type:String, required: true, unique: true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    mobile:{type:Number, required:true},
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    city:{type:Object, required:true},
    country:{type:Object, required:true},
    usertype:{type:Object, required:true},
    designation:{type:Object, required:true},
    gender:{type:Object, required:true},
    age:{type:Number, required:true},
    salary:{type:Number, required:true},
})

export const UserModel = mongoose.model('users', UserSchema);