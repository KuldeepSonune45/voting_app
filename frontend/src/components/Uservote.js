import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"
import { useNavigate } from 'react-router-dom';
function VotingApp() {
  const [candidates, setCandidates] = useState([]);

  axios.defaults.withCredentials=true;
  // useEffect
   const navigate=useNavigate();

  useEffect(() => {
    axios.get('http://localhost:7000/api/candidates')
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  // handles vote
  const vote = (id) => {
    axios.post(`http://localhost:7000/api/vote/${id}`)
      .then(response => {
        const updatedCandidates = candidates.map(candidate =>
          candidate._id === id ? response.data : candidate
        );
        setCandidates(updatedCandidates);
      })
      .catch(error => console.error('Error voting:', error));
      if(candidates){
        alert("Vote Submitted Successfully");
      }
  };

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
      <h1 className="voting_title">Voting App</h1>
      <h3 id='logout' onClick={()=>Logout()}>Logout</h3>
      </div>
      <ul>
        {candidates.map(candidate => (
          <div key={candidate._id} className="candidateCSS">
            {candidate.name}
            <button onClick={() => vote(candidate._id)} className='btn'>Vote</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default VotingApp;