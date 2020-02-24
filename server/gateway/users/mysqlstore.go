package users

import (
	"Project_One/server/gateway/documents"
	"database/sql"
	"fmt"

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

//GetFilters returns an array of DocumentQuery which will
//have available filters in the database.
func (ms *MySQLStore) GetFilters() (*documents.DocumentQuery, error) {
	allFilters := &documents.DocumentQuery{}

	toolTypes, err := scanSingleFilter(`SELECT DISTINCT tool_type FROM documents`, ms)
	if err != nil {
		return nil, err
	}
	allFilters.ToolType = toolTypes

	subjectAreas, err := scanSingleFilter(`SELECT DISTINCT subject_area FROM documents`, ms)
	if err != nil {
		return nil, err
	}
	allFilters.SubjectArea = subjectAreas

	databaseNames, err := scanSingleFilter(`SELECT DISTINCT database_name FROM documents`, ms)
	if err != nil {
		return nil, err
	}
	allFilters.Database = databaseNames

	return allFilters, nil
}

// Given the statment to select distinct values from a column and the mysqlstore,
// return an array of the unique values in that column and error.
func scanSingleFilter(stmt string, ms *MySQLStore) ([]string, error) {
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
