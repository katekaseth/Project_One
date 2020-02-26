package users

import (
	"Project_One/server/gateway/documents"
	"database/sql"
	"fmt"
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
func (ms *MySQLStore) GetAllDocuments() (*[]documents.DocumentSummary, error) {
	stmt := "SELECT document_id, title, tool_type, created, updated, description, subject_area, database_name FROM documents"
	allDocuments, err := ms.scanDocSummaryQuery(stmt)
	if err != nil {
		return nil, err
	}

	return allDocuments, nil
}

//GetSearchedDocuments returns and array of DocumentSummary that meet the criteria of
//the passed in query.
func (ms *MySQLStore) GetSearchedDocuments(query *documents.DocumentQuery) (*[]documents.DocumentSummary, error) {
	stmt := `SELECT document_id, title, tool_type, created, updated, description, subject_area, database_name FROM documents where `
	if len(query.SubjectArea) != 0 {
		stmt += `(subject_area = ` + `"` + query.SubjectArea[0] + `"`
		for i := 1; i < len(query.SubjectArea); i++ {
			stmt += " OR subject_area = " + `"` + query.SubjectArea[i] + `"`
		}
		stmt += ")"
	}

	if len(query.ToolType) != 0 {
		if strings.HasSuffix(stmt, ")") {
			stmt += " AND "
		}
		stmt += "(tool_type = " + `"` + query.ToolType[0] + `"`
		for i := 1; i < len(query.ToolType); i++ {
			stmt += " OR tool_type = " + `"` + query.ToolType[i] + `"`
		}
		stmt += ")"
	}

	if len(query.Database) != 0 {
		if strings.HasSuffix(stmt, ")") {
			stmt += " AND "
		}
		stmt += "(database_name = " + `"` + query.Database[0] + `"`
		for i := 1; i < len(query.Database); i++ {
			stmt += " OR database_name = " + `"` + query.Database[i] + `"`
		}
		stmt += ")"
	}
	allDocuments, err := ms.scanDocSummaryQuery(stmt)
	if err != nil {
		return nil, err
	}

	return allDocuments, nil
}

//Given a statment to query Documents, returns an array of Document Summary returned by the
//database query.
func (ms *MySQLStore) scanDocSummaryQuery(stmt string) (*[]documents.DocumentSummary, error) {
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
	return &allDocuments, nil
}

//GetFilters returns a DocumentQuery which lists available filters in the database.
func (ms *MySQLStore) GetFilters() (*documents.DocumentQuery, error) {
	allFilters := &documents.DocumentQuery{}

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
	row := ms.Db.QueryRow(`select * from documents where document_id = ?`, documentID)
	err := row.Scan(&document.ToolType, &document.Title, &document.Created, &document.Updated,
		&document.Custodian, &document.Author, &document.Description, &document.SubjectArea,
		&document.SqlQuery, &document.Database, &document.DocumentID)
	if err != nil {
		return nil, err
	}
	return &document, nil
}
