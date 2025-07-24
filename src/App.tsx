import { Routes, Route, useNavigate } from "react-router-dom";
import LogIn from "./pages/login";
import MainPage from "./pages/mainPage";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/main");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
