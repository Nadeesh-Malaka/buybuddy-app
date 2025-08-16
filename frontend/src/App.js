// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import CartPage from './Pages/Cart/CartPage';
import CheckoutPage from './Pages/Checkout/CheckoutPage';
import OrderConfirmationPage from './Pages/OrderConfirmation/OrderConfirmationPage';
import ProductDetailPage from './Pages/ProductDetail/ProductDetailPage';
import CategoriesPage from './Pages/Categories/CategoriesPage';
import DealsPage from './Pages/Deals/DealsPage';
import SearchResults from './Pages/SearchResults/SearchResults'; // Import SearchResults
import LoginPage from './Pages/Login/LoginPage';
import SignUpPage from './Pages/SignUp/SignUpPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import AddressesPage from './Pages/Addresses/AddressesPage'; // Import AddressesPage
import PaymentMethodsPage from './Pages/PaymentMethods/PaymentMethodsPage'; // Import PaymentMethodsPage
import OrderHistoryPage from './Pages/OrderHistory/OrderHistoryPage'; // Import OrderHistoryPage
import AdminPage from './Pages/Admin/AdminPage'; // Import AdminPage
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/deals" element={<DealsPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/addresses" element={<AddressesPage />} />
                <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                <Route path="/order-history" element={<OrderHistoryPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;