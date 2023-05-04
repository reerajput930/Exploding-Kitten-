import React, { useState, useEffect } from "react";
import { BASE_URL } from "./Api";
import { Link } from "react-router-dom";

export default function ScoreDashboard() {
  const [users, setUsers] = useState([]);
  const [currentusers, setCorrentUsers] = useState();

  useEffect(() => {
    async function fetchAllUserScore() {
      const response = await fetch(`${BASE_URL}/api/allusers`);
      const data = await response.json();
      console.log(data);
      setUsers(data.users);
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
          <h3>
            {currentusers.name}'s score: {currentusers.score}
          </h3>
        )}
      </div>
      <div className="allplayers">
        <table>
          <th>name</th>
          <th>score</th>
          {users &&
            users.map((user) => {
              console.log(user);
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
        <Link to="/gamestart"> Play again!</Link>
      </div>
    </div>
  );
}
