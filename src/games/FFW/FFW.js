import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
// import Boostrap from 'react-bootstrap/Button';

export default class FFW extends GameComponent {
  render() {
    var id = this.getSessionId();
    var creatorId = this.getSessionCreatorUserId();
    var users = this.getSessionUserIds().map(user_id => (
      <li key={user_id}>{UserApi.getName(user_id)}</li>
    ));
    var creator = UserApi.getName(creatorId);
    var isHost = this.getMyUserId() === creatorId;
    return (
      <div>
        <h3>Hello, {isHost ? `Host` : `Guest`}</h3>
        <p>Session ID: {id}</p>
        <p>Session creator: {creator}</p>
        <p>Session users:</p>
        <ul> {users} </ul>
      </div>
    );
  }
}
