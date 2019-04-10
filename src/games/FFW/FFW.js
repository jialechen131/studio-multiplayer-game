import Button from '@material-ui/core/Button';
import GameComponent from '../../GameComponent.js';
import React from 'react';
import UserApi from '../../UserApi.js';
import Boostrap from 'react-bootstrap/Button';

export default class FFW extends GameComponent {
    render() {
        var id = this.getSessionId();
        var users = this.getSessionUserIds().map((user_id) => (<li key={user_id}>{ user_id }</li>));
        var creator = this.getSessionCreatorUserId();
        return (
            <div>
                <p>Session ID: {id}</p>
                <p>Session creator: {creator}</p>
                <p>Session users:</p>
                <ul> {users} </ul>
            </div>

        );
    }
}
