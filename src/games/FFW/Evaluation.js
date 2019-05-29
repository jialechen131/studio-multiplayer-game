import Button from "@material-ui/core/Button";
import React from "react";
import UserApi from "../../UserApi.js";
import firebase from 'firebase'

const mainStyle = {
    textAlign:'center',
    padding: '10%'
    

}

export default class Evaluation extends React.Component {

     constructor(props) {
        super(props);
        this.state = {
            user: "",
            userHealth: 0,
            userID : "",
            Opponent: "",
            OpponentHealth: 0,
            OpponentID: "",
            
        };
    }

    componentHP() {
        var id = this.props.match.params.id;
        this.sessionDatabaseRef = firebase.database().ref("/session/" + id);
        var currentUser = firebase.auth().currentUser.uid;

        this.sessionDatabaseRef.on("value", (snapshot) => {
            var sessionSnapshot = snapshot.val();
            if (sessionSnapshot === null) {
                return;
            }

            if (!sessionSnapshot.userID) {
                this.sessionDatabaseRef.update({ User: currentUser });
            }
            else if (!sessionSnapshot.opponent && currentUser !== sessionSnapshot.user) {
                this.sessionDatabaseRef.update({ opponent: currentUser });
            }

            this.setState({
                user: sessionSnapshot.user,
                user: sessionSnapshot.userHealth,
                opponent: sessionSnapshot.opponent,
                opponentHealth: sessionSnapshot.opponentHealth,
            });
        });
    }

        userAttack() {
        
        this.sessionDatabaseRef.update({ opponentHealth: this.state.playerTwoHealth - 1 });
    }

    opponentAttack() {
        
        this.sessionDatabaseRef.update({ userHealth: this.state.playerOneHealth - 1 });
    }
      gameReset() {
        this.sessionDatabaseRef.update({ playerOneHealth: 5 });
        this.sessionDatabaseRef.update({ playerTwoHealth: 5 });
    }






    

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
            return (<div style={mainStyle}> 

                <p style={{fontSize:'24px'}}>{userName}: {user.selection}</p>
                <p style={{fontSize:'24px'}}>{opponentName}: {opponent.selection}</p>
                <p style={{fontSize:'32px'}}>The winner is: {winner}</p>
            </div>)
        }else{
            return (<div>Error</div>);
        }
    }
}