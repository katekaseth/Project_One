package users

import (
	"fmt"
	"reflect"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

//bcryptCost is the default bcrypt cost to use when hashing passwords
var bcryptCost = 13

//User represents a user account in the database
type User struct {
	ID       int64  `json:"id"`
	PassHash []byte `json:"-"` //never JSON encoded/decoded
	UserName string `json:"userName"`
}

//Credentials represents user sign-in credentials
type Credentials struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}

//NewUser represents a new user signing up for an account
type NewUser struct {
	Password     string `json:"password"`
	PasswordConf string `json:"passwordConf"`
	UserName     string `json:"userName"`
}

// Equals determines if two users are the same
func (u *User) Equals(u2 *User) bool {
	return reflect.DeepEqual(u, u2)
}

//Validate validates the new user and returns an error if
//any of the validation rules fail, or nil if its valid
func (nu *NewUser) Validate() error {
	//validate the new user according to these rules:
	//- Password must be at least 6 characters
	//- Password and PasswordConf must match
	//- UserName must be non-zero length and may not contain spaces
	if len(nu.Password) < 6 {
		err := fmt.Errorf("passwords must be at least 6 characters")
		return err
	}

	if nu.Password != nu.PasswordConf {
		err := fmt.Errorf("passwords do not match")
		return err
	}

	if len(nu.UserName) == 0 || strings.Contains(nu.UserName, " ") {
		err := fmt.Errorf("username must be non-empty and contrain no spaces")
		return err
	}

	return nil
}

//ToUser converts the NewUser to a User, setting the
//PhotoURL and PassHash fields appropriately
func (nu *NewUser) ToUser() (*User, error) {
	if err := nu.Validate(); err != nil {
		return nil, err
	}
	//if valid, create a new *User and set the fields
	//based on the field values in `nu`.
	u := &User{
		UserName: nu.UserName,
	}

	// call .SetPassword() to set the PassHash
	//field of the User to a hash of the NewUser.Password
	if err := u.SetPassword(nu.Password); err != nil {
		return nil, err
	}

	return u, nil
}

//SetPassword hashes the password and stores it in the PassHash field
func (u *User) SetPassword(password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcryptCost)
	if err != nil {
		return err
	}
	u.PassHash = hash
	return nil
}

//Authenticate compares the plaintext password against the stored hash
//and returns an error if they don't match, or nil if they do
func (u *User) Authenticate(password string) error {
	if err := bcrypt.CompareHashAndPassword(u.PassHash, []byte(password)); err != nil {
		return err
	}
	return nil
}
