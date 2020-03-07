package handlers

import (
	"Project_One/server/gateway/documents"
	"Project_One/server/gateway/sessions"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
)

// SearchHandler handles GET requests to /search. It accepts a JSON body that details
// search queries in this form:
// {
// 		Tool Type: ["example", "here"],
// 		Subject Area: [],
// 		Database: []
// 		Support Group: [],
// }
func (ctx *HandlerContext) SearchHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method must be POST", http.StatusMethodNotAllowed)
		return
	}

	sessionState, err := CheckUserAuthenticated(ctx, w, r)
	if err != nil {
		return
	}
	userID := int(sessionState.User.ID)

	if !strings.HasPrefix(r.Header.Get("Content-Type"), "application/json") {
		http.Error(w, "Request body must be in JSON", http.StatusUnsupportedMediaType)
		return
	}

	if r.Body == nil {
		http.Error(w, "Request is nil", http.StatusUnsupportedMediaType)
		return
	}

	// check that request body can be decoded into DocumentQuery struct
	query := &documents.DocumentQuery{}
	dec := json.NewDecoder(r.Body)
	err = dec.Decode(query)
	if err != nil {
		http.Error(w, "Bad request body", http.StatusInternalServerError)
		return
	}

	var documents []documents.DocumentSummary
	// if there are no filters, return all documents summaries
	if len(query.Database) == 0 && len(query.SubjectArea) == 0 && len(query.ToolType) == 0 && len(query.SupportGroup) == 0 && len(query.SearchTerm) == 0 {
		documents, err = ctx.UserStore.GetAllDocuments()
		if err != nil {
			http.Error(w, "Error getting documents", http.StatusInternalServerError)
			return
		}
	} else { // there are filters so we call the database
		documents, err = ctx.UserStore.GetSearchedDocuments(query)
	}
	// add bookmarked field
	docIDs, err := ctx.UserStore.GetBookmarkedDocumentID(userID)
	if err != nil {
		http.Error(w, "Error getting documents", http.StatusInternalServerError)
		return
	}
	for i := 0; i < len(documents); i++ {
		documents[i].Bookmarked = contains(docIDs, documents[i].DocumentID)
	}

	// marshal to json
	documentBytes, err := json.Marshal(documents)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(documentBytes)
}

// TODO: make this logn at some point
func contains(arr []int, n int) bool {
	for _, elem := range arr {
		if elem == n {
			return true
		}
	}
	return false
}

// FilterHandler handles GET requests to /filter and responds with a JSON of the
// available filter options in the database.
func (ctx *HandlerContext) FilterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method must be GET", http.StatusMethodNotAllowed)
		return
	}

	filters, err := ctx.UserStore.GetFilters()
	if err != nil {
		http.Error(w, "Internal fail", http.StatusInternalServerError)
		return
	}
	filtersBytes, err := json.Marshal(filters)
	if err != nil {
		http.Error(w, "Error getting filters", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(filtersBytes)
}

// SpecificDocumentHandler handles GET requests to /document/:documentID and responds with all information
// for that report.
func (ctx *HandlerContext) SpecificDocumentHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method must be GET", http.StatusMethodNotAllowed)
		return
	}

	var documentID int
	// get user id from the url path
	vars := mux.Vars(r)
	documentID, err := strconv.Atoi(vars["documentID"])

	if err != nil {
		http.Error(w, "Bad URL", http.StatusBadRequest)
		return
	}

	sessionState, err := CheckUserAuthenticated(ctx, w, r)
	if err != nil {
		return
	}
	userID := int(sessionState.User.ID)

	if err != nil {
		http.Error(w, "Internal fail", http.StatusInternalServerError)
		return
	}
	document, err := ctx.UserStore.GetSpecificDocument(documentID)
	if err != nil {
		http.Error(w, "Internal fail", http.StatusInternalServerError)
		return
	}

	// add bookmarked field
	docIDs, err := ctx.UserStore.GetBookmarkedDocumentID(userID)
	if err != nil {
		http.Error(w, "Error getting documents", http.StatusInternalServerError)
		return
	}
	document.Bookmarked = contains(docIDs, document.DocumentID)

	documentBytes, err := json.Marshal(document)
	if err != nil {
		http.Error(w, "Internal fail", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(documentBytes)
}

// SpecificBookmarkHandler handles POST and DELETE requests to /bookmark/:documentID to add or remove
// a bookmark for the specified report.
func (ctx *HandlerContext) SpecificBookmarkHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" && r.Method != "DELETE" {
		http.Error(w, "Method must be GET, POST, or DELETE", http.StatusMethodNotAllowed)
		return
	}

	sessionState, err := CheckUserAuthenticated(ctx, w, r)
	if err != nil {
		return
	}
	userID := int(sessionState.User.ID)

	// get document id from the url path
	// NOTE: for some reason mux.Vars only works when it's deployed.
	vars := mux.Vars(r)
	documentID, err := strconv.Atoi(vars["documentID"])
	if err != nil {
		http.Error(w, "Bad URL", http.StatusBadRequest)
		return
	}

	if err != nil {
		http.Error(w, "Internal fail", http.StatusInternalServerError)
		return
	}
	if r.Method == "POST" {
		if err := ctx.UserStore.InsertNewBookmark(documentID, userID); err != nil {
			http.Error(w, "Internal fail", http.StatusInternalServerError)
			return
		}
	} else if r.Method == "DELETE" {
		if err := ctx.UserStore.DeleteBookmark(documentID, userID); err != nil {
			http.Error(w, "Internal fail", http.StatusInternalServerError)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
}

// BookmarkHandler handles GET to /bookmarks and responds with a list of all authenticated
// user's bookmark in document summary form.
func (ctx *HandlerContext) BookmarkHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method must be GET", http.StatusMethodNotAllowed)
		return
	}
	sessionState, err := CheckUserAuthenticated(ctx, w, r)
	if err != nil {
		return
	}
	userID := int(sessionState.User.ID)
	documents, err := ctx.UserStore.GetBookmarks(userID)
	if err != nil {
		http.Error(w, "Internal error", http.StatusInternalServerError)
		return
	}
	for i := 0; i < len(documents); i++ {
		documents[i].Bookmarked = true
	}
	documentBytes, err := json.Marshal(documents)
	if err != nil {
		http.Error(w, "Internal fail", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(documentBytes)

}

// CheckUserAuthenticated check if current user is authenticated; return status unauthorized if not
func CheckUserAuthenticated(ctx *HandlerContext, w http.ResponseWriter, r *http.Request) (*SessionState, error) {
	sessionState := &SessionState{}
	_, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, sessionState)
	if err != nil {
		http.Error(w, "User not authenticated", http.StatusUnauthorized)
		return nil, err
	}
	return sessionState, nil
}
