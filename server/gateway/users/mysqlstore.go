package users

import (
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
