import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes // react-router-dom v6부터 switch -> Routes 
} from "react-router-dom"


import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

export default function App() {
  const NewLandingPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element = {< NewLandingPage />} />
        <Route exact path="/login" element = {< NewLoginPage /> }/>
        <Route exact path="/register" element = {< NewRegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

