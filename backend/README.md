```
📁 backend/
├── 📁 src/
│   ├── 📁 config/
│   │   ├── 📄 jwt.ts                # JWT configuration (secret, token generation)
│   ├── 📁 controllers/
│   │   ├── 📄 auth.ts               # Authentication controllers (login, register)
│   │   ├── 📄 events.ts             # Event-related controllers (create, join, update, delete, getAllEvents,getEventById)
│   ├── 📁 db/
│   │   ├── 📄 db.ts                 # MongoDB connection setup
│   ├── 📁 middleware/
│   │   ├── 📄 authMiddleware.ts     # Authentication middleware
│   │   ├── 📄 validateEvent.ts      # Event validation middleware
│   ├── 📁 models/
│   │   ├── 📄 Event.ts              # Event model (Mongoose schema)
│   │   ├── 📄 User.ts               # User model (Mongoose schema)
│   ├── 📁 routes/
│   │   ├── 📄 auth.ts               # Authentication routes (login, register)
│   │   ├── 📄 events.ts             # Event-related routes
│   ├── 📁 schemas/
│   │   ├── 📄 eventSchemas.ts       # Zod schemas for event validation
│   │   ├── 📄 userSchemas.ts        # Zod schemas for user validation
│   ├── 📄 index.ts                    
├── 📄 .env                          # Environment variables
├── 📄 .gitignore                  
├── 📄 nodemon.json                  
├── 📄 package-lock.json                  
├── 📄 package.json                  
├── 📄 README.md                     
├── 📄 tsconfig.json                 
├── 📄 tsconfig.tsbuildinfo           
```



---

### **Project Overview**
A **Node.js/Express application** with **MongoDB** as the database. It includes:
1. **Authentication**: User registration, login, and JWT-based authentication.
2. **Event Management**: Create, join, update, delete, and filter events.
3. **Validation**: Using **Zod** for request validation.
4. **Middleware**: Authentication and validation middleware to secure routes.
5. **Database Models**: Mongoose schemas for `User` and `Event`.

---

### **Key Features and Functionality**

#### 1. **Authentication**
- **User Registration**:
  - Validates user input using Zod (`userRegistrationSchema`).
  - Checks if the username or email already exists.
  - Hashes the password using `bcrypt`.
  - Creates a new user in the database.
  - Generates a JWT token for the user.

- **User Login**:
  - Validates user input using Zod (`userLoginSchema`).
  - Checks if the username exists and verifies the password using `bcrypt`.
  - Generates a JWT token for the authenticated user.

- **JWT Authentication**:
  - Middleware (`authMiddleware`) verifies the JWT token in protected routes.
  - Attaches the `userId` to the request object for use in controllers.

---

#### 2. **Event Management**
- **Create Event**:
  - Validates event data using Zod (`eventCreationSchema`).
  - Creates a new event in the database with the authenticated user as the creator.

- **Join Event**:
  - Allows authenticated users to join an event by adding their `userId` to the `attendees` array.

- **Update Event**:
  - Validates event data using Zod (`eventUpdateSchema`).
  - Only allows the event creator to update the event.

- **Delete Event**:
  - Only allows the event creator to delete the event.

- **Filter Events**:
  - Supports filtering events by `upcoming` or `past` using query parameters.

- **Event Status**:
  - Dynamically calculates the status of an event (`upcoming`, `ongoing`, or `completed`) based on the event date.

---

#### 3. **Validation**
- **Zod Schemas**:
  - `userRegistrationSchema`: Validates username, email, and password during registration.
  - `userLoginSchema`: Validates username and password during login.
  - `eventCreationSchema`: Validates title, description, and date during event creation.
  - `eventUpdateSchema`: Allows partial updates to event data.

- **Middleware**:
  - `validateEvent`: Validates event data before processing in controllers.
  - `validateRegistration` and `validateLogin`: Validate user input for registration and login.

---

#### 4. **Database Models**
- **User Model**:
  - Fields: `username`, `email`, `password`, `createdEvents`, `joinedEvents`.
  - Relationships:
    - `createdEvents`: References events created by the user.
    - `joinedEvents`: References events the user has joined.

- **Event Model**:
  - Fields: `title`, `description`, `date`, `creator`, `attendees`.
  - Relationships:
    - `creator`: References the user who created the event.
    - `attendees`: References users who have joined the event.

---

#### 5. **Routes**
- **Authentication Routes**:
  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Log in an existing user.

- **Event Routes**:
  - `GET /events`: Get all events (with optional filtering).
  - `GET /events/:id`: Get a single event by ID.
  - `POST /events`: Create a new event (protected route).
  - `POST /events/join/:id`: Join an event (protected route).
  - `PUT /events/:id`: Update an event (protected route).
  - `DELETE /events/:id`: Delete an event (protected route).

---

#### 6. **Middleware**
- **Authentication Middleware**:
  - Verifies the JWT token and attaches the `userId` to the request object.

- **Validation Middleware**:
  - Validates request data using Zod schemas before passing it to controllers.

---

#### 7. **Database Connection**
- **MongoDB**:
  - Connects to MongoDB using the `connectDB` function.
  - Uses environment variables (`MONGODB_URI`) for the connection string.


---

### **Example Workflow**
1. **User Registration**:
   - A user sends a `POST /auth/register` request with their username, email, and password.
   - The server validates the input, hashes the password, and creates a new user in the database.
   - A JWT token is generated and returned to the user.

2. **User Login**:
   - A user sends a `POST /auth/login` request with their username and password.
   - The server validates the input, verifies the password, and generates a JWT token.

3. **Create Event**:
   - An authenticated user sends a `POST /events` request with event details (title, description, date).
   - The server validates the input, creates the event, and associates it with the user.

4. **Join Event**:
   - An authenticated user sends a `POST /events/join/:id` request to join an event.
   - The server adds the user to the event's `attendees` array.

---

