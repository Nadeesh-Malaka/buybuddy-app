# 🛍️ BuyBuddy - E-Commerce Platform

> A modern, full-stack e-commerce web application with a React frontend and Spring Boot backend, designed for seamless shopping experiences.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Nadeesh-Malaka/buybuddy-app?style=social)](https://github.com/Nadeesh-Malaka/buybuddy-app)
[![GitHub Forks](https://img.shields.io/github/forks/Nadeesh-Malaka/buybuddy-app?style=social)](https://github.com/Nadeesh-Malaka/buybuddy-app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

## 🎯 Overview

**BuyBuddy** is an innovative e-commerce platform designed to provide users with a seamless shopping experience. The application combines modern frontend technologies with a robust backend to deliver a complete shopping solution featuring user authentication, product management, cart functionality, and order processing.

### Project Goals
- ✅ Provide an intuitive, responsive shopping interface
- ✅ Ensure secure user authentication and data protection
- ✅ Enable efficient product discovery and cart management
- ✅ Support complete order lifecycle management
- ✅ Maintain scalable and maintainable codebase

---

## ⭐ Key Features

### User Management
- 🔐 **Secure Authentication**: Email/password signup and login with JWT tokens
- 👤 **User Profiles**: Manage personal information, addresses, and payment methods
- 🔔 **Account Settings**: Update preferences and security settings
- 📋 **Order History**: Track all past purchases and order status

### Product Management
- 🏷️ **Product Catalog**: Browse thousands of products with detailed descriptions
- 🔍 **Advanced Search**: Full-text search functionality for quick product discovery
- 📂 **Categories & Filtering**: Organize products by category, price range, and ratings
- ⭐ **Ratings & Reviews**: User reviews and product ratings
- 📸 **Product Images**: High-quality product images and galleries

### Shopping Cart & Checkout
- 🛒 **Shopping Cart**: Add, remove, and manage items with quantity controls
- 💰 **Price Calculation**: Real-time price updates with tax and shipping calculation
- 🎟️ **Discounts & Coupons**: Apply promotional codes and discount codes
- 📦 **Shipping Options**: Multiple shipping methods and delivery tracking
- 💳 **Payment Integration**: Support for multiple payment gateways (Stripe, PayPal ready)

### Order Management
- 📝 **Order Placement**: Seamless checkout process with order confirmation
- 📊 **Order Tracking**: Real-time order status updates and notifications
- 🔄 **Returns & Refunds**: Manage returns and process refunds
- 📧 **Email Notifications**: Order confirmations and status updates

### Admin Features
- 🛠️ **Product Management**: Add, update, and delete products
- 📈 **Sales Analytics**: View sales reports and performance metrics
- 👥 **User Management**: Manage user accounts and permissions
- 📋 **Order Management**: Process and manage customer orders

### Responsive Design
- 📱 **Mobile-Friendly**: Optimized for all device sizes
- ⚡ **Fast Performance**: Optimized loading times and smooth interactions
- ♿ **Accessibility**: WCAG compliant design

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18+** | Dynamic and responsive user interface |
| **React Router v6** | Client-side routing and navigation |
| **Bootstrap 5** | Responsive UI framework and styling |
| **Context API** | Global state management |
| **Axios** | HTTP client for API communication |
| **CSS3** | Custom styling and animations |
| **React Icons** | Icon library for UI elements |
| **React Toastify** | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| **Java 17+** | Programming language |
| **Spring Boot 3.x** | Framework for REST API and business logic |
| **Spring Data JPA** | Database abstraction and ORM |
| **Hibernate** | Object-relational mapping |
| **MySQL 8** | Relational database management |
| **Spring Security** | Authentication and authorization |
| **JWT (JSON Web Tokens)** | Stateless authentication |
| **Maven** | Dependency management and build tool |
| **Lombok** | Reduce boilerplate code |
| **Validation** | Bean validation and custom validators |
| **Spring Boot Actuator** | Application monitoring and health checks |

### Development Tools
| Tool | Purpose |
|---|---|
| **Git & GitHub** | Version control and collaboration |
| **IntelliJ IDEA** | Backend IDE |
| **VS Code** | Frontend IDE |
| **Postman** | API testing and documentation |
| **MySQL Workbench** | Database management |
| **Docker** | Containerization (optional) |

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   React Frontend (3000)                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Pages | Components | Context | Utilities        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓ (Axios/HTTP)
┌─────────────────────────────────────────────────────────┐
│           Spring Boot REST API (8080)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Controllers | Services | Repositories          │  │
│  │  Security | DTOs | Exception Handling           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          ↓ (JDBC)
┌─────────────────────────────────────────────────────────┐
│              MySQL Database (3306)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Users | Products | Orders | Carts | Reviews    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
buybuddy-app/
│
├── frontend/                           # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   ├── CartContext.js
│   │   │   ├── AuthContext.js
│   │   │   └── ProductContext.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   └── orderService.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── index.css
│   │   │   └── components.css
│   │   ├── utils/
│   │   │   ├── validators.js
│   │   │   ├── formatters.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example
│   └── README.md
│
├── backend/                            # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/buybuddy/
│   │   │   │   ├── BuybuddyApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   ├── CorsConfig.java
│   │   │   │   │   └── JpaConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── ProductController.java
│   │   │   │   │   ├── CartController.java
│   │   │   │   │   ├── OrderController.java
│   │   │   │   │   ├── UserController.java
│   │   │   │   │   └── AdminController.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── UserService.java
│   │   │   │   │   ├── ProductService.java
│   │   │   │   │   ├── CartService.java
│   │   │   │   │   ├── OrderService.java
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   └── EmailService.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── UserRepository.java
│   │   │   │   │   ├── ProductRepository.java
│   │   │   │   │   ├── CartRepository.java
│   │   │   │   │   ├── OrderRepository.java
│   │   │   │   │   └── ReviewRepository.java
│   │   │   │   ├── entity/
│   │   │   │   │   ├── User.java
│   │   │   │   │   ├── Product.java
│   │   │   │   │   ├── Cart.java
│   │   │   │   │   ├── Order.java
│   │   │   │   │   ├── OrderItem.java
│   │   │   │   │   ├── Review.java
│   │   │   │   │   ├── Category.java
│   │   │   │   │   └── Address.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── UserDTO.java
│   │   │   │   │   ├── ProductDTO.java
│   │   │   │   │   ├── CartDTO.java
│   │   │   │   │   ├── OrderDTO.java
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── SignupRequest.java
│   │   │   │   │   └── JwtResponse.java
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   └── CustomUserDetailsService.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   │   └── BadRequestException.java
│   │   │   │   └── util/
│   │   │   │       ├── ValidationUtil.java
│   │   │   │       └── Constants.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       ├── application-prod.properties
│   │   │       └── logback-spring.xml
│   │   └── test/
│   │       ├── java/com/buybuddy/
│   │       │   ├── controller/
│   │       │   ├── service/
│   │       │   └── repository/
│   │       └── resources/
│   ├── pom.xml
│   ├── .env.example
│   └── README.md
│
├── docker-compose.yml                  # Docker Compose (Optional)
├── .gitignore
├── LICENSE
└── README.md                           # This file
```

---

## 📋 Prerequisites

### System Requirements
- **OS**: Windows, macOS, or Linux
- **RAM**: 8GB minimum (16GB recommended)
- **Disk Space**: 10GB available

### Required Software

#### Frontend Requirements
```bash
# Node.js (LTS version 18+)
node --version  # v18.0.0 or higher
npm --version   # 9.0.0 or higher

# Or use Yarn
yarn --version  # 3.0.0 or higher
```

#### Backend Requirements
```bash
# Java Development Kit 17+
java -version   # openjdk version "17" or higher

# Maven 3.8+
mvn --version   # Apache Maven 3.8.0 or higher
```

#### Database Requirements
```bash
# MySQL Server 8.0+
mysql --version # mysql Ver 8.0.0 or higher
```

### Accounts & Services (Optional)
- GitHub account for version control
- Postman account for API testing
- Stripe/PayPal account for payment integration (future)

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Nadeesh-Malaka/buybuddy-app.git
cd buybuddy-app
```

### Step 2: Setup Frontend

```bash
cd frontend

# Install dependencies
npm install
# or
yarn install

# Create environment file
cp .env.example .env

# Update .env with your configuration
# REACT_APP_API_URL=http://localhost:8080/api

# Start development server
npm start
# or
yarn start
```

The frontend will open at `http://localhost:3000`

### Step 3: Setup Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE buybuddy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create user (optional but recommended)
CREATE USER 'buybuddy'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON buybuddy_db.* TO 'buybuddy'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

### Step 4: Setup Backend

```bash
cd backend

# Create environment file
cp .env.example .env

# Update configuration
# Edit src/main/resources/application.properties or application-dev.properties
```

#### Configure `application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/buybuddy_db
spring.datasource.username=root
spring.datasource.password=your_password_here
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=INFO
logging.level.com.buybuddy=DEBUG

# JWT Configuration
app.jwtSecret=your_jwt_secret_key_here
app.jwtExpirationInMs=86400000

# CORS Configuration
app.cors.allowedOrigins=http://localhost:3000

# Email Configuration (for notifications)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

#### Build and Run:

```bash
# Install dependencies and build
mvn clean install

# Run the application
mvn spring-boot:run

# Or run directly from IDE
# Right-click on BuybuddyApplication.java → Run
```

The backend will run on `http://localhost:8080/api`

---

## ⚙️ Configuration

### Frontend Environment Variables

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_APP_NAME=BuyBuddy
REACT_APP_API_TIMEOUT=5000
REACT_APP_ENVIRONMENT=development
```

### Backend Environment Variables

Create `backend/.env`:

```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/buybuddy_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
APP_JWT_SECRET=your_jwt_secret_key_minimum_32_characters_long
APP_JWT_EXPIRATION_MS=86400000
APP_CORS_ALLOWED_ORIGINS=http://localhost:3000
SPRING_MAIL_USERNAME=your_email@gmail.com
SPRING_MAIL_PASSWORD=your_app_specific_password
```

### Security Best Practices

- ✅ Use strong JWT secrets (minimum 32 characters)
- ✅ Never commit `.env` files to version control
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Implement rate limiting
- ✅ Validate all user inputs
- ✅ Use environment-specific configurations

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "phone": "+1234567890"
}

Response: 201 Created
{
  "id": 1,
  "email": "john@example.com",
  "message": "User registered successfully"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "email": "john@example.com",
  "roles": ["ROLE_USER"]
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=0&size=20&sort=id,desc

Response: 200 OK
{
  "content": [
    {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics",
      "image": "url",
      "rating": 4.5
    }
  ],
  "totalElements": 100,
  "totalPages": 5
}
```

#### Get Product by ID
```http
GET /api/products/{id}

Response: 200 OK
{
  "id": 1,
  "name": "Laptop",
  "price": 999.99,
  "description": "High-performance laptop",
  "category": "Electronics",
  "stock": 50,
  "image": "url",
  "rating": 4.5,
  "reviews": []
}
```

#### Create Product (Admin)
```http
POST /api/admin/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Laptop",
  "price": 1299.99,
  "description": "Latest model",
  "category": "Electronics",
  "stock": 25,
  "image": "url"
}

Response: 201 Created
```

### Cart Endpoints

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}

Response: 201 Created
```

#### Get Cart
```http
GET /api/cart
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "productName": "Laptop",
      "price": 999.99,
      "quantity": 2,
      "total": 1999.98
    }
  ],
  "totalPrice": 1999.98
}
```

### Order Endpoints

#### Place Order
```http
POST /api/orders/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "shippingAddress": "123 Main St",
  "paymentMethod": "CREDIT_CARD",
  "shippingMethod": "EXPRESS"
}

Response: 201 Created
{
  "orderId": 101,
  "orderDate": "2024-01-15",
  "status": "PENDING",
  "totalAmount": 1999.98
}
```

#### Get Order History
```http
GET /api/orders
Authorization: Bearer {token}

Response: 200 OK
{
  "orders": [
    {
      "orderId": 101,
      "orderDate": "2024-01-15",
      "status": "DELIVERED",
      "totalAmount": 1999.98,
      "items": []
    }
  ]
}
```

### Full API Documentation
See [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for complete endpoint details.

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```sql
-- Users Table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(20),
  role ENUM('USER', 'ADMIN') DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  category_id INT,
  image_url VARCHAR(255),
  rating DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Categories Table
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Table
CREATE TABLE carts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Cart Items Table
CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT DEFAULT 1,
  FOREIGN KEY (cart_id) REFERENCES carts(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Orders Table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED') DEFAULT 'PENDING',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Reviews Table
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 📖 Usage Guide

### For Users

#### 1. Sign Up & Registration
- Navigate to the signup page
- Enter your details (First Name, Last Name, Email, Password)
- Click "Sign Up"
- Verify your email (if enabled)
- Login with your credentials

#### 2. Browse Products
- Go to the Products page
- Use filters and search to find products
- Click on a product to view details
- Read reviews and check ratings

#### 3. Shopping Cart
- Click "Add to Cart" on a product
- Update quantities in the cart
- Remove items as needed
- Review cart total

#### 4. Checkout
- Click "Proceed to Checkout"
- Enter shipping address
- Select shipping method
- Choose payment method
- Place order

#### 5. Track Orders
- Go to "My Orders"
- View order details and status
- Track shipment
- Download invoice

### For Developers

#### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
mvn test
```

#### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
mvn clean package -DskipTests
```

---

## 🔧 Development Workflow

### Git Workflow

```bash
# Clone repository
git clone https://github.com/Nadeesh-Malaka/buybuddy-app.git

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
git add .
git commit -m "feat: add your feature description"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Code Style Guidelines

#### Java (Backend)
- Follow Google Java Style Guide
- Use meaningful variable names
- Write javadoc for public methods
- Keep methods focused and small

#### JavaScript/React (Frontend)
- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Use meaningful component names
- Write JSDoc for complex functions

### Branching Strategy

```
main (production-ready)
  ├── develop (integration branch)
  │   ├── feature/user-auth
  │   ├── feature/product-catalog
  │   ├── bugfix/cart-issue
  │   └── hotfix/security-patch
```

---

## ✅ Testing

### Backend Testing

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn test jacoco:report
```

### Frontend Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

### Manual Testing with Postman

1. Import `postman-collection.json` into Postman
2. Configure environment variables
3. Run test collections
4. Verify responses

---

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

**Vercel:**
```bash
npm i -g vercel
vercel login
vercel
```

**Netlify:**
```bash
npm run build
# Drag and drop 'build' folder to Netlify
```

### Backend Deployment (Heroku/AWS)

**Heroku:**
```bash
# Install Heroku CLI
heroku login
heroku create buybuddy-app
git push heroku main
```

**Docker Deployment:**
```bash
docker build -t buybuddy-backend:latest .

docker run -p 8080:8080 --env-file .env buybuddy-backend:latest
```

---

## 🚧 Future Enhancements

### Phase 2 (Q2 2024)
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Advanced search with Elasticsearch
- [ ] Product recommendation engine
- [ ] Real-time notifications (WebSocket)
- [ ] Email notifications for orders
- [ ] Admin dashboard with analytics

### Phase 3 (Q3 2024)
- [ ] Mobile app (React Native)
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Inventory management
- [ ] Seller dashboard
- [ ] Multi-language support

### Phase 4 (Q4 2024)
- [ ] AI-powered chatbot
- [ ] Social media integration
- [ ] Subscription service
- [ ] Loyalty program
- [ ] Advanced analytics

---

## 🐛 Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**CORS errors:**
- Ensure backend CORS configuration matches frontend URL
- Check `application.properties` for correct `app.cors.allowedOrigins`

### Backend Issues

**Port 8080 already in use:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

**Database connection failed:**
```bash
# Verify MySQL is running
mysql -u root -p

# Check database exists
SHOW DATABASES;

# Check application.properties credentials
```

**Build fails:**
```bash
# Clean and rebuild
mvn clean install

# Update Maven
mvn -v

# Check Java version
java -version
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/buybuddy-app.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Provide clear description of changes
   - Link related issues
   - Include screenshots for UI changes

### Contribution Guidelines
- Follow existing code style
- Write descriptive commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:
- ✅ Free to use, modify, and distribute
- ✅ Must include original license notice
- ❌ No warranty or liability

---

## 🙏 Acknowledgments

- **xAI Team** - Assistance with frontend development
- **Spring Boot Community** - Excellent framework and support
- **React Community** - Amazing UI library and ecosystem
- **Inspiration**: ShopMini, Amazon, and modern e-commerce platforms
- **Contributors** - All who have contributed to this project

---

## 📞 Contact & Support

### Get in Touch
- **Email**: [nadeeshmalaka50@gmail.com](mailto:nadeeshmalaka50@gmail.com)
- **GitHub**: [@Nadeesh-Malaka](https://github.com/Nadeesh-Malaka)
- **LinkedIn**: [Your LinkedIn Profile]
- **Portfolio**: [Your Portfolio Website]

### Support Options
- 📧 Email support at nadeeshmalaka50@gmail.com
- 🐛 Report bugs via [GitHub Issues](https://github.com/Nadeesh-Malaka/buybuddy-app/issues)
- 💬 Discuss features in [Discussions](https://github.com/Nadeesh-Malaka/buybuddy-app/discussions)
- 📚 Check [Documentation](docs/) for help

### Reporting Issues
When reporting issues, please include:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- System information (OS, Java version, Node version, etc.)

---

## 📊 Project Statistics

- **Languages**: Java, JavaScript, HTML, CSS
- **LOC**: 10,000+ lines
- **Contributors**: 1+
- **Last Updated**: October 2024
- **License**: MIT

---

## 🎉 Thank You!

Thank you for using BuyBuddy! We hope you enjoy the seamless shopping experience. Happy shopping! 🛍️

**Star ⭐ this repository if you found it helpful!**

---

*Last Updated: October 10, 2024*
*Maintained by: Nadeesh Malaka*
