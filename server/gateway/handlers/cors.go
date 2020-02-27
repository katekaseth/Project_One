package handlers

import (
	"net/http"
)

// Header is name and value of header
type Header struct {
	name  string
	value string
}

//ResponseHeader is a middleware handler that adds a header to the response
type ResponseHeader struct {
	handler http.Handler
	headers []Header
}

//NewResponseHeader constructs a new ResponseHeader middleware handler
func NewResponseHeader(handlerToWrap http.Handler) *ResponseHeader {
	headers := []Header{Header{"Access-Control-Allow-Origin", "*"}, Header{"Access-Control-Allow-Methods", "GET, POST, DELETE"},
		Header{"Access-Control-Allow-Headers", "Content-Type, Authorization"}, Header{"Access-Control-Expose-Headers", "Authorization"},
		Header{"Access-Control-Max-Age", "600"}}
	return &ResponseHeader{handlerToWrap, headers}
}

//ServeHTTP handles the request by adding the response header
func (rh *ResponseHeader) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	//add the headers
	for i := 0; i < len(rh.headers); i++ {
		w.Header().Add(rh.headers[i].name, rh.headers[i].value)
	}
	//for htttps
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	//call the wrapped handler
	rh.handler.ServeHTTP(w, r)
}
