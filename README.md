# URL Shortener

A full-stack web application that allows users to shorten long URLs into compact, shareable links. The application supports both anonymous and authenticated users, with additional features like custom slugs and URL history management for registered users.

## Features

### For All Users
- **URL Shortening**: Convert long URLs into short, manageable links
- **Quick Access**: Instant URL shortening without registration
- **Click Tracking**: Track the number of clicks on shortened URLs
- **Redirect Functionality**: Automatic redirection to original URLs

### For Authenticated Users
- **Custom Slugs**: Create personalized short URLs with custom slugs
- **URL History**: View and manage all your shortened URLs in one place
- **User Dashboard**: Access your URL statistics and past links
- **Secure Authentication**: JWT-based authentication with secure password hashing

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **nanoid** - Unique ID generation
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling

### Frontend
- **React** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Context API** - State management

## Project Structure

```
URL_SHORTNER/
├── BACKEND/
│   ├── app.js                 # Main application entry point
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── config.js       # Configuration settings
│       │   └── mongo.config.js # MongoDB connection
│       ├── controllers/
│       │   ├── auth.controller.js      # Authentication logic
│       │   ├── shortUrl.controller.js   # URL shortening logic
│       │   └── user.controller.js       # User-related operations
│       ├── dao/
│       │   ├── shortUrl.js     # Database operations for URLs
│       │   └── user.dao.js     # Database operations for users
│       ├── middleware/
│       │   └── auth.middleware.js # Authentication middleware
│       ├── models/
│       │   ├── shortUrl.model.js # URL schema
│       │   └── user.model.js     # User schema
│       ├── routers/
│       │   ├── auth.route.js      # Authentication routes
│       │   ├── shortUrl.route.js  # URL shortening routes
│       │   └── user.route.js      # User routes
│       ├── services/
│       │   ├── auth.service.js      # Authentication business logic
│       │   └── shortUrl.service.js  # URL shortening business logic
│       └── utils/
│           ├── attchUser.js      # User attachment utility
│           ├── errorHandler.js   # Error handling middleware
│           ├── helper.js         # Helper functions (JWT, hashing, nanoid)
│           └── tryCatch.js      # Async error wrapper
│
└── FRONTEND/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx              # Main app component
        ├── main.jsx             # React entry point
        ├── index.css            # Global styles
        ├── components/
        │   └── Navbar.jsx       # Navigation component
        ├── pages/
        │   ├── Homepage.jsx     # Public homepage
        │   ├── HomeLock.jsx     # Authenticated user dashboard
        │   ├── LoginPage.jsx    # Login page
        │   ├── SignUpPage.jsx   # Registration page
        │   ├── LogoutUser.jsx   # Logout page
        │   └── UserWrapper.jsx  # Protected route wrapper
        └── context/
            └── AppContext.jsx   # Global state management
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd BACKEND
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `BACKEND` directory with the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
APP_URL=http://localhost:3000/
FRONTEND_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run server
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd FRONTEND
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `FRONTEND` directory:
```env
VITE_BASE_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register a new user
  - Body: `{ username, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `POST /api/auth/logout` - Logout user (requires authentication)
- `GET /api/auth/me` - Get current user (requires authentication)

### URL Shortening Routes (`/api/create`)
- `POST /api/create/` - Create a short URL
  - Body: `{ url, slug? }` (slug is optional, only for authenticated users)
  - Can be used by both authenticated and anonymous users

### User Routes (`/api/user`)
- `GET /api/user/urls` - Get all URLs for authenticated user (requires authentication)

### Redirect Route
- `GET /:id` - Redirect to original URL using short URL ID

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `APP_URL` - Base URL of the application
- `FRONTEND_URL` - Frontend URL for CORS configuration

### Frontend (.env)
- `VITE_BASE_URL` - Backend API base URL

## Usage

1. **Public URL Shortening**: Visit the homepage and enter any URL to get a shortened version instantly.

2. **User Registration**: Create an account to access advanced features.

3. **Custom Slugs**: After logging in, you can create custom short URLs with your preferred slug.

4. **URL Management**: View all your shortened URLs in the dashboard, along with click statistics.

5. **URL Redirection**: Click on any short URL or visit `http://localhost:3000/:id` to be redirected to the original URL.

## What I Learned

This project provided hands-on experience with:

### Backend Development
- **RESTful API Design**: Creating well-structured API endpoints following REST principles
- **MVC Architecture**: Implementing Model-View-Controller pattern with separation of concerns
- **Database Design**: Designing MongoDB schemas with Mongoose, including relationships between collections
- **Authentication & Authorization**: Implementing JWT-based authentication with secure password hashing using bcryptjs
- **Middleware Development**: Creating custom middleware for authentication and error handling
- **Error Handling**: Implementing centralized error handling with try-catch wrappers
- **Cookie Management**: Using HTTP-only cookies for secure token storage
- **CORS Configuration**: Setting up Cross-Origin Resource Sharing for frontend-backend communication

### Frontend Development
- **React Hooks**: Using useState, useEffect, and useContext for state management
- **React Router**: Implementing client-side routing with protected routes
- **Context API**: Managing global application state without external libraries
- **API Integration**: Making HTTP requests with Axios and handling responses
- **Form Handling**: Managing form inputs and validation
- **Responsive Design**: Creating responsive UIs with Tailwind CSS
- **Environment Variables**: Using Vite environment variables for configuration

### Full-Stack Integration
- **API Communication**: Connecting React frontend with Express backend
- **State Synchronization**: Keeping frontend state in sync with backend data
- **Authentication Flow**: Implementing complete authentication flow from registration to logout
- **Protected Routes**: Creating route guards for authenticated pages
- **Error Handling**: Handling and displaying errors from API responses

### Development Practices
- **Code Organization**: Structuring code with clear separation of concerns (controllers, services, DAOs)
- **Async/Await**: Working with asynchronous operations and promises
- **Environment Configuration**: Managing different configurations for development and production
- **Version Control**: Organizing project structure for version control


## Live Demo
<!-- Coming soon... -->


## License

ISC

## Author

<!-- Raman kumar -->

