# Game Item Management API

A RESTful API for managing game items and users. This API allows you to create, read, update, and delete items and users, with items being stored in a catalog and users being able to own multiple items.

## Features

- Item management (CRUD operations)
- User management (CRUD operations)
- Item catalog system
- User-item relationship management
- Input validation
- Error handling
- Web interface for testing and documentation

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
npm start
```

The server will start on http://localhost:3000

## API Endpoints

### Items

#### Create Item(s)
- **POST** `/items`
- Accepts single item or array of items
- Required fields: id, name, type, effect
- Returns created item(s)

#### Get All Items
- **GET** `/items`
- Returns all items in the catalog

#### Get Item by ID
- **GET** `/items/:id`
- Returns item with specified ID

#### Update Item
- **PUT** `/items/:id`
- Updates specified fields of item
- Returns updated item

#### Delete Item
- **DELETE** `/items/:id`
- Removes item from catalog

### Users

#### Create User(s)
- **POST** `/users`
- Accepts single user or array of users
- Required fields: id, name, email
- Optional field: items (array of item IDs)
- Returns created user(s)

#### Get All Users
- **GET** `/users`
- Returns all users with their complete item information

#### Get User by ID
- **GET** `/users/:id`
- Returns user with specified ID and their complete item information

#### Update User
- **PUT** `/users/:id`
- Updates specified fields of user
- Returns updated user

#### Delete User
- **DELETE** `/users/:id`
- Removes user from system

## Testing

The API includes a web interface for testing all endpoints. To use it:

1. Start the server
2. Open http://localhost:3000 in your browser
3. Use the test interface to run API tests
4. View results in the console output

## Data Structures

### Item
```json
{
    "id": "string",
    "name": "string",
    "type": "string",
    "effect": "string"
}
```

### User
```json
{
    "id": "string",
    "name": "string",
    "email": "string",
    "items": ["string"] // Array of item IDs
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found

Error responses include a message explaining what went wrong.

## License

ISC 