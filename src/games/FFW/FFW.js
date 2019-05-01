import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import Choice from "./Choice.js"
// import Boostrap from 'react-bootstrap/Button';

export default class FFW extends GameComponent {
    constructor(props) {
        super(props);
        this.getSessionDatabaseRef().set({
            players: {
                [this.getMyUserId()]: ""
            },
            phase: "choice"
        });
        this.state = {
            selection: null,
            phase: "choice"
        };
    }
    onSessionDataChanged(data) {
        let keys = Object.keys(data.players);
        console.log("Data changed!", data);

        console.log(keys);

        if (keys[0] && keys[0] !== "" && keys[1] && keys[1] !== "") {
            this.getSessionDatabaseRef().set({
                phase: "evaluation"
            });
        }

        //Evaluation Object.keys.length == 2
    }

    setSelection = (selection) => {
        this.setState({ selection: selection });
        let key = this.getMyUserId();
        this.getSessionDatabaseRef().update({players: {
            [key]: selection
        }});
    }


    render() {
        var id = this.getSessionId();
        var creatorId = this.getSessionCreatorUserId();
        // var users = this.getSessionUserIds().map(user_id => (
        //   <li key={user_id}>{UserApi.getName(user_id)}</li>
        // ));
        var creator = UserApi.getName(creatorId);
        var isHost = this.getMyUserId() === creatorId;
        return (
            <div className="main">
                {this.state.phase === "choice" && <Choice setSelection={this.setSelection} selection={this.state.selection} />}
            </div>
        );
    }
}
