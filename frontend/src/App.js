import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import VotingApp from './components/Uservote';
import AdminDashboard from './components/AdminDashboard';
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <BrowserRouter >
         <Routes >
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/VotingApp" element={<VotingApp/>}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
