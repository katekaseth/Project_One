package handlers

import (
	"Project_One/server/gateway/documents"
	"Project_One/server/gateway/sessions"
	"Project_One/server/gateway/users"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

func TestGetAllSearch(t *testing.T) {
	ctx := getContextHandler()
	sid, _ := GetSID(ctx, t)

	w := httptest.NewRecorder()

	query := &documents.DocumentQuery{}
	queryBody, _ := json.Marshal(query)
	r, _ := http.NewRequest("GET", "", bytes.NewBuffer(queryBody))
	r.Header.Add("Authorization", "Bearer "+string(sid))
	r.Header.Set("Content-Type", "application/json")

	ctx.SearchHandler(w, r)
	recievedDocSummaries := []documents.DocumentSummary{}
	dec := json.NewDecoder(w.Body)
	if err := dec.Decode(&recievedDocSummaries); err == nil {
		t.Errorf("failed decoding")
	}
}

func TestGetFilters(t *testing.T) {
	ctx := getContextHandler()
	sid, _ := GetSID(ctx, t)

	w := httptest.NewRecorder()
	r, _ := http.NewRequest("GET", "", nil)
	r.Header.Add("Authorization", "Bearer "+string(sid))

	ctx.FilterHandler(w, r)
	if w.Code != 200 {
		t.Errorf("didn't work")
	}

	receivedFilters := documents.DocumentQuery{}
	dec := json.NewDecoder(w.Body)
	if err := dec.Decode(&receivedFilters); err != nil {
		t.Errorf("cannot decode")
	}
}

func GetSID(ctx *HandlerContext, t *testing.T) (sessions.SessionID, *users.User) {
	_, _ = ctx.UserStore.Db.Exec("delete from users")
	// reset user ID or test cases fail
	_, _ = ctx.UserStore.Db.Exec("alter table users AUTO_INCREMENT = 1")

	validNewUser := &users.NewUser{
		UserName:     "test",
		Password:     "password",
		PasswordConf: "password",
	}
	user, _ := validNewUser.ToUser()
	user, err := ctx.UserStore.Insert(user)
	if err != nil {
		t.Fatalf("Error inserting to database")
	}

	// begin a new session
	sessionState := &SessionState{
		Time: time.Now(),
		User: user,
	}
	sid, err := sessions.BeginSession(ctx.SigningKey, ctx.SessionStore, sessionState, httptest.NewRecorder())
	if err != nil {
		t.Fatalf("Error beginning sessions")
	}
	return sid, user
}
