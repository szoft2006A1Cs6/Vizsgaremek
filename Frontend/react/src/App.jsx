import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import PizzaMenu from './pages/PizzaMenu';
import Customize from './pages/Customize';
import Payment from './pages/Payment';
import Status from './pages/Status';
import Rating from './pages/Rating';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/pizza" element={<PizzaMenu />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/status" element={<Status />} />
        <Route path="/rating" element={<Rating />} />
      </Routes>
    </Router>
  );
}

export default App;