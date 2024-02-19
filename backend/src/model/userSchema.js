// User Schema 

const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    Username:String,
    Password:String,
    Email:String,
    Phone:String,
    role:{
        type:String,
        default:"user"
    }
})
module.exports=mongoose.model("userDetails",userSchema);