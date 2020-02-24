package documents

import "time"

// DocumentQuery represents the request body to query documents.
type DocumentQuery struct {
	ToolType    []string `json:"toolType"`
	SubjectArea []string `json:"subjectArea"`
	// SupportGroup []string `json:"supportGroup"`
	Database []string `json:"database"`
}

// Document represents all the information of a document.
type Document struct {
	DocumentID  int       `json:"id"`
	Title       string    `json:"title"`
	ToolType    string    `json:"toolType"`
	Created     time.Time `json:"created"`
	Updated     time.Time `json:"updated"`
	Custodian   string    `json:"custodian"`
	Author      string    `json:"author"`
	Description string    `json:"description"`
	SubjectArea string    `json:"subjectArea"`
	Database    string    `json:"database"`
	SqlQuery    string    `json:"sqlQuery"`
}

// DocumentSummary represents a summary of a document.
type DocumentSummary struct {
	DocumentID  int       `json:"DocumentID"`
	Title       string    `json:"title"`
	ToolType    string    `json:"toolType"`
	Created     time.Time `json:"created"`
	Updated     time.Time `json:"updated"`
	Description string    `json:"description"`
	SubjectArea string    `json:"subjectArea"`
}
