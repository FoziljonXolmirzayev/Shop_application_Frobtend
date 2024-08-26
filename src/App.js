import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";
import Products from "./pages/Products";

function App() {
  const token = useSelector((state) => state.user.token);
  console.log(token);

  if (!token) {
    return (
      <Routes>
        <Route Component={SignUp} path="/signup" />
        <Route Component={SignIn} path="/signin" />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route Component={Products} path="/" />
    </Routes>
  );
}

export default App;
