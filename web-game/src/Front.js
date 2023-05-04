import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from "./Api";
import React, { useState, useEffect } from "react";
import rules from "./images/rules.png";

export default function Front() {
  const [userinfo, setUserinfo] = useState({
    name: "",
    email: "",
  });

  // if the user is already present , directing to game
  useEffect(() => {
    console.log(localStorage.getItem("name") && localStorage.getItem("email"));
    if (localStorage.getItem("name")) {
      window.location.href = "/gamestart";
    }
  }, []);

  async function onSubmit(e) {
    e.preventDefault();

    console.log(userinfo);
    const response = await fetch(`${BASE_URL}/api/adduser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userinfo),
    });

    const data = await response.json();
   
    if (data.status == "success") {
      localStorage.setItem("name", userinfo.name);
      localStorage.setItem("email", userinfo.email);
      window.location.href = "/gamestart";
    }

    else if(data.status == "failed"){
      window.alert("nope! Enter full detail first :)")
    }
  }
  console.log(userinfo);

  return (
    <div>
      <div className="container mt-5">
        <h2 className="mb-3" style={{ color: "white" }}>
          Your Detail Before Entering the game!
        </h2>

        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              value={userinfo.name}
              onChange={(e) =>
                setUserinfo({ ...userinfo, name: e.target.value })
              }
              className="form-control"
              id="name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              value={userinfo.email.toLowerCase()}
              onChange={(e) =>
                setUserinfo({ ...userinfo, email: e.target.value })
              }
              className="form-control"
              id="email"
              required
            />
          </div>

          <button onClick={onSubmit} className="btn btn-danger" type="submit">
            Submit
          </button>
        </form>
        <h3 style={{ marginTop: "20px", marginBottom: "20px" }}>Game Rules!</h3>
        <img src={rules} className="rules" />
      </div>
    </div>
  );
}
