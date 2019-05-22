import Button from "@material-ui/core/Button";
import React from "react";
import UserApi from "../../UserApi.js";


export default class Evaluation extends React.Component {


    render() {
        console.log(this.props, "eval");
        const user = this.props.players[`${this.props.playerID}`];
        const userName = UserApi.getName(this.props.playerID);
        const opponent = this.props.players[`${this.props.opponentID}`];
        const opponentName = UserApi.getName(this.props.opponentID);

        if(user){
            return (<div>

                <p>{userName}: {user.selection}</p>
                <p>{opponentName}: {opponent.selection}</p>
            </div>)
        }else{
            return (<div>Error</div>);
        }
    }
}