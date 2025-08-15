 
# BuyBuddy - E-commerce Platform

## Project Description
BuyBuddy is an innovative e-commerce web application designed to provide users with a seamless shopping experience. The platform allows users to browse a wide variety of products, manage their shopping carts, place orders, and track their purchase history. Built with a modern tech stack, BuyBuddy aims to offer an intuitive interface, robust backend functionality, and secure user authentication.

### Key Features
- **User Authentication**: Secure signup and login functionality with email and password management.
- **Product Browsing**: Explore products categorized into sections like Electronics and Accessories, with filtering and sorting options.
- **Shopping Cart**: Add, remove, and view items in a personalized cart.
- **Order Management**: Place orders, view order history, and manage shipping addresses and payment methods.
- **Responsive Design**: A mobile-friendly interface optimized for all devices.
- **Search Functionality**: Search for products by name directly from the navigation bar.

### Planned Enhancements
- Role-based access (e.g., Admin role for product management).
- Advanced search and filter options (e.g., price range, stock availability).
- Payment integration (e.g., Stripe, PayPal).
- Real-time order tracking and notifications.

## Technologies Used
### Frontend
- **React**: For building a dynamic and responsive user interface.
- **React Router**: For navigation between pages (e.g., Home, Categories, Cart).
- **Bootstrap**: For styling and layout consistency.
- **Context API**: For managing global state (e.g., cart items).
- **CSS**: Custom styling for a unique look and feel.

### Backend
- **Spring Boot**: For building a RESTful API and handling business logic.
- **Spring Data JPA**: For database operations with Hibernate ORM.
- **MySQL**: For persistent storage of user data, products, orders, etc.
- **Spring Security**: For securing endpoints with JWT (JSON Web Tokens).
- **Maven**: For dependency management and project build.

### Development Tools
- **IntelliJ IDEA**: For coding the Spring Boot backend.
- **Visual Studio Code** (or similar): For frontend development.
- **Git/GitHub**: For version control and collaboration.
- **Postman**: For testing API endpoints.

## Project Structure
- **Frontend**: Located in the `src` directory of the React project.
  - `Components/`: Reusable UI components (e.g., Navbar, ProductCard).
  - `Pages/`: Page-level components (e.g., Home, Profile).
  - `context/`: Context providers (e.g., CartContext).
  - `data/`: Mock data (e.g., mockProducts).
- **Backend**: Located in the `buybuddy-backend` Spring Boot project.
  - `entity/`: JPA entity classes (e.g., User, Product).
  - `repository/`: Spring Data JPA repositories.
  - `service/`: Business logic services.
  - `controller/`: REST API controllers.
  - `security/`: Authentication and JWT utilities.
  - `dto/`: Data transfer objects for API responses.

## Setup Instructions
### Prerequisites
- **Node.js** and **npm**: For the frontend (verify with `node -v` and `npm -v`).
- **Java JDK 17**: For the backend (verify with `java -version`).
- **MySQL Server**: Install and start MySQL (create a database named `buybuddy_db`).
- **IntelliJ IDEA**: For backend development.
- **Git**: For cloning the repository.

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/buybuddy.git
   cd buybuddy
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

### Backend Setup
1. Open IntelliJ IDEA and create a new Spring Boot project using Spring Initializr (as described earlier).
2. Configure `application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/buybuddy_db
   spring.datasource.username=root
   spring.datasource.password=your_password_here
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.hibernate.ddl-auto=create-drop
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   ```
3. Add the required dependencies in `pom.xml` (Spring Web, Spring Data JPA, MySQL Driver, Spring Security, Lombok, etc.).
4. Run the application:
   - Right-click `BuybuddyBackendApplication.java` and select `Run`.
5. Test APIs using Postman (e.g., `/api/auth/signup`, `/api/products`).

### Connecting Frontend to Backend
- Update your frontend to call backend APIs (e.g., `/api/products` for product data, `/api/auth/login` for authentication).
- Store the JWT token in local storage and include it in the `Authorization` header for authenticated requests.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it.

## Acknowledgments
- Thanks to the xAI team for assistance with the frontend development.
- Inspiration from e-commerce platforms like ShopMini and Amazon.

## Contact
For questions or collaboration, reach out to [your-email@example.com](mailto:nadeeshmalaka50@gmail.com).

---

