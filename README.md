# Job Portal - Full Stack Application

A complete, production-ready job portal web application built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Authentication & Authorization
- User registration and login with JWT tokens
- Role-based access control (Admin, Recruiter, Job Seeker)
- Password hashing with bcrypt
- Protected routes and middleware

### Job Management
- Create, update, and delete job postings
- Advanced job search with filters
- Pagination for large datasets
- Job status management (active/inactive)

### Application System
- Apply for jobs with one click
- Track application status
- View applicants for posted jobs
- Accept/reject applications

### User Management
- Profile management
- View applied jobs
- Admin user management (block/unblock)
- Role-specific dashboards

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Axios** for API calls
- **React Hook Form** for forms
- **Context API** for state management
- **Lucide React** for icons

### Backend
- **Node.js** with ES Modules
- **Express.js** framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **dotenv** for environment variables

## 📁 Project Structure

```
Job Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   ├── jobController.js
│   │   │   └── applicationController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Job.js
│   │   │   └── Application.js
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   └── applicationRoutes.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── JobDetails.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── PostJob.jsx
│   │   │   ├── MyJobs.jsx
│   │   │   ├── Applications.jsx
│   │   │   ├── Applicants.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── jobService.js
│   │   │   └── applicationService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Job Project"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
```

#### Environment Variables (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-portal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Start Backend Server
```bash
# For development
npm run dev

# For production
npm start
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "jobseeker"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>
```

### Job Endpoints

#### Get All Jobs
```http
GET /api/jobs?page=1&limit=10&search=developer&location=newyork
```

#### Get Job by ID
```http
GET /api/jobs/:id
```

#### Create Job (Recruiter only)
```http
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior Developer",
  "description": "Job description...",
  "location": "New York",
  "salary": "$80,000 - $120,000",
  "company": "Tech Corp"
}
```

#### Update Job (Recruiter only)
```http
PUT /api/jobs/:id
Authorization: Bearer <token>
```

#### Delete Job (Recruiter only)
```http
DELETE /api/jobs/:id
Authorization: Bearer <token>
```

### Application Endpoints

#### Apply for Job (Job Seeker only)
```http
POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "jobId": "job_id_here"
}
```

#### Get My Applications (Job Seeker only)
```http
GET /api/applications/my-applications
Authorization: Bearer <token>
```

#### Get Job Applicants (Recruiter only)
```http
GET /api/applications/job/:jobId
Authorization: Bearer <token>
```

#### Update Application Status (Recruiter only)
```http
PUT /api/applications/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted"
}
```

## 👥 User Roles & Permissions

### Job Seeker
- Browse and search jobs
- Apply for jobs
- View application status
- Update profile

### Recruiter
- All Job Seeker permissions
- Post, edit, and delete jobs
- View job applicants
- Accept/reject applications
- View posted jobs

### Admin
- All Recruiter permissions
- Manage all users
- Block/unblock users
- View all applications
- Access admin dashboard

## 🏗️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'recruiter', 'jobseeker']),
  isBlocked: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### Job Model
```javascript
{
  title: String,
  description: String,
  location: String,
  salary: String,
  company: String,
  createdBy: ObjectId (ref: 'User'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Application Model
```javascript
{
  jobId: ObjectId (ref: 'Job'),
  userId: ObjectId (ref: 'User'),
  status: String (enum: ['pending', 'accepted', 'rejected']),
  appliedAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Production Deployment

### Backend Deployment
1. Set environment variables for production
2. Build the application:
```bash
cd backend
npm install --production
```
3. Start the server:
```bash
npm start
```

### Frontend Deployment
1. Build the frontend:
```bash
cd frontend
npm run build
```
2. Deploy the `dist` folder to your hosting service

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-production-secret-key
FRONTEND_URL=https://your-frontend-domain.com
```

## 🔧 Development Tips

### Common Issues & Solutions

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file

2. **CORS Issues**
   - Verify FRONTEND_URL in backend .env
   - Check CORS configuration

3. **JWT Token Issues**
   - Clear browser localStorage
   - Check JWT_SECRET in .env

4. **Port Conflicts**
   - Change PORT in backend .env
   - Update proxy in frontend vite.config.js

### Code Quality
- Use ESLint for code linting
- Follow React best practices
- Implement proper error handling
- Use meaningful variable names

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please contact:
- Email: contact@jobportal.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

---

**Happy Coding! 🎉**
