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

# Document Endpoints

All endpoints require authenticated user in the form of an authorization bearer token. Add request header: `Authorization: Bearer <token>`

- `GET /search`: Returns a list of documents matching the body query.
  - Request body: 
	``` Javascript
    // Note that the terms should match those give by the /filter endpoints exactly.
	{
        // Can also use "Subject Area", "Tool Type", "Database".
        subjectArea: ["array", "of", "filters"],
		toolType: ["array", "of", "filters"],
		database: ["array", "of", "filters"],
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
        }
    ]
	```
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be GET
    - `409`: Can't insert to store, Error beginning a session
    - `415`: Request body must be in JSON, Request is nil
    - `500`: Decoding failed, Error getting documents

- `GET /filter`: Returns a list of current filters available in the database.
  - Response body:
	``` Javascript
    {
        "Subject Area": ["array", "of", "filters"],
        "Tool Type": ["array", "of", "filters"],
        "Database": ["array", "of", "filters"],
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
        "database": "EDWAdminMart",
        "sqlQuery": "SELECT * FROM student"
    }
	```
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be GET
    - `500`: Internal server error

- ** PLANNED ** `POST /bookmarks/:documentID`: Adds the specifed document to the current authenticated user's bookmarks.
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be POST
    - `500`: Internal server error

- ** PLANNED ** `DELETE /bookmarks/:documentID`: Deletes the specifed document from the current authenticated user's bookmarks.
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be POST
    - `500`: Internal server error

- ** PLANNED ** `GET /bookmarks`: Responds with a list of all current authenticated user's bookmark.
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
        }
    ]
	```
  - Responses:
    - `200`: Success
    - `401`: User not authenticated
    - `405`: Method must be GET
    - `500`: Internal server error