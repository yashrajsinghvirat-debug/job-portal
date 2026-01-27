# API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // For validation errors
}
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/users/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "jobseeker" // Optional: "jobseeker", "recruiter", "admin"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker"
  }
}
```

### Login User
```http
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker"
  }
}
```

### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker",
    "isBlocked": false,
    "createdAt": "2023-07-08T12:34:56.789Z"
  }
}
```

### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "jobseeker",
    "isBlocked": false,
    "createdAt": "2023-07-08T12:34:56.789Z"
  }
}
```

### Get All Users (Admin Only)
```http
GET /api/users
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "count": 25,
  "users": [
    {
      "id": "64a7b8c9d1e2f3g4h5i6j7k8",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "jobseeker",
      "isBlocked": false,
      "createdAt": "2023-07-08T12:34:56.789Z"
    }
  ]
}
```

### Toggle Block User (Admin Only)
```http
PUT /api/users/:id/block
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "message": "User blocked successfully",
  "user": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "isBlocked": true
  }
}
```

---

## 💼 Job Endpoints

### Get All Jobs
```http
GET /api/jobs?page=1&limit=10&search=developer&location=newyork&company=tech&salary=80000
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search in title, description, company
- `location` (string): Filter by location
- `company` (string): Filter by company
- `salary` (string): Filter by salary

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "pages": 5,
  "currentPage": 1,
  "jobs": [
    {
      "id": "64a7b8c9d1e2f3g4h5i6j7k9",
      "title": "Senior Frontend Developer",
      "description": "We are looking for an experienced frontend developer...",
      "location": "New York, NY",
      "salary": "$80,000 - $120,000",
      "company": "Tech Corp",
      "createdBy": {
        "id": "64a7b8c9d1e2f3g4h5i6j7k8",
        "name": "Jane Recruiter",
        "email": "jane@techcorp.com"
      },
      "isActive": true,
      "createdAt": "2023-07-08T12:34:56.789Z"
    }
  ]
}
```

### Get Job by ID
```http
GET /api/jobs/:id
```

**Response:**
```json
{
  "success": true,
  "job": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k9",
    "title": "Senior Frontend Developer",
    "description": "We are looking for an experienced frontend developer...",
    "location": "New York, NY",
    "salary": "$80,000 - $120,000",
    "company": "Tech Corp",
    "createdBy": {
      "id": "64a7b8c9d1e2f3g4h5i6j7k8",
      "name": "Jane Recruiter",
      "email": "jane@techcorp.com"
    },
    "isActive": true,
    "createdAt": "2023-07-08T12:34:56.789Z"
  }
}
```

### Create Job (Recruiter Only)
```http
POST /api/jobs
Authorization: Bearer <recruiter-token>
```

**Request Body:**
```json
{
  "title": "Senior Backend Developer",
  "description": "We are seeking an experienced backend developer...",
  "location": "San Francisco, CA",
  "salary": "$90,000 - $130,000",
  "company": "Startup Inc"
}
```

**Response:**
```json
{
  "success": true,
  "job": {
    "id": "64a7b8c9d1e2f3g4h5i6j7ka0",
    "title": "Senior Backend Developer",
    "description": "We are seeking an experienced backend developer...",
    "location": "San Francisco, CA",
    "salary": "$90,000 - $130,000",
    "company": "Startup Inc",
    "createdBy": "64a7b8c9d1e2f3g4h5i6j7k8",
    "isActive": true,
    "createdAt": "2023-07-08T12:34:56.789Z"
  }
}
```

### Update Job (Recruiter Only)
```http
PUT /api/jobs/:id
Authorization: Bearer <recruiter-token>
```

**Request Body:**
```json
{
  "title": "Senior Backend Developer (Remote)",
  "salary": "$95,000 - $140,000"
}
```

**Response:**
```json
{
  "success": true,
  "job": {
    "id": "64a7b8c9d1e2f3g4h5i6j7ka0",
    "title": "Senior Backend Developer (Remote)",
    "description": "We are seeking an experienced backend developer...",
    "location": "San Francisco, CA",
    "salary": "$95,000 - $140,000",
    "company": "Startup Inc",
    "createdBy": "64a7b8c9d1e2f3g4h5i6j7k8",
    "isActive": true,
    "createdAt": "2023-07-08T12:34:56.789Z"
  }
}
```

### Delete Job (Recruiter Only)
```http
DELETE /api/jobs/:id
Authorization: Bearer <recruiter-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

### Get My Jobs (Recruiter Only)
```http
GET /api/jobs/my-jobs?page=1&limit=10
Authorization: Bearer <recruiter-token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 12,
  "pages": 3,
  "currentPage": 1,
  "jobs": [
    {
      "id": "64a7b8c9d1e2f3g4h5i6j7ka0",
      "title": "Senior Backend Developer",
      "description": "We are seeking an experienced backend developer...",
      "location": "San Francisco, CA",
      "salary": "$90,000 - $130,000",
      "company": "Startup Inc",
      "isActive": true,
      "createdAt": "2023-07-08T12:34:56.789Z"
    }
  ]
}
```

---

## 📄 Application Endpoints

### Apply for Job (Job Seeker Only)
```http
POST /api/applications
Authorization: Bearer <jobseeker-token>
```

**Request Body:**
```json
{
  "jobId": "64a7b8c9d1e2f3g4h5i6j7ka0"
}
```

**Response:**
```json
{
  "success": true,
  "application": {
    "id": "64a7b8c9d1e2f3g4h5i6j7ka1",
    "jobId": {
      "id": "64a7b8c9d1e2f3g4h5i6j7ka0",
      "title": "Senior Backend Developer",
      "company": "Startup Inc",
      "location": "San Francisco, CA",
      "salary": "$90,000 - $130,000"
    },
    "userId": {
      "id": "64a7b8c9d1e2f3g4h5i6j7k8",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "pending",
    "appliedAt": "2023-07-08T12:34:56.789Z"
  }
}
```

### Get My Applications (Job Seeker Only)
```http
GET /api/applications/my-applications?page=1&limit=10
Authorization: Bearer <jobseeker-token>
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "total": 8,
  "pages": 3,
  "currentPage": 1,
  "applications": [
    {
      "id": "64a7b8c9d1e2f3g4h5i6j7ka1",
      "jobId": {
        "id": "64a7b8c9d1e2f3g4h5i6j7ka0",
        "title": "Senior Backend Developer",
        "company": "Startup Inc",
        "location": "San Francisco, CA",
        "salary": "$90,000 - $130,000"
      },
      "status": "pending",
      "appliedAt": "2023-07-08T12:34:56.789Z"
    }
  ]
}
```

### Get Job Applicants (Recruiter Only)
```http
GET /api/applications/job/:jobId?page=1&limit=10
Authorization: Bearer <recruiter-token>
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "total": 23,
  "pages": 3,
  "currentPage": 1,
  "applications": [
    {
      "id": "64a7b8c9d1e2f3g4h5i6j7ka1",
      "userId": {
        "id": "64a7b8c9d1e2f3g4h5i6j7k8",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "pending",
      "appliedAt": "2023-07-08T12:34:56.789Z"
    }
  ]
}
```

### Update Application Status (Recruiter Only)
```http
PUT /api/applications/:id/status
Authorization: Bearer <recruiter-token>
```

**Request Body:**
```json
{
  "status": "accepted"
}
```

**Response:**
```json
{
  "success": true,
  "application": {
    "id": "64a7b8c9d1e2f3g4h5i6j7ka1",
    "jobId": {
      "id": "64a7b8c9d1e2f3g4h5i6j7ka0",
      "title": "Senior Backend Developer",
      "company": "Startup Inc"
    },
    "userId": {
      "id": "64a7b8c9d1e2f3g4h5i6j7k8",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "status": "accepted",
    "appliedAt": "2023-07-08T12:34:56.789Z"
  }
}
```

### Get All Applications (Admin Only)
```http
GET /api/applications?page=1&limit=10
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "count": 50,
  "total": 156,
  "pages": 16,
  "currentPage": 1,
  "applications": [
    {
      "id": "64a7b8c9d1e2f3g4h5i6j7ka1",
      "jobId": {
        "id": "64a7b8c9d1e2f3g4h5i6j7ka0",
        "title": "Senior Backend Developer",
        "company": "Startup Inc"
      },
      "userId": {
        "id": "64a7b8c9d1e2f3g4h5i6j7k8",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "pending",
      "appliedAt": "2023-07-08T12:34:56.789Z"
    }
  ]
}
```

---

## 🏥 Health Check

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Job Portal API is running",
  "timestamp": "2023-07-08T12:34:56.789Z"
}
```

---

## 🚨 Error Codes

### Authentication Errors
- `401 Unauthorized`: Invalid or missing token
- `403 Forbidden`: Insufficient permissions
- `401 Account Blocked`: User account is blocked

### Validation Errors
- `400 Bad Request`: Invalid input data
- `422 Unprocessable Entity`: Validation failed

### Resource Errors
- `404 Not Found`: Resource doesn't exist
- `409 Conflict`: Duplicate resource (e.g., duplicate email)

### Server Errors
- `500 Internal Server Error`: Server error
- `503 Service Unavailable`: Database connection error

---

## 📝 Rate Limiting

Currently, there are no rate limits implemented. Consider implementing rate limiting for production:
- Login attempts: 5 per minute
- Registration: 3 per hour
- Job applications: 10 per minute

---

## 🔍 Pagination

All list endpoints support pagination:

**Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

**Response includes:**
- `count`: Items on current page
- `total`: Total items
- `pages`: Total pages
- `currentPage`: Current page number

---

## 🎯 Search and Filtering

### Jobs Search
- Text search across title, description, and company
- Filter by location, company, salary
- Case-insensitive partial matching

### Users Search (Admin)
- Search by name or email
- Filter by role or blocked status

---

## 📊 Response Examples

### Validation Error Response
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Not Found Error Response
```json
{
  "success": false,
  "message": "Job not found"
}
```

### Server Error Response
```json
{
  "success": false,
  "message": "Database connection failed"
}
```

---

## 🧪 Testing the API

### Using curl
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","role":"jobseeker"}'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Using Postman
1. Import the API collection
2. Set base URL to `http://localhost:5000/api`
3. Use the `/api/users/login` response to get auth token
4. Add token to Authorization header: `Bearer <token>`

---

**API Version: 1.0.0**
**Last Updated: July 2023**
