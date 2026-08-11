import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import HotelPage from "./pages/HotelPage";
import RoomDetails from "./pages/RoomDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/rooms"
          element={<HotelPage />}
        />

        <Route
          path="/rooms/:id"
          element={<RoomDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;