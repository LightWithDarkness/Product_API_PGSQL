## **1. Technologies Used**
### **Backend Framework & Libraries**
- **Express.js** - Fast and minimalist web framework for building REST APIs.  
- **PostgreSQL** - SQL database for storing users and products.  
- **dotenv** - Loads environment variables from a `.env` file.  
- **jsonwebtoken (JWT)** - Handles authentication using JSON Web Tokens.  
- **bcryptjs** - Hashes user passwords securely.  
- **cookie-parser** - Parses cookies for authentication handling.  

---

## **2. Techniques Implemented**
### **a. RESTful API Design**
Your API follows REST principles:  
- **Resource-based Routing** (`/api/v1/auth`, `/api/v1/product`)  
- **CRUD Operations** for products (Create, Read, Update, Delete)  
- **Stateless Architecture** where each request contains authentication data.  

### **b. Authentication & Authorization**
- **User Authentication** using JWT:  
  - Users can **Sign Up** and **Sign In**.  
  - Secure authentication with password hashing (`bcryptjs`).  
  - Tokens are stored in HTTP-only cookies.  
- **Authorization with Middleware**:  
  - `verifyToken` middleware ensures only authenticated users can create, update, or delete products.  
  - Users can only update or delete products they created.  

### **c. Middleware for Security & Error Handling**
- **Custom Error Handling (`errorHandler`)**  
  - Catches and standardizes errors across the API.  
  - Returns JSON responses with appropriate status codes.  
- **JWT-based Middleware (`verifyToken`)**  
  - Ensures that only authorized users can modify product data.  

### **d. Database Integration**
- **PostgreSQL*  
  - Defined structured **User** and **Product** Tables.  
  - Established a one-to-many relationship (each product belongs to a user).  

### **e. CRUD Functionality**
- **User Operations** (`/api/v1/auth`)  
  - **Sign Up** (`POST /signUp`)  
  - **Sign In** (`POST /signIn`)  

- **Product Operations** (`/api/v1/product`)  
  - **Fetch All Products** (`GET /`)  
  - **Fetch a Product by ID** (`GET /:id`)  
  - **Create a Product** (`POST /create`) - Requires authentication.  
  - **Update a Product** (`PUT /update/:id`) - Users can only update their own products.  
  - **Delete a Product** (`DELETE /delete/:id`) - Users can only delete their own products.  

### **f. Security Best Practices**
- **Hashed Passwords** - Uses `bcryptjs` to hash passwords before storing them in the database.  
- **Token-Based Authentication** - Uses JWT stored in HTTP-only cookies to prevent client-side access.  
- **Role-based Access Control (RBAC) Considerations** - Users can only modify their own products.  

---

## **3. Functionality Overview**
| Feature               | Description |
|----------------------|-------------|
| **User Sign Up** | Creates a new user with a hashed password. |
| **User Sign In** | Authenticates user and sets an HTTP-only JWT cookie. |
| **Get All Products** | Retrieves all products. |
| **Get Product by ID** | Fetches a specific product by its ID. |
| **Create Product** | Authenticated users can create new products. |
| **Update Product** | Users can update only their own products. |
| **Delete Product** | Users can delete only their own products. |
| **Error Handling** | Centralized error handling middleware for consistency. |

---
