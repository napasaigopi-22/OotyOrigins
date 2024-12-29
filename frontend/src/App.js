import './App.css';
import Homepage from './components/Homepage/HomePage';
import Category from './components/Category';
import Developers from './components/Developers';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import Products from './components/Products';
import Userprofile from './components/User/UserProfile';
import CartPage from './components/CartPage/CartPage';
import OrdersPage from './components/Orderspage/OrdersPage';
import Footer from './Assets/Footer';
import Addproduct from './components/Admin/Addproduct';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductDetail from './components/ProductDetails/ProductDetail';
import EditProfile from './components/User/EditProfile';



function App() {
    const location = useLocation();
    
    return (
        <div className="App">
            <>

                {/* This is the alias of BrowserRouter i.e. Router */}
               
                    <Routes>
                        {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}

                    
                        <Route
                            path="/home"
                            element={<Homepage />}
                        />

                        <Route 
                            path="/Developers"
                            element={<Developers />}
                        />    

                        {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
                        <Route
                            path="/Category"
                            element={<Category />}
                        />

                        {/* This route is for contactus component
          with exact path "/contactus", in 
          component props we passes the imported component*/}
                        <Route
                            path="/products"
                            element={<Products />}
                        />
                        
                        <Route
                            path="/ProductDetail"
                            element={<ProductDetail />}
                        />
                        <Route
                            path="/UserProfile"
                            element={<Userprofile />}
                        />

                        <Route 
                            path="/editprofile"
                            element={<EditProfile />}
                        />

                        <Route
                            path="*"
                            element={<Navigate to="/" />}
                        />
                        <Route
                            path="/Cart"
                            element={<CartPage />}
                        />
                        <Route
                            path="/Orders"
                            element={<OrdersPage />}
                        />
                        <Route
                            path="/AddProduct"
                            element={<Addproduct />}
                        />

                        <Route
                            path="/AdminDashboard"
                            element={<AdminDashboard />}
                        />

                    </Routes>
                   
              
                {location.pathname !== "/" && <Footer />}
            </>
        </div>
    );
}

export default App;
