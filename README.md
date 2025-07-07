ALL API Endpoints are Here



1. Authentication APIs (/api/auth)
File: RC_Online-backend/routes/auth.js
POST /api/auth/register
Register a new user. Public access.
Expects username, email, and password. Returns user info and JWT token.
POST /api/auth/login
Login a user and return a JWT token. Public access.
Expects email and password. Returns user info and JWT token.
GET /api/auth/me
Get the current user's profile. Private (requires authentication).
Returns user profile data.
2. User APIs (/api/user)
File: RC_Online-backend/routes/user.js
GET /api/user/data
Get user-specific data. Private (authenticated users only).
Returns profile, dashboard stats, recent activity, and settings.
PUT /api/user/profile
Update user profile (username/email). Private (authenticated users only).
Updates and returns the user profile.
GET /api/user/orders
Get the user's orders. Private (authenticated users only).
Returns a list of the user's orders.
3. Admin APIs (/api/admin)
File: RC_Online-backend/routes/admin.js
GET /api/admin/data
Get admin dashboard data. Private (admin only).
Returns statistics, recent users, and system info.
GET /api/admin/users
Get all users with pagination. Private (admin only).
Returns a paginated list of users.
PUT /api/admin/users/:id/role
Update a user's role (user/admin). Private (admin only).
Changes the role of a user by ID.
PUT /api/admin/users/:id/status
Update a user's status (active/inactive). Private (admin only).
Activates or deactivates a user by ID.
