import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from './Page/Admin';
import Hometemple from './Page/Hometemple';
import Home from './Page/Hometemple/Home';
import DetailMovie from './Page/Hometemple/DetailMovie';
import BookingMovie from './Page/Hometemple/booking/index';
import Login from './Page/Hometemple/login/dangnhap';
import Register from './Page/Hometemple/login/dangky';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Hometemple />} >
          <Route path="" element={<Home />} />
          <Route path="detail/:maPhim" element={<DetailMovie />} />
          <Route path="booking/:maLichChieu" element={<BookingMovie />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

        </Route>

        <Route path="admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>

  )
}
export default App
