import Button from "@material-ui/core/Button";
import React from "react";
import UserApi from "../../UserApi.js";


export default class Evaluation extends React.Component {


    render() {
        const user = this.props.players[`${this.props.userID}`];
        const userName = UserApi.getName(this.props.userID);
        const opponent = this.props.players[`${this.props.opponentID}`];
        const opponentName = UserApi.getName(this.props.opponentID);


        return (<div>
            <p>{userName}: {user.selection}</p>
            <p>{opponentName}: {opponent.selection}</p>
        </div>)
    }
}