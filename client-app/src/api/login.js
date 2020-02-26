import axios from 'axios';

import { API } from '../stringConstants';

const bc = new BroadcastChannel('uw_analytics_bc');
bc.onmessage = function (e) {
    if (e.data.messageType === 'newSession') {
        sessionStorage.setItem('sessionId', e.data.sessionId);
        window.location.reload();
    } else if (e.data.messageType === 'expireSession') {
        let sessionId = sessionStorage.getItem('sessionId');
        if (sessionId === e.data.sessionId) {
            sessionStorage.removeItem('sessionId');
            window.location.reload();
        }
    }
}

const newSessionId = (sessionId) => {
    bc.postMessage({
        messageType: 'newSession',
        sessionId: sessionId
    });
}

const expireSession = (sessionId) => {
    bc.postMessage({
        messageType: 'expireSession',
        sessionId: sessionId
    });
}

export const loginApi = (username, password, setPage) => {
    axios({
        method: 'post',
        url: API.URL + API.LOGIN,
        data: {
            userName: username,
            password: password
        },
        headers: {'Content-Type': 'application/json' }
    })
    .then(function (response) {
        let sessionId = response.headers.authorization
        sessionStorage.setItem('sessionId', sessionId);
        newSessionId(sessionId);
        setTimeout(() => expireSession(sessionId), 28800000); // Expire client session after 8 hours
        setPage.home();
    })
    .catch(function (err) {
        console.log(err);
    });
}