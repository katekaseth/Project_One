package sessions

import (
	"errors"
	"net/http"
	"strings"
)

const headerAuthorization = "Authorization"
const paramAuthorization = "auth"
const schemeBearer = "Bearer "

//ErrNoSessionID is used when no session ID was found in the Authorization header
var ErrNoSessionID = errors.New("no session ID found in " + headerAuthorization + " header")

//ErrInvalidScheme is used when the authorization scheme is not supported
var ErrInvalidScheme = errors.New("authorization scheme not supported")

//BeginSession creates a new SessionID, saves the `sessionState` to the store, adds an
//Authorization header to the response with the SessionID, and returns the new SessionID
func BeginSession(signingKey string, store Store, sessionState interface{}, w http.ResponseWriter) (SessionID, error) {
	sid, err := NewSessionID(signingKey)
	if err != nil {
		return InvalidSessionID, err
	}

	//- save the sessionState to the store
	store.Save(sid, sessionState)

	//- add a header to the ResponseWriter that looks like this:
	//    "Authorization: Bearer <sessionID>"
	w.Header().Add(headerAuthorization, schemeBearer+string(sid))
	return sid, nil
}

//GetSessionID extracts and validates the SessionID from the request headers
func GetSessionID(r *http.Request, signingKey string) (SessionID, error) {
	authHeader := r.Header.Get(headerAuthorization)
	authParams, _ := r.URL.Query()[paramAuthorization]
	id := ""
	err := ErrInvalidScheme
	if authHeader != "" {
		id, err = verifyAuthScheme(authHeader)
	} else if len(authParams) != 0 { // get from the url param
		id, err = verifyAuthScheme(authParams[0])
	}

	if err != nil {
		return InvalidSessionID, err
	}

	sid, err := ValidateID(id, signingKey)

	if err == nil {
		return sid, nil
	}

	return InvalidSessionID, ErrInvalidID
}

func verifyAuthScheme(authValue string) (id string, err error) {
	split := strings.Fields(authValue)
	if len(split) != 2 || split[0] != strings.TrimSpace(schemeBearer) {
		return "", ErrInvalidScheme
	}
	return split[1], nil
}

//GetState extracts the SessionID from the request,
//gets the associated state from the provided store into
//the `sessionState` parameter, and returns the SessionID
func GetState(r *http.Request, signingKey string, store Store, sessionState interface{}) (SessionID, error) {
	sid, err := GetSessionID(r, signingKey)
	if err != nil {
		return InvalidSessionID, err
	}
	err = store.Get(SessionID(sid), sessionState)
	if err != nil {
		return InvalidSessionID, err
	}

	return sid, nil
}

//EndSession extracts the SessionID from the request,
//and deletes the associated data in the provided store, returning
//the extracted SessionID.
func EndSession(r *http.Request, signingKey string, store Store) (SessionID, error) {
	sid, err := GetSessionID(r, signingKey)
	if err != nil {
		return InvalidSessionID, err
	}
	store.Delete(sid)
	return sid, nil
}
