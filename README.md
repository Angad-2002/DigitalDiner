# Digital Diner - Restaurant Management System

A full-stack restaurant management system built with React, Node.js, Express, and PostgreSQL.

## Repository
[GitHub Repository](https://github.com/Angad-2002/DigitalDiner)

## Live Demo

- Frontend: [Digital Diner on Netlify](https://digitaldiner.netlify.app)
- Backend: [Digital Diner API on Render](https://digitaldiner-uzml.onrender.com)

## Features

- User authentication (login/signup)
- Menu management
- Order placement and tracking
- Order history
- Admin dashboard
- Real-time order status updates

## Tech Stack

### Frontend
- React.js
- Redux Toolkit for state management
- Material-UI for UI components
- Axios for API calls

### Backend
- Node.js
- Express.js
- PostgreSQL for order management
- MongoDB for menu items
- JWT for authentication

## Database Design Choices

### MongoDB for Menu Items
- **Flexibility**: Menu items have varying attributes and structures
- **Schema Evolution**: Easy to add new fields without migrations
- **Performance**: Better for read-heavy operations
- **Document Structure**: Natural fit for menu items with nested data
- **Scalability**: Horizontal scaling for growing menu items
- **Development Speed**: Faster iteration during development

### PostgreSQL for Orders
- **Data Integrity**: Strong consistency and ACID compliance
- **Relationships**: Better for handling order relationships
- **Transactions**: Support for complex order operations
- **Query Performance**: Efficient for order history and filtering
- **Data Validation**: Built-in constraints and validations
- **Reporting**: Better support for complex queries and analytics

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- MongoDB
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/Angad-2002/DigitalDiner.git
cd DigitalDiner/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
POSTGRES_URI=your_postgres_uri
JWT_SECRET=your_jwt_secret
```

4. Set up databases:
```bash
# For MongoDB
mongosh
use digital_diner

# For PostgreSQL
psql
CREATE DATABASE digital_diner;
```

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/users/signup` - User registration
- `POST /api/auth/logout` - User logout

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu/:id` - Get menu item by ID
- `POST /api/menu` - Create menu item (admin only)
- `PUT /api/menu/:id` - Update menu item (admin only)
- `DELETE /api/menu/:id` - Delete menu item (admin only)
- `GET /api/menu/categories` - Get all menu categories

### Orders
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/phone/:phoneNumber` - Get orders by phone number
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status (admin only)
- `POST /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/:id` - Get order details

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard data
- `GET /api/admin/orders` - Get all orders with details
- `GET /api/admin/menu-items` - Get all menu items with details
- `GET /api/admin/stats` - Get restaurant statistics

## Assumptions and Challenges

### Assumptions
1. Users will provide valid phone numbers for order tracking
2. Menu items will have consistent attributes
3. Order statuses follow a predefined workflow
4. Admin users will manage menu items responsibly
5. Users have stable internet connection
6. Mobile numbers are unique per user
7. Menu items are available unless explicitly marked as unavailable

### Challenges Faced
1. **Database Integration**: Managing two different databases (MongoDB and PostgreSQL)
2. **State Management**: Handling complex order states in Redux
3. **Authentication**: Implementing secure JWT-based authentication
4. **CORS Configuration**: Setting up proper CORS for frontend-backend communication
5. **Deployment**: Configuring environment variables for different environments
6. **Real-time Updates**: Implementing order status updates
7. **Error Handling**: Managing errors across different services
8. **Data Migration**: Moving from MongoDB to PostgreSQL for orders

## AI Tools Usage
This project utilized AI tools for:
- Code suggestions and optimizations
- Debugging assistance
- Documentation generation
- Code review and improvements

All code has been thoroughly reviewed and understood before implementation.

## License
MIT License - feel free to use this project as a template for your own restaurant management system.

## Contact
For any questions or suggestions, please open an issue in the repository. 