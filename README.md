# Resume Builder App

A modern, full-stack resume builder application built with React, Node.js, Express, and MongoDB. Create professional resumes with a beautiful, modular interface.

## Features

- 🔐 **User Authentication** - Secure login/register system with JWT
- 📝 **Resume Creation** - Build resumes with multiple sections
- 🎨 **Multiple Templates** - Choose from different resume templates
- 💾 **Save & Manage** - Save multiple resumes and manage them
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **Real-time Preview** - See changes as you type
- 📤 **Export Options** - Export resumes in different formats

## Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router DOM
- Axios
- React Hook Form
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled
- Helmet for security

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd codent-resume-builder
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb://localhost:27017/resume-builder
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Start the Application

#### Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### Production Mode
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `PUT /api/users/change-password` - Change password (protected)
- `DELETE /api/users/account` - Delete account (protected)

### Resumes
- `GET /api/resumes` - Get user's resumes (protected)
- `GET /api/resumes/:id` - Get specific resume (protected)
- `POST /api/resumes` - Create new resume (protected)
- `PUT /api/resumes/:id` - Update resume (protected)
- `DELETE /api/resumes/:id` - Delete resume (protected)
- `POST /api/resumes/:id/duplicate` - Duplicate resume (protected)
- `GET /api/resumes/public` - Get public resumes

### Health Check
- `GET /api/health` - API health check

## Project Structure

```
codent-resume-builder/
├── backend/
│   ├── config/
│   │   └── DbConfig.js
│   ├── controllers/
│   │   ├── resumeController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Resume.js
│   │   └── User.js
│   ├── routes/
│   │   ├── resumeRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── layout/
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGO_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend URL for CORS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

## Acknowledgments

- Material-UI for the beautiful components
- React community for the excellent ecosystem
- MongoDB for the database solution

