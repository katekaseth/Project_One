package documents

import "time"

// DocumentQuery represents the request body to query documents.
type DocumentQuery struct {
	SubjectArea  []string `json:"Subject Area"`
	ToolType     []string `json:"Tool Type"`
	Database     []string `json:"Database"`
	SupportGroup []string `json:"Support Group"`
	SearchTerm   []string `json:"searchTerms"`
}

// Filters represents the possible filters in our database.
type Filters struct {
	SubjectArea  []string `json:"Subject Area"`
	ToolType     []string `json:"Tool Type"`
	Database     []string `json:"Database"`
	SupportGroup []string `json:"Support Group"`
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
	Bookmarked   bool      `json:"isBookmarked"`
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
