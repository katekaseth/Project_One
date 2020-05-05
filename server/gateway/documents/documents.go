package documents

import "time"

// DocumentQuery represents the request body to query documents.
type DocumentQuery struct {
	SubjectArea  []string `json:"Subject Area"`
	ToolType     []string `json:"Tool Type"`
	Database     []string `json:"Database"`
	SupportGroup []string `json:"Support Group"`
	UWProfile    []string `json:"Is UW Profile"`
	SearchTerm   []string `json:"searchTerms"`
	AllowAccess  []string `json:"Accessible"`
}

// Filters represents the possible filters in our database.
type Filters struct {
	SubjectArea  []string `json:"Subject Area"`
	ToolType     []string `json:"Tool Type"`
	Database     []string `json:"Database"`
	SupportGroup []string `json:"Support Group"`
	UWProfile    []string `json:"Is UW Profile"`
	AllowAccess  []bool   `json:"Accessible"`
}

// Term represents a term with its definition.
type Term struct {
	Term       string `json:"term"`
	Definition string `json:"definition"`
}

// Document represents all the information of a document.
type Document struct {
	DocumentID   int       `json:"documentID"`
	ToolType     string    `json:"toolType"`
	Title        string    `json:"title"`
	Created      time.Time `json:"created"`
	Updated      time.Time `json:"updated"`
	Custodian    string    `json:"custodian"`
	Author       string    `json:"author"`
	Description  string    `json:"description"`
	SubjectArea  string    `json:"subjectArea"`
	SqlQuery     string    `json:"sqlQuery"`
	SupportGroup string    `json:"supportGroup"`
	Database     string    `json:"database"`
	Terms        []Term    `json:"terms"`
	Bookmarked   bool      `json:"isBookmarked"`
	AllowAccess  bool      `json:"Accessible"`
	JoinedTerms  string    `json:"-"`
	JoinedDefs   string    `json:"-"`
}

// DocumentSummary represents a summary of a document.
type DocumentSummary struct {
	DocumentID  int       `json:"documentID"`
	Title       string    `json:"title"`
	ToolType    string    `json:"toolType"`
	Created     time.Time `json:"created"`
	Updated     time.Time `json:"updated"`
	Description string    `json:"description"`
	SubjectArea string    `json:"subjectArea"`
	Database    string    `json:"database"`
	Bookmarked  bool      `json:"isBookmarked"`
}

// Bookmark represents a bookmark entry.
type Bookmark struct {
	BookmarkID int `json:"bookmarkID"`
	DocumentID int `json:"documentID"`
	UserID     int `json:"userID"`
}

// DocumentRequest represents a request for documents.
type DocumentRequest struct {
	DocumentIDs []int `json:"documentIDs"`
}
