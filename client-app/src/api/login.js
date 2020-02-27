import axios from 'axios';

import { API, SESSION } from '../stringConstants';

const bc = new BroadcastChannel(SESSION.CHANNEL_NAME);
bc.onmessage = function (e) {
    if (e.data.messageType === SESSION.NEW_SESSION) {
        sessionStorage.setItem(SESSION.SESSION_ID, e.data.sessionId);
        window.location.reload();
    } else if (e.data.messageType === SESSION.EXPIRE_SESSION) {
        let sessionId = sessionStorage.getItem(SESSION.SESSION_ID);
        if (sessionId === e.data.sessionId) {
            sessionStorage.removeItem(SESSION.SESSION_ID);
            window.location.reload();
        }
    }
}

const newSessionId = (sessionId) => {
    bc.postMessage({
        messageType: SESSION.NEW_SESSION,
        sessionId: sessionId
    });
}

const expireSession = (sessionId) => {
    bc.postMessage({
        messageType: SESSION.EXPIRE_SESSION,
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
        sessionStorage.setItem(SESSION.SESSION_ID, sessionId);
        newSessionId(sessionId);
        setTimeout(() => expireSession(sessionId), 28800000); // Expire client session after 8 hours
        setPage.home();
    })
    .catch(function (err) {
        console.log(err);
    });
}