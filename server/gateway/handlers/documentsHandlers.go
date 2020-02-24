package handlers

import (
	"Project_One/server/gateway/documents"
	"Project_One/server/gateway/sessions"
	"encoding/json"
	"net/http"
	"strings"
)

// SearchHandler handles GET requests to /search. It accepts a JSON body that details
// search queries in this form:
// {
//		toolType: ["example", "here"],
//		subjectArea: [],
//		supportGroup: [], not this one yet
//		database: []
// }
func (ctx *HandlerContext) SearchHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method must be POST", http.StatusMethodNotAllowed)
		return
	}

	// check if current user is authenticated; return status unauthorized if not
	sessionState := &SessionState{}
	_, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, sessionState)
	if err != nil {
		http.Error(w, "User not authenticated", http.StatusUnauthorized)
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

	// check that request body can be decoded into DocumentQuery struct
	query := &documents.DocumentQuery{}
	dec := json.NewDecoder(r.Body)
	if err := dec.Decode(query); err != nil {
		http.Error(w, "Decoding failed", http.StatusInternalServerError)
		return
	}

	var documents *[]documents.DocumentSummary
	// if there are no filters, return all documents summaries
	if len(query.Database) == 0 && len(query.SubjectArea) == 0 && len(query.ToolType) == 0 {
		documents, err = ctx.UserStore.GetAllDocuments()
		if err != nil {
			http.Error(w, "Error getting documents", http.StatusInternalServerError)
			return
		}
	}
	documentsBytes, err := json.Marshal(documents)
	if err != nil {
		http.Error(w, "Error getting documents", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(documentsBytes)
}

// FilterHandler handles GET requests to /filter and responds with a JSON of the
// available filter options in the database.
func (ctx *HandlerContext) FilterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method must be POST", http.StatusMethodNotAllowed)
		return
	}

	// check if current user is authenticated; return status unauthorized if not
	sessionState := &SessionState{}
	_, err := sessions.GetState(r, ctx.SigningKey, ctx.SessionStore, sessionState)
	if err != nil {
		http.Error(w, "User not authenticated", http.StatusUnauthorized)
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

// ReportHandler handles GET requests to /report/:reportID and responds with all information
// for that report.
func (ctx *HandlerContext) ReportHandler(w http.ResponseWriter, r *http.Request) {

}

// BookmarkHandler handles GET to /bookmark and responds with a list of all authenticated
// user's bookmark. It also handles POST requests to /bookmark/:reportID to add or remove
// a bookmark for the specified report.
func (ctx *HandlerContext) BookmarkHandler(w http.ResponseWriter, r *http.Request) {

}
