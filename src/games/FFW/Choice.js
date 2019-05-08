import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";


export default class Choice extends React.Component {

    render() {
        return (<div>
            <button onClick={() => this.props.setSelection("Frost")}>Frost</button>
            <button onClick={() => this.props.setSelection("Fire")}>Fire</button>
            <button onClick={() => this.props.setSelection("Water")}>Water</button>
            <p>You picked {this.props.selection}</p>
            {this.props.selection && <button onClick={() => this.props.readyClick()}>Ready</button>}
        </div>)
    }
}