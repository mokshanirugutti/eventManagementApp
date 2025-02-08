### Event Management App

This is a **Node.js/Express** application that allows users to create, join, and manage events. It utilizes **MongoDB** for data storage and **Socket.IO** for real-time communication.

---

### **Project Overview**
A **Node.js/Express application** with **MongoDB** as the database. It includes:
1. **Authentication**: User registration, login, and JWT-based authentication.
2. **Event Management**: Create, join, update, delete, and filter events.
3. **Real-time Communication**: Using **Socket.IO** for real-time updates on event participation.
4. **Validation**: Using **Zod** for request validation.
5. **Middleware**: Authentication and validation middleware to secure routes.
6. **Database Models**: Mongoose schemas for `User` and `Event`.

---

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/mokshanirugutti/eventManagementApp
   cd eventManagementApp
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the backend directory and add your MongoDB URI and JWT secret:
   ```plaintext
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

---

### **Usage**

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

---

### **Key Features and Functionality**

#### 1. **Authentication**
- **User Registration**: Validates user input, checks for existing usernames/emails, hashes passwords, and generates JWT tokens.
- **User Login**: Validates user input and generates JWT tokens for authenticated users.

#### 2. **Event Management**
- **Create Event**: Validates event data and creates a new event in the database.
- **Join Event**: Allows authenticated users to join an event.
- **Update Event**: Only allows the event creator to update the event.
- **Delete Event**: Only allows the event creator to delete the event.
- **Filter Events**: Supports filtering events by `upcoming` or `past`.

#### 3. **Real-time Communication**
- Uses **Socket.IO** to provide real-time updates on event participation.

#### 4. **Validation**
- Utilizes **Zod** schemas for validating user and event data.

#### 5. **Database Models**
- **User Model**: Contains fields for username, email, password, and references to created/joined events.
- **Event Model**: Contains fields for title, description, date, creator, and attendees.

---

### **Backend**
🔗 [Backend more clearly](./backend/README.md)
