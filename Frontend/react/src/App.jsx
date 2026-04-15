import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import Menu from './pages/Menu/Menu';
import Payment from './pages/Payment/Payment';
import Status from './pages/Status/Status';
import Rating from './pages/Rating/Rating';
import Kitchen from './pages/Kitchen/Kitchen';
import Login from './pages/Login/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/status" element={<Status />} />
        <Route path="/rating" element={<Rating />} />
        <Route path='/kitchen' element={<Kitchen/>} />
      </Routes>
    </Router>
  );
}

export default App;