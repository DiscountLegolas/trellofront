import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/index";
import SignIn from "./pages/login";
import { useSelector } from "react-redux";
import SignUp from "./pages/signup";
import BoardPage from "./pages/Board";
import { Navigate } from "react-router-dom";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
const RedirectToIndex = ({ b, children }) => {
  if (b) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const {user}=useSelector((state) => state.user)
  return (
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<RedirectToIndex b={user!=null}><SignIn /></RedirectToIndex>} />
          <Route path="/signup" element={<RedirectToIndex b={user!=null}><SignUp /></RedirectToIndex>} />
          <Route path="/Board/:id" element={<RedirectToIndex b={user==null}><BoardPage /></RedirectToIndex>} />
          <Route path="/Reset" element={<RedirectToIndex b={user!=null}><ChangePassword /></RedirectToIndex>} />
          <Route path="/Forgot" element={<RedirectToIndex b={user!=null}><ForgotPassword /></RedirectToIndex>} />
       </Routes>
  );
}

export default App;
