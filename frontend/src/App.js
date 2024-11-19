import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Registration';
import Home from './Pages/Home';
import AdminPage from './Components/AdminPage'; // Your Admin Page Component
import Cart from './Components/Cart';
import Shop from './Pages/Shop'; // Your Shop Page Component
import AddVegetable from './Pages/AddVegetableForm';
import UpdateVegetable from './Pages/UpdateVegetable';
import BillDetails from './Components/BillDetails';
import Buy from './Components/Buy';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPage />} /> 
                <Route path="/shop" element={<Shop />} />
                <Route path="/add-vegetable" element={<AddVegetable />} />
                <Route path="/update-vegetable" element={<UpdateVegetable />} />
                <Route path="/cart" element={<Cart />} />
                <Route path='/billdetails' element={<BillDetails />} /> 
                <Route path='/buy' element={<Buy />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
}

export default App;
