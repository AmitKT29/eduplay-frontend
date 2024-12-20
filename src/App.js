
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Forgot from './components/Forgot';
import Login  from './components/Login';
import Register from './components/Register';
import AnimationPage from './components/Animationpage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
         <Route path='/' Component={Homepage}/>
         <Route path='/register' Component={Register}/>
         <Route path='/forgot' Component={Forgot}/>
         <Route path='/login' Component={Login}/>
         <Route path='/animation' Component={AnimationPage}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
