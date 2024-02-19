const express=require("express");
const app=express();
const cors=require("cors");
const Users=require("./src/model/userSchema");
const Candidate=require("./src/model/candiate")
const bcryt=require("bcrypt")
app.use(express.json());
app.use(cors({
  origin:["http://localhost:3001"],
  credentials:true
}))
const jwt=require("jsonwebtoken");
const SECRET_KEY="secretkeydata";
require("./src/model/config");
require("cookie-parser");

// User And Admin Registration

app.post("/Register",async(req,res)=>{
    const {Username,Password,Email,Phone,isAdmin}=req.body;
 
    const user=await Users.findOne({Email});
    if(user){
        return res.json({message:"User Already Registered"})
    }

    const hashpassword=await bcryt.hash(Password,10);
    const useData=new Users({
        Username:Username,
        Password:hashpassword,
        Email:Email,
        Phone:Phone,
    })
    await useData.save();
    return res.json({status:true,message:"user successfully registered"})
})

// User And Admin Login

app.post("/Login",async(req,res)=>{
    const {Email,Password}=req.body;
    const user=await Users.findOne({Email});
    if(!user){
        return res.json({message:"User is not registered"})
    }
    const validPassword=await bcryt.compare(Password,user.Password)
    if(!validPassword){
        return res.json({message:"Password incorrect"})
    }
    const token=jwt.sign({Username:user.Username},SECRET_KEY,{expiresIn:"60000"});
    res.cookie('token',token,{httpOnly:true,maxAge:60000});
    return res.json({status:true,role:user.role,token})
})


// Get all Candidate name and vote

app.get('/api/candidates', async (req, res) => {
  const data=await Candidate.find();
  res.json(data)
});

// candidate vote update

app.post('/api/vote/:id',async(req,res)=>{
  const {id}=req.params;
  try{
    const candidate=await Candidate.findByIdAndUpdate(id,{$inc:{vote:1}});
    res.json(candidate);
  }
  catch(error){
    res.status(500).json({error:"error voting"});
  }
});

// Logout

app.get("/auth/Logout",(req,res)=>{
   res.clearCookie('token');
   return res.json({status:true})
})

// Listen port On 7000

app.listen(7000) 