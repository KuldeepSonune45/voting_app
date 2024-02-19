import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css";
import { useNavigate } from 'react-router-dom';
function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);

  axios.defaults.withCredentials=true;
  const navigate=useNavigate();
  // useEffect
  useEffect(() => {
    axios.get('http://localhost:7000/api/candidates')
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  const Logout=()=>{
    axios.get("http://localhost:7000/auth/Logout")
   .then((res)=>{
      if(res.data.status){
        navigate("/Login")
      }
   })
   .catch((err)=>console.log(err))
  }
return(
    <div>
       <div id='vote_flex'>
      <h1 className="voting_title_Admin">Admin Dashboard</h1>
      <h3 id='logout' onClick={()=>Logout()}>Logout</h3>
      </div>

      <ul>
        {candidates.map(candidate => (
          <div key={candidate._id} className="admincss">
           <h3 id='candi'>{candidate.name}</h3> <h3 id='hifan'>-</h3> <h3 id="vote">Votes: {candidate.vote}</h3>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;