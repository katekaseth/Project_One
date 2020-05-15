package main

import (
	"Project_One/server/gateway/handlers"
	"Project_One/server/gateway/sessions"
	"Project_One/server/gateway/users"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
	"github.com/olivere/elastic"
)

func main() {
	addr := os.Getenv("ADDR")
	if len(addr) == 0 {
		addr = ":8008"
	}

	// session signing key
	signingKey := os.Getenv("SESSIONKEY")
	if len(signingKey) == 0 {
		signingKey = "signing key"
	}

	// set up the sql store
	dsn := os.Getenv("DSN")
	if len(dsn) == 0 {
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
	}
	client := redis.NewClient(&redis.Options{
		Addr: redisaddr,
	})
	sessionStore := sessions.NewRedisStore(client, time.Hour*9)

	// set up elastic search
	elasticsearchAddr := os.Getenv("ESADDR")
	if len(elasticsearchAddr) == 0 {
		elasticsearchAddr = "http://localhost:9200"
	}
	var elasticClient *elastic.Client
	for {
		elasticClient, err = elastic.NewClient(
			elastic.SetURL(elasticsearchAddr),
			elastic.SetSniff(false),
		)
		if err != nil {
			log.Println(err)
			time.Sleep(3 * time.Second)
		} else {
			// Ping ES and print version number
			context := context.Background()
			info, code, err := elasticClient.Ping(elasticsearchAddr).Do(context)
			if err != nil {
				log.Println(err)
			}
			fmt.Printf("Elasticsearch returned with code %d and version %s\n", code, info.Version.Number)
			break
		}
	}

	ctx := handlers.NewHandlerContext(signingKey, sessionStore, userStore)
	err = ctx.PopulateElasticSearch(elasticClient)
	if err != nil {
		log.Fatalf("can't insert into elasticsearch: %s", err)
	}

	router := mux.NewRouter()
	router.HandleFunc("/users", ctx.UsersHandler)
	router.HandleFunc("/sessions", ctx.SessionsHandler)
	router.HandleFunc("/sessions/", ctx.SpecificSessionsHandler)
	router.HandleFunc("/ping", ctx.PingHandler)
	router.HandleFunc("/ping/", ctx.SpecificPingHandler)

	router.HandleFunc("/search", ctx.SearchHandler)
	router.HandleFunc("/search/bookmarks", ctx.SearchBookmarkHandler)
	router.HandleFunc("/filter", ctx.FilterHandler)
	router.HandleFunc("/documents", ctx.DocumentHandler)
	router.HandleFunc("/documents/{documentID}", ctx.SpecificDocumentHandler)
	router.HandleFunc("/bookmarks/{documentID}", ctx.SpecificBookmarkHandler)
	router.HandleFunc("/bookmarks", ctx.BookmarkHandler)

	wrappedMux := handlers.NewResponseHeader(router)

	tlsKeyPath := os.Getenv("TLSKEY")
	tlsCertPath := os.Getenv("TLSCERT")
	if len(tlsKeyPath) == 0 || len(tlsCertPath) == 0 {
		log.Printf("server is listening at %s...", addr)
		log.Fatal(http.ListenAndServe(addr, wrappedMux))
	} else {
		log.Printf("server is now online at %s...", addr)
		log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, wrappedMux))
	}
}
