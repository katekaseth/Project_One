package handlers

import (
	"Project_One/server/gateway/documents"
	"Project_One/server/gateway/sessions"
	"Project_One/server/gateway/users"
	"context"
	"log"
	"strconv"
	"time"

	"github.com/olivere/elastic"
)

const (
	elasticIndexName = "documents"
	elasticTypeName  = "document"
)

// HandlerContext stores globals that will need to be
// used by handler functions.
type HandlerContext struct {
	SigningKey   string
	SessionStore *sessions.RedisStore
	UserStore    *users.MySQLStore
}

// NewHandlerContext constructs a new HandlerContext,
// ensuring that the dependencies are not nil values
func NewHandlerContext(signingKey string, sessionStore *sessions.RedisStore, userStore *users.MySQLStore) *HandlerContext {
	if len(signingKey) == 0 || sessionStore == nil || userStore == nil {
		panic("nil parameter!")
	}
	return &HandlerContext{
		SigningKey:   signingKey,
		SessionStore: sessionStore,
		UserStore:    userStore,
	}
}

// PopulateElasticSearch populates elasticsearch with documents from the database.
func (ctx *HandlerContext) PopulateElasticSearch(elasticClient *elastic.Client) error {
	context := context.Background()
	docs, err := ctx.UserStore.GetAllElasticDocuments()
	if err != nil {
		return err
	}
	bulk := elasticClient.
		Bulk().
		Index(elasticIndexName).
		Type(elasticTypeName)
	for _, d := range docs {
		doc := documents.ElasticDocument{
			DocumentID:  d.DocumentID,
			Title:       d.Title,
			CreatedAt:   time.Now().UTC(),
			Description: d.Description,
		}
		bulk.Add(elastic.NewBulkIndexRequest().Id(strconv.Itoa(doc.DocumentID)).Doc(doc))
	}
	if _, err := bulk.Do(context); err != nil {
		log.Println(err)
		return err
	}
	return nil
}
