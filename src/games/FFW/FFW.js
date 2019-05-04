import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
import Choice from "./Choice.js"
import Evaluation from "./Evaluation.js"
// import Boostrap from 'react-bootstrap/Button';

export default class FFW extends GameComponent {
    constructor(props) {
        super(props);
        this.getSessionDatabaseRef().child('players/' + this.getMyUserId()).set({
            selection: null,
            ready: false
        });
        this.getSessionDatabaseRef().set({
            phase: "choice"
        });
        this.state = {
            selection: null,
            ready: false,
            phase: "choice"
        };
    }
    onSessionDataChanged(data) {
        this.setState({
            phase: `${data.phase}`
        });

        if (data.players) {
            let keys = Object.keys(data.players);
            console.log("Data changed!", data);

            if (data.players[keys[0]] && data.players[keys[1]]) {
                if (data.players[keys[0]].ready && data.players[keys[1]].ready) {
                    this.getSessionDatabaseRef().set({
                        phase: "evaluation"
                    });
                    this.getSessionDatabaseRef().child('players/' + this.getMyUserId()).set({
                        ready: false
                    });
                    this.setState({
                        phase: "evaluation",
                        ready: false
                    });
                }
            }
        }
        //Evaluation Object.keys.length == 2
    }

    setSelection = (selection) => {
        this.setState({ selection: selection });
        let key = this.getMyUserId();
        this.getSessionDatabaseRef().child('players/' + key).update({
            selection: selection
        });
    }

    readyClick = () => {
        this.setState({ready: true});
        this.getSessionDatabaseRef().child('players/' + this.getMyUserId()).update({
            ready: true
        });
    }

    RenderPhase(props) {
        if (props.state.phase === "choice") {
            return (<Choice setSelection={props.setSelection} selection={props.state.selection} readyClick={props.readyClick}/>);
        } else if (props.state.phase === "evaluation") {
            return (<Evaluation />);
        }
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
                <this.RenderPhase state={this.state} setSelection={this.setSelection} selection={this.state.selection} readyClick={this.readyClick} />
            </div>
        );
    }
}
