
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Forgot from './components/Forgot';
import Login  from './components/Login';
import Register from './components/Register';
import Games from './components/Games';
import Numbers from './components/Numbers';
import Alphabets from './components/Alphabets';
import NumberPuzzle from './components/NumberPuzzle';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
         <Route path='/' Component={Homepage}/>
         <Route path='/register' Component={Register}/>
         <Route path='/forgot' Component={Forgot}/>
         <Route path='/login' Component={Login}/>
         <Route path='/numbers' Component={Numbers}/>
         <Route path='/games' Component={Games}/>
         <Route path='/alphabets' Component={Alphabets}/>
         <Route path='/puzzle' Component={NumberPuzzle}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
