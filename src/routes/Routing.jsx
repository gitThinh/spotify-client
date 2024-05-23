import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ForgotPass,
  HomePage,
  LoginPage,
  SigninPage,
  ResetPass,
} from "/src/constants/pages";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/repass" element={<ResetPass />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default Routing;
