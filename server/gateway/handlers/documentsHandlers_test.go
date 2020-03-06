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

func TestPostSpecificBookmark(t *testing.T) {
	ctx := getContextHandler()
	sid, _ := GetSID(ctx, t)

	w := httptest.NewRecorder()
	r, err := http.NewRequest("POST", "/bookmarks/1", nil)
	if err != nil {
		t.Error("Request not working")
	}
	r.Header.Add("Authorization", "Bearer "+string(sid))
	ctx.SpecificBookmarkHandler(w, r)
	if w.Code != 200 {
		t.Error(w.Code)
	}
}

func TestGetBookmark(t *testing.T) {
	// insert some bookmarks
	ctx := getContextHandler()
	sid, _ := GetSID(ctx, t)
	w := httptest.NewRecorder()
	r, err := http.NewRequest("POST", "/bookmarks/1", nil)
	if err != nil {
		t.Error("Request not working")
	}
	r.Header.Add("Authorization", "Bearer "+string(sid))
	ctx.SpecificBookmarkHandler(w, r)
	if w.Code != 200 {
		t.Error("insert failed")
	}
	r, err = http.NewRequest("POST", "/bookmarks/3", nil)
	r.Header.Add("Authorization", "Bearer "+string(sid))
	ctx.SpecificBookmarkHandler(w, r)
	r, err = http.NewRequest("POST", "/bookmarks/5", nil)
	r.Header.Add("Authorization", "Bearer "+string(sid))
	ctx.SpecificBookmarkHandler(w, r)

	// test get
	r, err = http.NewRequest("GET", "/bookmarks", nil)
	r.Header.Add("Authorization", "Bearer "+string(sid))
	ctx.BookmarkHandler(w, r)
	recievedDocSummaries := []documents.DocumentSummary{}
	dec := json.NewDecoder(w.Body)
	if err := dec.Decode(&recievedDocSummaries); err != nil {
		t.Error(err)
		t.Error(w.Code)
		t.Error(recievedDocSummaries)
		t.Errorf("failed decoding")
	}
}

func TestDeleteSpecificBookmark(t *testing.T) {
	// insert some bookmarks
	ctx := getContextHandler()
	sid, _ := GetSID(ctx, t)
	w := httptest.NewRecorder()
	r, err := http.NewRequest("POST", "/bookmarks/1", nil)
	if err != nil {
		t.Error("Request not working")
	}
	r.Header.Add("Authorization", "Bearer "+string(sid))
	ctx.SpecificBookmarkHandler(w, r)
	if w.Code != 200 {
		t.Error("insert failed")
	}
	r, err = http.NewRequest("POST", "/bookmarks/3", nil)
	r.Header.Add("Authorization", "Bearer "+string(sid))
	ctx.SpecificBookmarkHandler(w, r)
	r, err = http.NewRequest("POST", "/bookmarks/5", nil)
	r.Header.Add("Authorization", "Bearer "+string(sid))
	ctx.SpecificBookmarkHandler(w, r)

	// test delete
	r, err = http.NewRequest("DELETE", "/bookmarks/1", nil)
	r.Header.Add("Authorization", "Bearer "+string(sid))
	if err != nil {
		t.Error("Request not working")
	}
	ctx.SpecificBookmarkHandler(w, r)
	if w.Code != 200 {
		t.Error("delete failed")
	}
}

func TestGetSpecificDocument(t *testing.T) {
	ctx := getContextHandler()
	sid, _ := GetSID(ctx, t)

	w := httptest.NewRecorder()
	r, err := http.NewRequest("GET", "/documents/1", nil)
	if err != nil {
		t.Error("Request not working")
	}
	r.Header.Add("Authorization", "Bearer "+string(sid))

	ctx.SpecificDocumentHandler(w, r)
	receivedDoc := documents.Document{}
	dec := json.NewDecoder(w.Body)
	if err := dec.Decode(&receivedDoc); err != nil {
		t.Error(w.Code)
	}
}

func TestGetAllSearch(t *testing.T) {
	ctx := getContextHandler()
	sid, _ := GetSID(ctx, t)

	w := httptest.NewRecorder()

	query := &documents.DocumentQuery{}
	queryBody, _ := json.Marshal(query)
	r, _ := http.NewRequest("POST", "", bytes.NewBuffer(queryBody))
	r.Header.Add("Authorization", "Bearer "+string(sid))
	r.Header.Set("Content-Type", "application/json")

	ctx.SearchHandler(w, r)
	recievedDocSummaries := []documents.DocumentSummary{}
	dec := json.NewDecoder(w.Body)
	if err := dec.Decode(&recievedDocSummaries); err != nil {
		t.Errorf("failed decoding")
	}
}

func TestGetQuerySearch(t *testing.T) {
	ctx := getContextHandler()
	sid, _ := GetSID(ctx, t)

	w := httptest.NewRecorder()

	query := &documents.DocumentQuery{
		SubjectArea:  []string{"Healthcare"},
		ToolType:     []string{"Report", "Cube"},
		Database:     []string{"EDWAdminMart"},
		SupportGroup: []string{"ORIS"},
		SearchTerm:   []string{"credit", "hours"},
	}
	queryBody, _ := json.Marshal(query)
	r, _ := http.NewRequest("POST", "", bytes.NewBuffer(queryBody))
	r.Header.Add("Authorization", "Bearer "+string(sid))
	r.Header.Set("Content-Type", "application/json")

	ctx.SearchHandler(w, r)
	recievedDocSummaries := []documents.DocumentSummary{}
	dec := json.NewDecoder(w.Body)
	if err := dec.Decode(&recievedDocSummaries); err != nil {
		t.Errorf("failed decoding")
	}

	if len(recievedDocSummaries) != 56 {
		t.Error(recievedDocSummaries)
		t.Errorf("did not get expected number of documents %d", len(recievedDocSummaries))
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
	// reset bookmarks table
	_, _ = ctx.UserStore.Db.Exec("delete from bookmarks")
	_, _ = ctx.UserStore.Db.Exec("alter table bookmarks AUTO_INCREMENT = 1")
	// reset users table
	_, _ = ctx.UserStore.Db.Exec("delete from users")
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
