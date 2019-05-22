import Button from "@material-ui/core/Button";
import React from "react";
import UserApi from "../../UserApi.js";


export default class Evaluation extends React.Component {

    getWinner(userName, userChoice, opponentName, opponentChoice) {
        if(userChoice === "Fire"){
            if(opponentChoice === "Fire"){
                return "Nobody";
            } else if (opponentChoice === "Frost") {
                return userName;
            } else if (opponentChoice === "Frost") {
                return opponentName;
            }
        } else if(userChoice === "Frost"){
            if(opponentChoice === "Fire"){
                return opponentName;
            } else if (opponentChoice === "Frost") {
                return "Nobody";
            } else if (opponentChoice === "Frost") {
                return userName;
            }
        } else if(userChoice === "Water"){
            if(opponentChoice === "Fire"){
                return userName;
            } else if (opponentChoice === "Frost") {
                return opponentName;
            } else if (opponentChoice === "Frost") {
                return "Nobody";
            }
        }
    }

    render() {
        console.log(this.props, "eval");
        const user = this.props.players[`${this.props.playerID}`];
        const userName = UserApi.getName(this.props.playerID);
        const userChoice = user.selection;
        const opponent = this.props.players[`${this.props.opponentID}`];
        const opponentName = UserApi.getName(this.props.opponentID);
        const opponentChoice = opponent.selection;

        const winner = this.getWinner(userName, userChoice, opponentName, opponentChoice);

        if(user){
            return (<div>

                <p>{userName}: {user.selection}</p>
                <p>{opponentName}: {opponent.selection}</p>
                <p>The winner is {winner}</p>
            </div>)
        }else{
            return (<div>Error</div>);
        }
    }
}