package handlers

import (
	"encoding/json"
	"net/http"
	"snake/server/gateway/sessions"
	"snake/server/gateway/users"
	"strings"
	"time"

	// for sql driver to work
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

// UsersHandler will handle requests for users resources. It will accept POST
// requests to create new user accounts.
func (ctx *HandlerContext) UsersHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method must be POST", http.StatusMethodNotAllowed)
		return
	}

	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		http.Error(w, "Request body must be in JSON", http.StatusUnsupportedMediaType)
		return
	}

	if r.Body == nil {
		http.Error(w, "Request is nil", http.StatusUnsupportedMediaType)
		return
	}

	newUser := &users.NewUser{}
	dec := json.NewDecoder(r.Body)
	// check that request body can be encoded into users.NewUser struct
	if err := dec.Decode(newUser); err != nil {
		http.Error(w, "Decoding failed", http.StatusInternalServerError)
		return
	}

	// ensure valid new user and converts to user
	user, err := newUser.ToUser()
	if err != nil {
		http.Error(w, "Invalid new user", http.StatusBadRequest)
		return
	}
	user, err = ctx.UserStore.Insert(user)
	if err != nil {
		http.Error(w, "Can't insert to store", http.StatusConflict)
		return
	}

	// sign the user in (begin a session)
	sessionState := &SessionState{
		Time: time.Now(),
		User: user,
	}
	if _, err = sessions.BeginSession(ctx.SigningKey, ctx.SessionStore, sessionState, w); err != nil {
		http.Error(w, "Error beginning a session", http.StatusConflict)
		return
	}

	w.Header().Set("content-type", "application/json")
	// status code http.StatusCreated
	w.WriteHeader(http.StatusCreated)
	// encode new user profile as json in response body
	userJSON, err := json.Marshal(user)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
	w.Write(userJSON)
}

// SessionsHandler handles requests for the sessions rescource and allows
// clients to begin a new session using an existing user's credentials
func (ctx *HandlerContext) SessionsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method must be POST", http.StatusMethodNotAllowed)
		return
	}

	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		http.Error(w, "Request body not in JSON", http.StatusUnsupportedMediaType)
		return
	}

	if r.Body == nil {
		http.Error(w, "Request is nil", http.StatusUnsupportedMediaType)
		return
	}

	creds := &users.Credentials{}
	dec := json.NewDecoder(r.Body)
	// check that request body can be encoded into credentials struct
	if err := dec.Decode(creds); err != nil {
		http.Error(w, "Decoding failed", http.StatusInternalServerError)
		return
	}

	// Find user profile from the store using email
	user, err := ctx.UserStore.GetByUserName(creds.UserName)

	if err != nil {
		_, _ = bcrypt.GenerateFromPassword([]byte("password"), 13)
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Authenticate user
	err = user.Authenticate(creds.Password)
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	sessionState := &SessionState{
		Time: time.Now(),
		User: user,
	}

	// Begin session
	if _, err = sessions.BeginSession(ctx.SigningKey, ctx.SessionStore, sessionState, w); err != nil {
		http.Error(w, "Error beginning a session", http.StatusConflict)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	// don't test the error because if code ran to this point, the user should be valid
	userJSON, err := json.Marshal(sessionState.User)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
	w.Write(userJSON)
}

// SpecificSessionsHandler ends the current user's session
func (ctx *HandlerContext) SpecificSessionsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "DELETE" {
		http.Error(w, "Method must be DELETE", http.StatusMethodNotAllowed)
		return
	}
	// check if current user is authenticated; return status forbidden if not
	sessionState := &SessionState{}
	_, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, sessionState)
	if err != nil {
		http.Error(w, "User not authenticated", http.StatusForbidden)
		return
	}

	if _, err := sessions.EndSession(r, ctx.SigningKey, ctx.SessionStore); err != nil {
		http.Error(w, "Error ending session", http.StatusConflict)
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("signed out"))
}
