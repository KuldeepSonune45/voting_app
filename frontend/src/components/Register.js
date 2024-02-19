import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate} from "react-router-dom";
const Register = () => {

    const [Username,setUsername]=useState("")
    const [Password,setPassword]=useState("")
    const [Email,setEmail]=useState("")
    const [Phone,setPhone]=useState("")

    // For Redirection Purpose
    const navigate=useNavigate();

    // handle when form submitted

    const submitForm=(e)=>{
        e.preventDefault()
        const isAdmin=false;
        Axios.post("http://localhost:7000/Register",{Username,Password,Email,Phone,isAdmin})
        .then((res)=>
        {
            if(res.data.status){
                navigate("/Login")
            }
        }
        )
        .catch((err)=>console.log("error",err))
    }

     return(
        <>
        <h1 id="reg">Register Page</h1>

        {/* form started */}
        <div className="register">
        <form onSubmit={submitForm}>
            <label className="label">Username :</label>
            <input type="text" name="username" placeholder="username" onChange={(e)=>setUsername(e.target.value)} className="input"/>
            <br></br><br></br>

            <label className="label">Password :</label>
            <input type="password" name="Password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} className="input"/>
            <br></br><br></br>

            <label className="label">Email :</label>
            <input type="text" name="Email" placeholder="Email ID" onChange={(e)=>setEmail(e.target.value)} className="input"/>
            <br></br><br></br>

            <label className="label">Phone :</label>
            <input type="text" name="Phone" placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} className="input"/>
            <br></br><br></br>
        
            <button type="submit" className="regi">Register</button> 
            <Link to="/Login"><button className="logi">Login</button> </Link>
        </form>
        </div>
          {/* form end */}
        </>
     )
};
export default Register;