import Button from "@material-ui/core/Button";
import GameComponent from "../../GameComponent.js";
import React from "react";
import UserApi from "../../UserApi.js";

const mainStyle = {
    textAlign:'center',
    padding: '10%'

}

const btnStyle = {

    color: '#0099CC',
    background: 'transparent',
    border: '2px solid #0099CC',
    borderRadius: '6px',
    padding: '16px 32px',
    textAlign: 'center',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    textTransform: 'uppercase'

}

const emoji= {
    Frost:'⛄️',
    Fire:'🔥',
    Water:'💦'
}


export default class Choice extends React.Component {

    render() {
        return (<div  style = {mainStyle}>
            <button  style = {btnStyle} onClick={() => this.props.setSelection("Frost")}>Frost</button>
            <button  style = {btnStyle}  onClick={() => this.props.setSelection("Fire")}>Fire</button>
            <button  style = {btnStyle} onClick={() => this.props.setSelection("Water")}>Water</button>
            <p style={ {fontSize:'32px'}}>You picked: {emoji[this.props.selection]}</p>
            {this.props.selection && <button style = {btnStyle} onClick={() => this.props.readyClick()}>Ready</button>}
        </div>)
    }
}