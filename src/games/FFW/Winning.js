import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

const gameOverMessages = {
Fire: {
    Fire: "Tie: Fire v Fire",
    water: "You lost: water covers Fire",
    Frost: "You won! Fire beats Frost",
  },
  Water: {
    Fire: "Tie: Water v Water",
    water: "You lost: Frost covers Water",
    Frost: "You won! Water beats Fire",
  },
  frost: {
    Fire: "Tie: Frost v Frost",
    water: "You lost: Frost covers Water",
    Frost: "You won! Frost beats Water",
  },
}



export default class Winning extends React.Component {

    render() {
        return (
            <div>
                <h1>Game Over</h1>
                <h2>{gameOverMessages[this.props.choice][this.props.opponent]}</h2>
            </div>
        );
    }



}


