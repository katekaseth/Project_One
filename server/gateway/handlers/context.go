package handlers

import (
	"Project_One/server/gateway/sessions"
	"Project_One/server/gateway/users"
)

// HandlerContext stores globals that will need to be
// used by handler functions.
type HandlerContext struct {
	SigningKey   string
	SessionStore *sessions.RedisStore
	UserStore    *users.MySQLStore
}

// NewHandlerContext constructs a new HandlerContext,
// ensuring that the dependencies are not nil values
func NewHandlerContext(signingKey string, sessionStore *sessions.RedisStore, userStore *users.MySQLStore) *HandlerContext {
	if len(signingKey) == 0 || sessionStore == nil || userStore == nil {
		panic("nil parameter!")
	}
	return &HandlerContext{
		SigningKey:   signingKey,
		SessionStore: sessionStore,
		UserStore:    userStore,
	}
}
