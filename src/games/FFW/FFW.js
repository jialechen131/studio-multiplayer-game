import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";
// import Boostrap from 'react-bootstrap/Button';

export default class FFW extends GameComponent {
  constructor(props) {
    super(props);
    this.getSessionDatabaseRef().set({ [this.getMyUserId()]: null });
    this.state = {
        selection: null
    };
  }
  onSessionDataChanged(data) {
    console.log("Data changed!", data);
  }

	setSelection(selection){
		this.setState({selection: selection});
		let key = this.getMyUserId();
		this.getSessionDatabaseRef().update({ [key]: selection });
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
      <div>
        <button onClick={()=>this.setSelection("Frost")}>Frost</button>
        <button onClick={()=>this.setSelection("Fire")}>Fire</button>
        <button onClick={()=>this.setSelection("Water")}>Water</button>
				<p>You picked {this.state.selection}</p>
      </div>
    );
  }
}
