import ListProduct from './components/ListProduct';
import CreateProduct from './components/CreateProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AdminListProduct from './components/AdminListProduct';
import EditProduct from './components/EditProduct';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Header from './components/Header';
import Profile from './components/Profile';
import './index.css'
import AdminListUser from './components/AdminListUser';
import CreateUser from './components/CreateUser';
import AdminListOrder from './components/AdminListOrder';
import AdminStatistic from './components/AdminStatistic';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListProduct />} />
        <Route path='/home' element={<ListProduct />} />
        <Route path='/:productId' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/Profile' element={<Profile />} />

        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        
        <Route path="/admin" element={<AdminListProduct />} />
        <Route path="/productmanagement" element={<AdminListProduct />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/adminusers" element={<AdminListUser />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/adminorders" element={<AdminListOrder />} />
        <Route path="/statistics" element={<AdminStatistic />} />
        <Route path="/chi-tiet-san-pham/:ProductId" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
