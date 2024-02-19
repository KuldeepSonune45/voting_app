import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {

    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");

    // Redirection purpose navigate

    const navigate=useNavigate();

    axios.defaults.withCredentials=true;

    // Handle Logins

    const handleLogin=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:7000/Login",{Email,Password})
        .then((res)=>{
        if(res.data.status===true){
            if(res.data.role==="Admin"){
                navigate("/AdminDashboard")
            }
            else{
                navigate("/VotingApp")
            }
        }
    })
    .catch((err)=>console.log("error",err));
    }

    return(
       <>
       <h1 id="login_title">Login Page</h1>
       
       {/* Login Form */}
       <div className="loginForm">
       <form onSubmit={handleLogin}>
          <label className="label">Email</label>
          <input type="text" placeholder="Username" onChange={(e)=>setEmail(e.target.value)} className="input"></input>
                <br></br><br></br>
          <label className="label">Password</label>
          <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} className="input"></input>
             <br></br><br></br>
           <button type="submit" className="logi1">Login</button>
           <Link to="/Register"><button type="submit" className="reg1">Register</button></Link>
       </form>
</div>
       <br></br>
     
       </>
    )
};
export default Login;