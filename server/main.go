package main

import (
	"log"
	"net/http"
	"os"
	"snake/server/gateway/handlers"
	"snake/server/gateway/sessions"
	"snake/server/gateway/users"
	"time"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
)

func main() {
	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":8008"
	}

	// tlsKeyPath := os.Getenv("TLSKEY")
	// tlsCertPath := os.Getenv("TLSCERT")

	// session signing key
	signingKey := os.Getenv("SESSIONKEY")
	if len(signingKey) == 0 {
		signingKey = "signing key"
	}

	// set up the sql store
	dsn := os.Getenv("DSN")
	if len(dsn) == 0 {
		// dsn = "root:sqlpassword@tcp(user-store:3306)/users?parseTime=true"
		dsn = "root:sqlpassword@tcp(localhost:3306)/users?parseTime=true"
	}
	userStore, err := users.NewMySQLStore(dsn)
	time.Sleep(1)
	err = userStore.Db.Ping()
	if err != nil {
		log.Fatalf("userstore db ping: %s", err)
	}

	// set up redis store
	redisaddr := os.Getenv("REDISADDR")
	if len(redisaddr) == 0 {
		redisaddr = "localhost:6379"
		// redisaddr = "redisServer:6379"
	}
	client := redis.NewClient(&redis.Options{
		Addr: redisaddr,
	})
	sessionStore := sessions.NewRedisStore(client, time.Hour)

	ctx := handlers.NewHandlerContext(signingKey, sessionStore, userStore)

	router := mux.NewRouter()
	router.HandleFunc("/users", ctx.UsersHandler)
	router.HandleFunc("/sessions", ctx.SessionsHandler)
	router.HandleFunc("/sessions/", ctx.SpecificSessionsHandler)

	wrappedMux := handlers.NewResponseHeader(router)
	log.Printf("server is listening at %s...", addr)
	// log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
	log.Fatal(http.ListenAndServe(addr, wrappedMux))
}
