RBAC - Role-Based Access Control API

This is a Role-Based Access Control (RBAC) API built using Node.js, Express, MongoDB, and JWT authentication. It provides authentication and authorization mechanisms for managing users, roles, and access levels.

Project Structure

RBAC/
│── backend/
│ ├── controllers/ # Handles API request logic
│ ├── routes/ # Defines API routes
│ ├── services/ # Business logic
│ ├── models/ # Mongoose database models
│ ├── test/ # Contains test files (auth.test.js)
│ ├── app.js # Main application file
│ ├── server.js # Starts the server
│ ├── config/ # Environment variables & config files
│── docs/
│ ├── RBAC-API.postman_collection.json # Postman API documentation
│── README.md # API documentation file
│── .env # Environment variables (Not included in repo)
│── package.json # Dependencies & scripts
│── jest.config.mjs # Jest configuration

Installation and Setup

Clone the repository
sh
Copy
Edit
git clone https://github.com/yourusername/RBAC.git  
cd RBAC/backend  
Install dependencies
sh
Copy
Edit
npm install  
Set up environment variables
Create a .env file in the backend/ directory and add the following:
env
Copy
Edit
MONGO_URL=your_mongodb_connection_string  
PORT=3000  
JWT_SECRET=your_jwt_secret  
NODE_ENV=development  
Start the server
sh
Copy
Edit
npm run dev  
The API will run on http://localhost:3000

Running Tests

To run Jest tests, use:

sh
Copy
Edit
npm test  
API Documentation

The Postman collection is available in the docs/ folder.

How to Import Postman Collection

Open Postman.
Click Import.
Select docs/RBAC-API.postman_collection.json and import it.
Use the endpoints with your own test credentials.
API Endpoints

Authentication

POST /api/auth/signup - Register a new user
POST /api/auth/login - Login user
POST /api/auth/logout - Logout user
POST /api/auth/verify-account - Verify user account
POST /api/auth/reset-password - Reset password request
PUT /api/auth/reset-password/:token - Set new password

User Management (Admin Only)

GET /api/user - Get all users
GET /api/user/:id - Get user by ID
DELETE /api/user/delete/:id - Delete a user
PUT /api/user/update-user-role/:id - Update user role

Technologies Used

Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT, bcrypt
Testing: Jest, Supertest
API Documentation: Postman