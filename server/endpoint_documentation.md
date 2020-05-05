# User Endpoints

- `POST /users`: Creates new user accounts and begins a new session.
  - Request body:
	``` Javascript
	{
		userName: (userName),
		password: (password),
		passwordConf: (password typed again)
	}
	```
  - Response body:
	``` Javascript
	{
		userID: (userID),
		userName: (userName)
	}
	```
  - Response headers:
    - `Authorization`: bearer token for the session
  - Responses:
    - `201`: (Successfully creates user and begins new session)
    - `400`: Invalid new user
    - `405`: Method must be POST
    - `409`: Can't insert to store, Error beginning a session
    - `415`: Request body must be in JSON, Request is nil
    - `500`: Decoding failed, Internal server error

- `POST /sessions`: Begins a new session for user.
  - Request body:
	``` Javascript
	{
		password: (password),
		userName: (userName)  
	}
	```
  - Response body:
	``` Javascript
	{
		userID: (userID),
		userName: (userName)
	}
	```
  - Response headers:
    - `Authorization`: bearer token for the session
  - Responses:
    - `201`: (Session successfully started)
    - `401`: Invalid credentials
    - `405`: Method must be POST
    - `409`: Error beginning a session
    - `415`: Request body not in JSON, Request is nil
    - `500`: Decoding failed, Internal server error

- `DELETE /sessions/`: Deletes the session.
  - Request headers:
    - `Authorization`: bearer token for the session
  - Responses:
    - `200`: signed out
    - `403`: User not authenticated
    - `405`: Method must be DELETE
    - `409`: Error ending session

- `GET /ping`: Pings the server.
  - Responses:
    - `200`: server is running

- `GET /ping/`: Pings the server to check if bearer token is correct.
  - Request headers:
    - `Authorization`: bearer token for the session
  - Responses:
    - `200`: signed in, bearer token is valid
    - `401`: User not authorized

# Document Endpoints

All endpoints require authenticated user in the form of an authorization bearer token. Add request header: `Authorization: Bearer <token>`

- `POST /search`: Returns a list of documents matching the body query.
  - Request body: 
	``` Javascript
    // Note that the terms should match those given by the /filter endpoints exactly.
	{
    "Subject Area": ["array", "of", "filters"],
		"Tool Type": [],
    "Database": [],
    "Support Group": [],
    "searchTerms": []
	}
	```
  - Response body:
	``` Javascript
    // An array of document objects. Example:
    [
        {
            "DocumentID": 1,
            "title": "How Many Students By College",
            "toolType": "Report",
            "created": "2012-10-15T00:00:00Z",
            "updated": "2012-12-04T00:00:00Z",
            "description": "Displays a graph...",
            "subjectArea": "Financial Resources",
            "database": "EDWAdminMart"
            "isBookmarked": "false"
        }
    ]
	```
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be POST
    - `409`: Can't insert to store, Error beginning a session
    - `415`: Request body must be in JSON, Request is nil
    - `500`: Decoding failed, Error getting documents

- `POST /search/bookmarks`: Returns a list of bookmarked documents matching the query. Only searches on searchTerms.

- `GET /filter`: Returns a list of current filters available in the database.
  - Response body:
	``` Javascript
    {
        "Subject Area": ["array", "of", "filters"],
        "Tool Type": [],
        "Database": [],
    }
	```
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be GET
    - `500`: Internal server error

- `GET /documents/:documentID`: Returns the document with given documentID.
  - Response body:
	``` Javascript
    // A single full document object. Example:
    {
        "DocumentID": 1,
        "title": "How Many Students By College",
        "toolType": "Report",
        "created": "2012-10-15T00:00:00Z",
        "updated": "2012-12-04T00:00:00Z",
        "custodian": "John Doe",
        "author": "Jane Doe",
        "description": "Displays a graph...",
        "subjectArea": "Financial Resources",
        "sqlQuery": "SELECT * FROM student",
        "supportGroup": "Enrollment Information Services",
        "database": "EDWAdminMart",
        "terms": [
          {
            "term": "Department",
            "definition": "An organization unit at..."
          },
          {
            "term": "Department",
            "definition": "An organization unit at..."
          }
        ]
    }
	```
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be GET
    - `500`: Internal server error

- `POST /documents`: Returns document summaries with the given documentIDs.
  - Request body:
  ```Javascript
  {
      "documentIDs": [1,3,187]
  }
  ```
  - Response body: see /search for document summary fields
  - Responses: same as above

- `POST /bookmarks/:documentID`: Adds the specifed document to the current authenticated user's bookmarks.
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be POST
    - `500`: Internal server error

- `DELETE /bookmarks/:documentID`: Deletes the specifed document from the current authenticated user's bookmarks.
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be POST
    - `500`: Internal server error

- `GET /bookmarks`: Responds with a list of all current authenticated user's bookmark.
  - Response body:
	``` Javascript
    // An array of document summary objects. Example:
    [
        {
            "DocumentID": 1,
            "title": "How Many Students By College",
            "toolType": "Report",
            "created": "2012-10-15T00:00:00Z",
            "updated": "2012-12-04T00:00:00Z",
            "description": "Displays a graph...",
            "subjectArea": "Financial Resources",
            "database": "EDWAdminMart"
        }
    ]
	```
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be GET
    - `500`: Internal server error
