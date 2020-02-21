package handlers

import (
	"snake/server/gateway/users"
	"time"
)

// SessionState stores the start time of the session and
// the authenticated user who started the session.
type SessionState struct {
	Time time.Time   `json:"time"`
	User *users.User `json:"user"`
}
