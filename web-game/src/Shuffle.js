import { Cards } from "./Cards";

export let shuffledCards = [];

export default function Shuffle() {
  // shuffle the list and display on screen
  shuffledCards = [];

  // or loop will run 5 times and pick one element and add in shuffledCard
  let cardNo = 5;
  while (cardNo > 0) {
    // Cards[Math.floor(Math.random() * Cards.length)]
    cardNo--;

    shuffledCards.push(Cards[Math.floor(Math.random() * Cards.length)]);
  }

  
}
