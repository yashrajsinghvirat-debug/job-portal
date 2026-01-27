# Setup Instructions

## 🚀 Complete Setup Guide

Follow these steps to get the Job Portal application running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (Local or Atlas)
   - **Local**: Install MongoDB Community Server
   - **Atlas**: Create free account at https://www.mongodb.com/atlas

3. **Git** (for cloning)
   - Download from: https://git-scm.com/

---

## 📋 Step-by-Step Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>
cd "Job Project"

# Verify the structure
ls
# You should see: backend/ frontend/ README.md
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file
nano .env  # or use your preferred editor
```

#### 2.3 Environment Variables
Update your `.env` file with the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/job-portal

# JWT Secret (use a strong, random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Important:**
- For MongoDB Atlas, use: `mongodb+srv://username:password@cluster-url/job-portal`
- Generate a strong JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

#### 2.4 Start MongoDB (if using local)
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

#### 2.5 Start Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Or production mode
npm start
```

**Verify Backend:**
- Open http://localhost:5000/api/health
- You should see: `{"success": true, "message": "Job Portal API is running"}`

### Step 3: Frontend Setup

#### 3.1 Install Dependencies
```bash
cd ../frontend
npm install
```

#### 3.2 Start Frontend Development Server
```bash
npm run dev
```

**Verify Frontend:**
- Open http://localhost:3000
- You should see the Job Portal homepage

---

## 🧪 Testing the Setup

### 1. Create Test Accounts

#### Admin Account
```bash
# Use these credentials or create your own via registration
Email: admin@jobportal.com
Password: admin123
Role: admin
```

#### Recruiter Account
```bash
Email: recruiter@jobportal.com
Password: recruiter123
Role: recruiter
```

#### Job Seeker Account
```bash
Email: seeker@jobportal.com
Password: seeker123
Role: jobseeker
```

### 2. Test Core Functionality

#### Registration Test
1. Go to http://localhost:3000/register
2. Fill out the registration form
3. Verify successful registration and redirect to dashboard

#### Login Test
1. Go to http://localhost:3000/login
2. Enter test credentials
3. Verify successful login

#### Job Posting Test (Recruiter)
1. Login as recruiter
2. Go to "Post Job"
3. Fill out job details
4. Verify job appears in "My Jobs"

#### Job Application Test (Job Seeker)
1. Login as job seeker
2. Browse jobs
3. Apply for a job
4. Verify application appears in "My Applications"

---

## 🔧 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed
**Error:** `MongooseServerSelectionError`

**Solutions:**
1. Ensure MongoDB is running
2. Check connection string in `.env`
3. Verify network connectivity (for Atlas)

### Issue 2: Port Already in Use
**Error:** `Error: listen EADDRINUSE :::5000`

**Solutions:**
1. Change PORT in backend `.env`
2. Kill the process using the port:
   ```bash
   # On macOS/Linux
   lsof -ti:5000 | xargs kill -9
   
   # On Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

### Issue 3: CORS Errors
**Error:** `Access-Control-Allow-Origin`

**Solutions:**
1. Verify FRONTEND_URL in backend `.env`
2. Ensure both servers are running
3. Check browser console for specific errors

### Issue 4: JWT Token Issues
**Error:** `JsonWebTokenError` or `TokenExpiredError`

**Solutions:**
1. Clear browser localStorage
2. Check JWT_SECRET in `.env`
3. Verify token format in browser dev tools

### Issue 5: Frontend Build Errors
**Error:** Module resolution issues

**Solutions:**
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure all dependencies are installed

---

## 🚀 Production Deployment

### Backend Production Setup

1. **Environment Variables**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-production-secret
FRONTEND_URL=https://your-domain.com
```

2. **Install Production Dependencies**
```bash
cd backend
npm install --production
```

3. **Start Production Server**
```bash
npm start
```

### Frontend Production Setup

1. **Build for Production**
```bash
cd frontend
npm run build
```

2. **Deploy `dist` folder**
- Upload to hosting service (Vercel, Netlify, etc.)
- Configure environment variables if needed

---

## 📱 Development Workflow

### Daily Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Code Quality
```bash
# Backend linting
cd backend
npm run lint

# Frontend linting
cd frontend
npm run lint
```

### Database Management
```bash
# Connect to MongoDB shell
mongosh "mongodb://localhost:27017/job-portal"

# View collections
show collections
db.users.find()
db.jobs.find()
db.applications.find()
```

---

## 🎯 Next Steps

After successful setup:

1. **Explore Features**
   - Test all user roles
   - Try advanced search
   - Test application workflow

2. **Customize**
   - Update branding/colors
   - Modify email templates
   - Add new features

3. **Deploy**
   - Set up production database
   - Configure domain
   - Set up SSL certificates

4. **Monitor**
   - Add logging
   - Set up analytics
   - Monitor performance

---

## 📞 Need Help?

If you encounter issues:

1. **Check the logs** in both backend and frontend terminals
2. **Verify environment variables** in `.env` files
3. **Check browser console** for JavaScript errors
4. **Review MongoDB connection** status

For additional support:
- Check the README.md for API documentation
- Review the code comments for implementation details
- Create an issue in the repository

---

**Happy Coding! 🎉**
