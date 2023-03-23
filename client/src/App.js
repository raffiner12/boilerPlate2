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

// export default function App() {
//   const NewLandingPage = Auth(LandingPage, null);
//   const NewLoginPage = Auth(LoginPage, false);
//   const NewRegisterPage = Auth(RegisterPage, false);

//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" element = {< NewLandingPage />} />
//         <Route exact path="/login" element = {< NewLoginPage /> }/>
//         <Route exact path="/register" element = {< NewRegisterPage />} />
//       </Routes>
//     </Router>
//   );
// }

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = '/' element={<LandingPage />} />
        <Route exact path = '/login' element={<LoginPage />} />
        <Route exact path = '/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;