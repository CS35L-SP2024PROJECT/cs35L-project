
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import {Categories} from './Pages/Categories';
import {About} from './Pages/About';
import {Product} from './Pages/Product';
import {ShopCart} from './Pages/ShopCart';
import {LoginSignup} from './Pages/LoginSignup';
import { PageBottom } from './Components/PageBottom/PageBottom';
import vege_banner from './Components/Assets/vege_banner.jpg';
import meats_banner from './Components/Assets/meats_banner.jpg';
import dairy_banner from './Components/Assets/dairy_banner.jpg';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Meats' element={<Categories banner={meats_banner} category="Meats"/>}/>
        <Route path='/Vegetables' element={<Categories banner={vege_banner} category="Vegetables"/>}/>
        <Route path='/Dairy & Egg' element={<Categories banner={dairy_banner} category="Dairy & Egg"/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<ShopCart/>}/>
        <Route path='/loginsignup' element={<LoginSignup/>}/>
      </Routes>
      <PageBottom/>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
