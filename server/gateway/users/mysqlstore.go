package users

import (
	"Project_One/server/gateway/documents"
	"database/sql"
	"fmt"
	"log"
	"strings"

	// need it for mysql
	_ "github.com/go-sql-driver/mysql"
)

//MySQLStore contains the database reference
type MySQLStore struct {
	Db *sql.DB
}

//NewMySQLStore contructs and returns a new MySQLStore struct.
//dsn is the data source name to open the sql database
func NewMySQLStore(dsn string) (*MySQLStore, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}

	ms := &MySQLStore{
		Db: db,
	}
	return ms, nil
}

//
// Database functions for Users table Below
//

//GetByID returns the User with the given ID
func (ms *MySQLStore) GetByID(id int64) (*User, error) {
	user := User{}
	row := ms.Db.QueryRow("select * from users where id = ?", id)
	err := row.Scan(&user.ID, &user.PassHash, &user.UserName)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

//GetByUserName returns the User with the given Username
func (ms *MySQLStore) GetByUserName(username string) (*User, error) {
	user := User{}
	row := ms.Db.QueryRow("select * from users where username = ?", username)
	err := row.Scan(&user.ID, &user.PassHash, &user.UserName)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

//Insert inserts the user into the database, and returns
//the newly-inserted User, complete with the DBMS-assigned ID
func (ms *MySQLStore) Insert(user *User) (*User, error) {
	if user == nil {
		return nil, fmt.Errorf("user is nil")
	}
	stmt := "insert into users(pass_hash, username) values (?,?)"
	res, err := ms.Db.Exec(stmt, user.PassHash, user.UserName)
	if err != nil {
		err = fmt.Errorf("error inserting new row: %v", err)
		return user, err
	}

	//get the auto-assigned ID for the new row
	id, err := res.LastInsertId()
	if err != nil {
		return user, err
	}
	user.ID = id
	return user, nil
}

//Delete deletes the user with the given ID
func (ms *MySQLStore) Delete(id int64) error {
	stmt := "delete from users where id = ?"
	if _, err := ms.Db.Exec(stmt, id); err != nil {
		return err
	}
	return nil
}

//
// Database functions for Documents table Below
//

//GetAllDocuments returns an array of DocumentSummary of all available documents.
func (ms *MySQLStore) GetAllDocuments() ([]documents.DocumentSummary, error) {
	stmt := "SELECT document_id, title, tool_type, created, updated, description, subject_area, database_name FROM documents"
	allDocuments, err := ms.scanDocSummaryQuery(stmt)
	if err != nil {
		return nil, err
	}

	return allDocuments, nil
}

// Returns a string that queries the given termList and filterType.
func addFilterQuery(termList []string, filterType string, currentStmt string) string {
	var stmt string
	if filterType == "search" && len(termList) != 0 {
		if strings.HasSuffix(currentStmt, ")") {
			stmt += " AND "
		}
		// title
		stmt += "( (title like '%" + termList[0] + "%'"
		for i := 1; i < len(termList); i++ {
			stmt += " AND title like '%" + termList[i] + "%'"
		}
		stmt += ") OR "
		// description
		stmt += "(description like '%" + termList[0] + "%'"
		for i := 1; i < len(termList); i++ {
			stmt += " AND description like '%" + termList[i] + "%'"
		}
		stmt += ") )"
	} else if len(termList) != 0 {
		if strings.HasSuffix(currentStmt, ")") {
			stmt += " AND "
		}
		stmt += "(" + filterType + ` = "` + termList[0] + `"`
		for i := 1; i < len(termList); i++ {
			stmt += " OR " + filterType + ` = "` + termList[i] + `"`
		}
		stmt += ")"
	}
	return stmt
}

//GetSearchedDocuments returns and array of DocumentSummary that meet the criteria of
//the passed in query.
func (ms *MySQLStore) GetSearchedDocuments(query *documents.DocumentQuery) ([]documents.DocumentSummary, error) {
	stmt := "SELECT document_id, title, tool_type, created, updated, description, subject_area, database_name FROM documents where "
	stmt += addFilterQuery(query.SubjectArea, "subject_area", stmt)
	stmt += addFilterQuery(query.ToolType, "tool_type", stmt)
	stmt += addFilterQuery(query.Database, "database_name", stmt)
	stmt += addFilterQuery(query.SupportGroup, "support_group", stmt)
	stmt += addFilterQuery(query.SearchTerm, "search", stmt)
	log.Println(stmt)
	allDocuments, err := ms.scanDocSummaryQuery(stmt)
	if err != nil {
		return nil, err
	}

	return allDocuments, nil
}

//Given a statment to query Documents, returns an array of Document Summary returned by the
//database query.
func (ms *MySQLStore) scanDocSummaryQuery(stmt string) ([]documents.DocumentSummary, error) {
	allDocuments := []documents.DocumentSummary{}
	rows, err := ms.Db.Query(stmt)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var doc documents.DocumentSummary
		err := rows.Scan(&doc.DocumentID, &doc.Title, &doc.ToolType, &doc.Created, &doc.Updated, &doc.Description, &doc.SubjectArea, &doc.Database)
		if err != nil {
			return nil, err
		}
		allDocuments = append(allDocuments, doc)
	}
	return allDocuments, nil
}

//GetFilters returns a DocumentQuery which lists available filters in the database.
func (ms *MySQLStore) GetFilters() (*documents.Filters, error) {
	allFilters := &documents.Filters{}

	toolTypes, err := ms.scanSingleFilter(`SELECT DISTINCT tool_type FROM documents`)
	if err != nil {
		return nil, err
	}
	allFilters.ToolType = toolTypes

	subjectAreas, err := ms.scanSingleFilter(`SELECT DISTINCT subject_area FROM documents`)
	if err != nil {
		return nil, err
	}
	allFilters.SubjectArea = subjectAreas

	databaseNames, err := ms.scanSingleFilter(`SELECT DISTINCT database_name FROM documents`)
	if err != nil {
		return nil, err
	}
	allFilters.Database = databaseNames

	supportGroups, err := ms.scanSingleFilter(`SELECT DISTINCT support_group FROM documents`)
	if err != nil {
		return nil, err
	}
	allFilters.SupportGroup = supportGroups

	return allFilters, nil
}

// Given the statment to select distinct values from a column and the mysqlstore,
// return an array of the unique values in that column and error.
func (ms *MySQLStore) scanSingleFilter(stmt string) ([]string, error) {
	rows, err := ms.Db.Query(stmt)
	if err != nil {
		return nil, err
	}

	var types []string
	for rows.Next() {
		var entry string
		err := rows.Scan(&entry)
		if err != nil {
			return nil, err
		}
		types = append(types, entry)
	}
	return types, nil
}

//GetSpecificDocument returns a Document object that matches the given documentID.
func (ms *MySQLStore) GetSpecificDocument(documentID int) (*documents.Document, error) {
	document := documents.Document{}
	row := ms.Db.QueryRow(`SELECT d.document_id, d.tool_type, d.title, d.created, d.updated, d.custodian, d.author, d.description, d.subject_area, d.support_group, d.sql_query, d.database_name, t.term, t.definition
						 FROM documents d JOIN terms t ON t.document_id = d.document_id WHERE d.document_id = ?`, documentID)
	err := row.Scan(&document.DocumentID, &document.ToolType, &document.Title, &document.Created, &document.Updated,
		&document.Custodian, &document.Author, &document.Description, &document.SubjectArea, &document.SupportGroup,
		&document.SqlQuery, &document.Database, &document.JoinedTerms, &document.JoinedDefs)
	if err != nil {
		return nil, err
	}

	terms := strings.Split(document.JoinedTerms, "::")
	defs := strings.Split(document.JoinedDefs, "::")

	document.Terms = convertToTermArray(terms, defs)

	return &document, nil
}

func convertToTermArray(terms []string, defs []string) []documents.Term {
	var arr []documents.Term
	for i, t := range terms {
		newTerm := documents.Term{
			Term:       t,
			Definition: defs[i],
		}
		arr = append(arr, newTerm)
	}
	return arr
}

//InsertNewBookmark will insert a new bookmark of the given documentID for the given
//userID if the bookmark is not already in the database.
func (ms *MySQLStore) InsertNewBookmark(documentID int, userID int) error {
	// check that the bookmark isn't already there
	var exists bool
	row := ms.Db.QueryRow(`select exists(select 1 from bookmarks where document_id = ? and user_id = ?)`, documentID, userID)
	if err := row.Scan(&exists); err != nil {
		return err
	}
	// bookmark is not in database yet so we insert new bookmark
	if !exists {
		_, err := ms.Db.Exec(`insert into bookmarks(document_id, user_id) values (?, ?)`, documentID, userID)
		if err != nil {
			return err
		}
	}

	return nil
}

//DeleteBookmark deletes the bookmark of the documentID of the given userID.
func (ms *MySQLStore) DeleteBookmark(documentID int, userID int) error {
	_, err := ms.Db.Exec(`delete from bookmarks where document_id = ? and user_id = ?`, documentID, userID)
	if err != nil {
		return err
	}
	return nil
}

//GetBookmarks returns the document summaries of all the given user's bookmarked documents.
func (ms *MySQLStore) GetBookmarks(userID int) ([]documents.DocumentSummary, error) {
	stmt := fmt.Sprintf("SELECT b.document_id, d.title, d.tool_type, d.created, d.updated, d.description, d.subject_area, d.database_name FROM bookmarks AS b JOIN users AS u ON b.user_id = u.id JOIN documents AS d ON d.document_id = b.document_id WHERE b.user_id = (%d)", userID)
	allDocuments, err := ms.scanDocSummaryQuery(stmt)
	if err != nil {
		return nil, err
	}
	return allDocuments, nil
}

//GetBookmarkedDocumentID returns an array of documentIDs that has been bookmarked by the given user.
func (ms *MySQLStore) GetBookmarkedDocumentID(userID int) ([]int, error) {
	stmt := fmt.Sprintf("SELECT b.document_id FROM bookmarks AS b JOIN users AS u ON b.user_id = u.id JOIN documents AS d ON d.document_id = b.document_id WHERE b.user_id = (%d)", userID)
	var docIDs []int
	rows, err := ms.Db.Query(stmt)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		var id int
		err := rows.Scan(&id)
		if err != nil {
			return nil, err
		}
		docIDs = append(docIDs, id)
	}
	return docIDs, nil
}
