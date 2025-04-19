# The Digital Diner - Restaurant Ordering System

A full-stack web application for "The Digital Diner" that allows customers to browse the menu, place pickup orders, and view their order history.

## Database Design Choices

### MongoDB (Menu Items)
- Used for menu items due to their flexible schema nature
- Menu items can have varying attributes (ingredients, allergens, customization options)
- Better for handling unstructured data and nested documents
- Easier to modify menu item structure without schema migrations
- Efficient for read-heavy operations (menu browsing)

### PostgreSQL (Orders & Users)
- Used for order and user information due to their structured nature
- Strong referential integrity for order-user relationships
- Better for complex queries involving user order history
- ACID compliance ensures reliable order processing
- Better for handling relationships between orders and user data

## API Endpoints

### Menu Endpoints
- `GET /api/menu` - Get all menu items
- `GET /api/menu/categories` - Get menu items by categories
- `GET /api/menu/:id` - Get specific menu item details
- `POST /api/menu` (Admin) - Add new menu item
- `PUT /api/menu/:id` (Admin) - Update menu item
- `DELETE /api/menu/:id` (Admin) - Delete menu item

### Order Endpoints
- `POST /api/orders` - Place a new order
- `GET /api/orders/phone/:phoneNumber` - Get order history by phone number
- `GET /api/orders/:id` - Get specific order details

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- PostgreSQL
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   POSTGRES_URI=your_postgres_uri
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Deployment

### Frontend (Netlify)
1. Push your frontend code to a GitHub repository
2. Go to [Netlify](https://www.netlify.com/) and sign up/login
3. Click "New site from Git"
4. Select your GitHub repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Add environment variables:
   - `REACT_APP_API_URL`: Your Render backend URL
   - `REACT_APP_STRIPE_PUBLIC_KEY`: Your Stripe public key
7. Click "Deploy site"

### Backend (Render)
1. Push your backend code to a GitHub repository
2. Go to [Render](https://render.com/) and sign up/login
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - Name: Choose a name for your service
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `FRONTEND_URL`: Your Netlify frontend URL
   - `PORT`: 10000 (or your preferred port)
7. Click "Create Web Service"

### Local Development
To run the application locally:

1. Start the backend:
```bash
cd backend
npm install
npm start
```

2. Start the frontend:
```bash
cd frontend
npm install
npm start
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Technologies Used
- Frontend: React, React Router, Context API for state management
- Backend: Node.js, Express
- Databases: MongoDB, PostgreSQL
- Deployment: Netlify (frontend)

## Features
- Browse menu items by category
- Add items to cart
- Modify cart contents
- Place orders with contact information
- View order history using phone number
- Responsive design for mobile and desktop

## Challenges Faced
1. Integration of dual databases (MongoDB and PostgreSQL)
2. State management for shopping cart
3. CORS configuration for deployment
4. Error handling across the full stack

## Future Improvements
1. User authentication system
2. Real-time order status updates
3. Admin dashboard for menu management
4. Payment processing integration
5. Order customization options

# The Digital Diner - Database Design

## Hybrid Database Architecture

This application uses both MongoDB and PostgreSQL databases, each optimized for specific types of data and operations.

### MongoDB Collections

1. **MenuItems**
   - Stores menu items with flexible schema
   - Contains nested data (ingredients, allergens)
   - Optimized for read-heavy operations
   - Schema can evolve easily as menu changes
   - Indexes on category, text search, and availability

2. **Carts**
   - Temporary storage for user shopping carts
   - Document-based structure for easy updates
   - TTL index for automatic cleanup
   - References PostgreSQL user IDs

### PostgreSQL Tables

1. **Users**
   - Structured user profiles
   - Authentication data
   - Role-based access control
   - Unique constraints on email and phone

2. **Orders**
   - Relational order data
   - Strong consistency requirements
   - References to users and payments
   - Status tracking and history

3. **OrderItems**
   - Line items for orders
   - References to MongoDB menu items
   - Price and quantity tracking
   - Special instructions

4. **Payments**
   - Transactional payment data
   - ACID compliance required
   - Payment status tracking
   - Secure payment details storage

## Design Justification

### MongoDB Usage
- **Menu Items**: Flexible schema allows for varying item details and easy updates
- **Carts**: Document-based structure suits temporary, session-based data
- **Benefits**:
  - Schema flexibility
  - Easy scaling for read-heavy operations
  - Natural handling of nested data
  - Fast writes for cart operations

### PostgreSQL Usage
- **Users & Orders**: Strong relationships and consistency requirements
- **Payments**: Transactional integrity and ACID compliance
- **Benefits**:
  - Relational integrity
  - Complex query support
  - Transaction support
  - Data consistency

## Data Flow
1. Users authenticate through PostgreSQL
2. Menu items are served from MongoDB
3. Cart operations use MongoDB for temporary storage
4. Order placement moves data to PostgreSQL
5. Payment processing uses PostgreSQL for transaction safety

## Indexing Strategy
- MongoDB: Text search, category, and availability indexes
- PostgreSQL: Foreign keys, status, and timestamp indexes

## Security Considerations
- Sensitive data (passwords, payment info) stored in PostgreSQL
- MongoDB used for public-facing data
- Proper indexing for performance
- Data validation at both database levels 