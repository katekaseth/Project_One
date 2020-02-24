package main

import (
	"Project_One/server/gateway/handlers"
	"Project_One/server/gateway/sessions"
	"Project_One/server/gateway/users"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
)

func main() {
	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		// addr = ":443"
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
		// dsn = "root:password@tcp(dataStore:3306)/data?parseTime=true"
		dsn = "root:password@tcp(localhost:3306)/data?parseTime=true"
	}
	userStore, err := users.NewMySQLStore(dsn)
	time.Sleep(1)
	err = userStore.Db.Ping()
	if err != nil {
		log.Fatalf("dataStore db ping: %s", err)
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
	router.HandleFunc("/search", ctx.SearchHandler)
	router.HandleFunc("/filter", ctx.FilterHandler)
	router.HandleFunc("/report/{reportID}", ctx.ReportHandler)

	wrappedMux := handlers.NewResponseHeader(router)
	log.Printf("server is listening at %s...", addr)
	// log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
	log.Fatal(http.ListenAndServe(addr, wrappedMux))
}
