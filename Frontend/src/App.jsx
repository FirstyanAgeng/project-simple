import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminComponent from "./components/AdminComponent";
import LandingComponent from "./components/LandingComponent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingComponent />} />
        <Route path="/admin" element={<AdminComponent />} />
      </Routes>
    </>
  );
}

export default App;
