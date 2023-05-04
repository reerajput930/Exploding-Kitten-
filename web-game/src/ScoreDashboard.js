import React, { useState, useEffect } from "react";
import { BASE_URL } from "./Api";
import { Link } from "react-router-dom";
import "./index.css"

export default function ScoreDashboard() {
  const [users, setUsers] = useState([]);
  const [currentusers, setCorrentUsers] = useState();



  useEffect(() => {
    async function fetchAllUserScore() {
      const response = await fetch(`${BASE_URL}/api/allusers`);
      const data = await response.json();
      console.log(data);

      let sortedData = data.users.sort((a,b)=>{
        return b.score - a.score;
       })
      setUsers(data.users);
      console.log(data.users)
    }

    fetchAllUserScore();

    async function fetchUserScore() {
      const response = await fetch(
        `${BASE_URL}/api/singleuser/${localStorage.getItem("email")}`
      );
      const data = await response.json();
      console.log(data);
      setCorrentUsers(data.user);
    }

    fetchUserScore();
  }, []);

  console.log(users);
  console.log(currentusers);

  return (
    <div className="score--dashboard">
      <div className="current--users">
        {currentusers && (
          <h3 style={{marginTop:"5em"}}>
            {currentusers.name}'s score: {currentusers.score}
          </h3>
        )}
      </div>
        <h4 style={{color:"white",textAlign:"center"}}>Below is the Score Board record of online players! </h4>
      <div className="allplayers" style={{overflowY:"scroll"}}>
        <table>
          <th>Name</th>
          <th>Score</th>
          {users &&
            users.map((user) => {
              
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.score}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <div style={{ marginTop: "20px", cursor: "pointer" }} className="restart">
        <Link to="/gamestart"> <button style={{backgroundColor:"#144f61" , color:"white", padding:"10px 20px 10px 20px",borderRadius:"10px" ,border:"none"}} > Play again!</button></Link>
      </div>
    </div>
  );
}
