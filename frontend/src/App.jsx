import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import useDeveloper from "./hooks/useDeveloper";
import Context from "./contexts/Context";

import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";
import Detail from "./views/Detail";
import Upload from "./views/Upload";

const App = () => {
  const globalState = useDeveloper();

  return (
    <Context.Provider value={globalState}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/producto/:id" element={<Detail />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
