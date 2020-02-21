package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"snake/server/gateway/sessions"
	"snake/server/gateway/users"
	"testing"
	"time"

	"github.com/go-redis/redis"
)

func TestUsersHandler(t *testing.T) {
	ctx := getContextHandler()

	// id should be the last inserted id, 1 should work the first time
	expectedUser := &users.User{
		ID:       1,
		UserName: "userName",
	}

	cases := []struct {
		method      string
		url         string
		getBuffer   func() *bytes.Buffer
		expCode     int
		contentType string
		validTest   bool
	}{
		{
			// invalid content-type
			"POST",
			"",
			nil,
			http.StatusUnsupportedMediaType,
			"text/html",
			false,
		},
		{
			// invalid body
			"POST",
			"",
			nil,
			http.StatusUnsupportedMediaType,
			"application/json",
			false,
		},
		{
			// invalid new user struct; ToUser failing
			"POST",
			"",
			func() *bytes.Buffer {
				invalidNewUser := &users.NewUser{
					Password:     "password",
					PasswordConf: "passDoNotMatch",
					UserName:     "userName",
				}
				invalidUserBody, _ := json.Marshal(invalidNewUser)
				return bytes.NewBuffer(invalidUserBody)
			},
			http.StatusBadRequest,
			"application/json",
			false,
		},
		{
			// valid test
			"POST",
			"",
			func() *bytes.Buffer {
				// test valid new user
				validNewUser := &users.NewUser{
					Password:     "password",
					PasswordConf: "password",
					UserName:     "userName",
				}
				body, _ := json.Marshal(validNewUser)
				return bytes.NewBuffer(body)
			},
			http.StatusCreated,
			"application/json",
			true,
		},
	}

	for _, c := range cases {
		w := httptest.NewRecorder()
		var r *http.Request
		// need extra test because it won't accept nil bodyBuffer
		if c.getBuffer == nil {
			r, _ = http.NewRequest(c.method, c.url, nil)
		} else {
			r, _ = http.NewRequest(c.method, c.url, c.getBuffer())
		}
		r.Header.Set("Content-Type", c.contentType)
		ctx.UsersHandler(w, r)
		if w.Code != c.expCode {
			t.Errorf("incorrect response status code: expected %d but got %d", c.expCode, w.Code)
		}
		if c.validTest {
			// response content-type should be set to "application/json"
			if w.Header().Get("Content-Type") != "application/json" {
				t.Errorf("Expected response Content-Type to be application/json, recieved: " + w.Header().Get("Content-Type"))
			}
			// make sure the new user struct has an id property of 1
			user := &users.User{}
			dec := json.NewDecoder(w.Body)
			if err := dec.Decode(user); err != nil {
				t.Errorf("Cannot decode response body into user struct")
			}
			if !reflect.DeepEqual(user, expectedUser) {
				t.Errorf("Expected: %v Recieved: %v", expectedUser, user)
			}
		}
	}
}

func getContextHandler() *HandlerContext {
	userStore, _ := users.NewMySQLStore("root:sqlpassword@tcp(127.0.0.1:3306)/users?parseTime=true")
	redisClient := redis.NewClient(&redis.Options{
		Addr: "127.0.0.1:6379",
	})
	sessionStore := sessions.NewRedisStore(redisClient, time.Hour)
	// delete all existing users
	_, _ = userStore.Db.Exec("delete from users")
	// reset user ID or test cases fail
	_, _ = userStore.Db.Exec("alter table users AUTO_INCREMENT = 1")

	// delete all existing scores
	_, _ = userStore.Db.Exec("delete from scores")
	// reset score IDs
	_, _ = userStore.Db.Exec("alter table scores AUTO_INCREMENT = 1")
	return NewHandlerContext("signing key", sessionStore, userStore)
}
