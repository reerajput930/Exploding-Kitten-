import React, { useState, useEffect } from "react";
import { Cards } from "./Cards";
import Shuffle from "./Shuffle";
import "./index.css";
import plancard from "./images/card.jpg";
import cat from "./images/cat.jpg";
import { BASE_URL } from "./Api";
import {Link} from "react-router-dom"


// id - 0 cat
// id - 1 exploding
// id - 2 shuffle
// id - 3 defuse

export default function Home() {
  const [totalCards, setTotalCards] = useState([]);
  let [defuseExplode, setDefuseExplode] = useState(0);
  let [score, setScore] = useState(0);
  let [cardLoad, setCardLoad] = useState(false);
  let [chosenCard, setChosenCard] = useState(plancard);

  useEffect(() => {
    function Shuffle() {
      // shuffle the list and display on screen
      let shuffledCards = [];

      // or loop will run 5 times and pick one element and add in shuffledCard
      let cardNo = 5;
      while (cardNo > 0) {
        // Cards[Math.floor(Math.random() * Cards.length)]
        cardNo--;

        shuffledCards.push(Cards[Math.floor(Math.random() * Cards.length)]);
      }
      setTotalCards(shuffledCards);
    }

    Shuffle();

    async function fetchUserScore() {
      const response = await fetch(
        `${BASE_URL}/api/singleuser/${localStorage.getItem("email")}`
      );
      const data = await response.json();
      console.log(data);
      // console.log(data.user.score)
      setScore(data.user.score);
    }

    fetchUserScore();
  }, []);

  async function updateScore() {
    console.log(localStorage.getItem("email"));
    console.log("score :", score);
    const response = await fetch(
      `${BASE_URL}/api/updatescore/${localStorage.getItem("email")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score }),
      }
    );
  }
  
  async function deluserdata(e){
    e.preventDefault()
    console.log("hi")

    const response = await fetch(
      `${BASE_URL}/api/deluser/${localStorage.getItem("email")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
     
      }
    );

    localStorage.removeItem("name")
    localStorage.removeItem("email")

    window.location.href = "./";

  }


  function chooseCard(card_id, index) {
    // console.log(card_id);
    // console.log(index);

    if (card_id == 0) {
      // it's cat card , one card will be removed
      setTotalCards(
        totalCards.filter((card, i) => {
          return i != index;
        })
      );
    }
    if (card_id == 1) {
      console.log("defuseExplode: ", defuseExplode);
      if (defuseExplode > 0) {
        defuseExplode--;
        setTotalCards(
          totalCards.filter((card, i) => {
            return i != index;
          })
        );
      } else {
        console.log("end game");
        setTimeout(() => {
          window.location.href = "./end";
        }, 2000);
      }
    }
    if (card_id == 2) {
      console.log("shuffle the 5 card again");
      function Shuffle() {
        let shuffledCards = [];
        // shuffle the list and display on screen

        console.log("totalCards length: ", totalCards.length);
        let cardNo = totalCards.length;
        while (cardNo > 0) {
          cardNo -= 1;

          shuffledCards.push(Cards[Math.floor(Math.random() * Cards.length)]);
        }
        setTotalCards(shuffledCards);
      }

      Shuffle();
    }

    if (card_id == 3) {
      setDefuseExplode((defuseExplode += 1));

      setTotalCards(
        totalCards.filter((card, i) => {
          return i != index;
        })
      );
    }

    if (totalCards.length - 1 == 0) {
      console.log("winner");
      setScore((score += 1));
      console.log(score);

      updateScore();

      setTimeout(() => {
        window.location.href = "./end";
      }, 1000);
    }

    console.log(totalCards);
  }

  return (
    <div className="block">

   

      <div className="userinfo" style={{ margin: "1em" }}>
        <h3>
          {localStorage.getItem("name")}'s score: {score}
        </h3>
      </div>

      <div className="card--block">
        {totalCards &&
          totalCards.map((card, index) => {
            return (
              <>
                <img
                  className="card"
                  onClick={(e) => {
                    chooseCard(card.id, index);
                    setChosenCard((chosenCard = card.img));
                    setCardLoad(true);
                  }}
                  style={{ height: "15em", cursor: "pointer", margin: "10px" }}
                  src={plancard}
                />
              </>
            );
          })}
      </div>
      {cardLoad && (
        <div className="choosen--one">
          <img
            className="reveal--card"
            src={chosenCard}
            style={{ height: "15em", margin: "5em" }}
          />
        </div>
      )}

      <div style={{position:"absolute" , bottom:"1em",cursor:"pointer",color:"red"}}> <h4 onClick={(e)=>{deluserdata(e)}}> Reset your detail</h4></div>
    </div>
  );
}
