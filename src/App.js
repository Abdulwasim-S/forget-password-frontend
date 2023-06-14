import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Routers/Login';
import { Route, Routes } from 'react-router-dom';
import Signup from './Routers/Signup';
import Forgetpassword from './Routers/forgetpassword';
import Resetpassword from './Routers/resetpassword';
import Loggedinpage from './Routers/Loggedinpage';
import Success from './Routers/Success';
import Checkmail from './Routers/Checkmail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgetpassword" element={<Forgetpassword/>}/>
        <Route path="/resetpassword" element={<Resetpassword/>}/>
        <Route path="/loggedin" element={<Loggedinpage/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/checkmail" element={<Checkmail/>}/>
      </Routes>
    </div>
  );
}

export default App;
