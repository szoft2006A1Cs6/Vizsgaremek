import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import PizzaMenu from './pages/PizzaMenu';
import Customize from './pages/Customize';
import Payment from './pages/Payment';
import Status from './pages/Status';
import Rating from './pages/Rating';
import BurgerMenu from './pages/BurgerMenu';
import ItalMenu from './pages/ItalMenu'
import DesszertMenu from './pages/DesszertMenu'
import SalataMenu from './pages/SalataMenu';
import LevesMenu from './pages/LevesMenu';
import TesztaMenu from './pages/TesztaMenu';
import GrillMenu from './pages/GrillMenu';
import HalMenu from './pages/HalMenu';
import VeganMenu from './pages/VeganMenu';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/pizza" element={<PizzaMenu />} />
        <Route path='/burger' element={<BurgerMenu/>} />
        <Route path='/ital' element={<ItalMenu/>} />
        <Route path='/desszert' element={<DesszertMenu/>} />
        <Route path='/salata' element={<SalataMenu/>} />
        <Route path='/leves' element={<LevesMenu/>} />
        <Route path='/teszta' element={<TesztaMenu/>} />
        <Route path='/grill' element={<GrillMenu/>} />
        <Route path='/hal' element={<HalMenu/>} />
        <Route path='/vegan' element={<VeganMenu/>} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/status" element={<Status />} />
        <Route path="/rating" element={<Rating />} />
      </Routes>
    </Router>
  );
}

export default App;