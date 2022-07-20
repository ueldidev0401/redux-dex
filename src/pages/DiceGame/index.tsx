import React, { useState, useEffect } from "react";
import DiceGameLogo from "assets/img/dicegame.png";
import { dataAttributes } from "../../data/attributes";
import { Dice } from "../../components/DiceBox";
import Attributes from "../../components/Attributes";

import "./index.scss";

Dice.init().then(() => {
  // clear dice on click anywhere on the screen
  document.addEventListener("mousedown", () => {
    const diceBoxCanvas = document.getElementById("dice-canvas");
    // if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
      Dice.hide().clear();
    // }
  });
});

const DiceGame = () => {
  const [attr, setAttr] = useState(dataAttributes);
  const [pendingRoll, setPendingRoll] = useState<string | undefined>();

  // This method is triggered whenever dice are finished rolling
  Dice.onRollComplete = (results) => {
    console.log(results);

    const newState: any = attr;

    if (pendingRoll === "all") {
      Object.keys(newState).forEach((attr, i) => {
        newState[attr].total = results[i].value;
      });
    } else {
      newState[pendingRoll].total = results[0].value;
    }
    setAttr(newState);
  };

  // update attribute from numerical input
  const updateAttributes = (newState) => {
    console.log("update the attributes");
    setAttr(newState);
  };

  // trigger dice roll
  const rollDice = (notation, group) => {
    // save which attribute we're rolling for
    setPendingRoll(group);
    // trigger the dice roll
    Dice.show().roll(notation);
  };
  return (
    <div
      className="home-container mb-5"
      style={{ fontFamily: "Segoe UI", color: "white", marginTop: "28px" }}
    >
      <Attributes
        attributes={attr} // pass in attribute numbers from App state
        onRoll={rollDice} // pass down roll function
        onChange={updateAttributes} // pass down onChange function
      />
    </div>
  );
};

export default DiceGame;
