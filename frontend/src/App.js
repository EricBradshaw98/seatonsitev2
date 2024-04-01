import Navbar from "./components/Navbar";
import './App.css';
import "./styles/app.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./pages/login";
import useApplicationData from './hooks/useApplicationData';
import SignUp from "./pages/RegistrationPage";
import Users from "./pages/users";
import Listings from "./pages/listings";
import Photos from "./pages/photos";
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import the compiled CSS file


function App() {


  const { state, setEmail, setPassword, dispatch } = useApplicationData();

  return (
   <Router>
      <Navbar dispatch={dispatch}
        state={state} />
      <Routes>
        
      <Route path="/users" element={<Users state={state}/>} dispatch={dispatch} />
      <Route path="/listings" element={<Listings state={state} dispatch={dispatch}/>} />
      <Route path="/photos" element={<Photos state={state} dispatch={dispatch}/>} />

        <Route path="/sign-up" element={<SignUp state={state} />} />
        <Route
          path="/login"
          element={
            <LoginPage
              dispatch={dispatch}
              state={state}
              email={state.email}
              password={state.password}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          }
        />
        

        
      </Routes>
    </Router>
  );
}

export default App;
