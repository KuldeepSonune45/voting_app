// Candidate Schema

const mongoose=require("mongoose");
const candidateSchema = new mongoose.Schema({
  name:{
    type: String, 
    required: true,
    unique:true
    },
  vote:{
    type:Number,
    default:0,
   }
});

// export schema
module.exports=mongoose.model("candidates",candidateSchema)