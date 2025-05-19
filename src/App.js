
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Login  from './components/Login';
import Register from './components/Register';
import Games from './components/Games';
import Numbers from './components/Numbers';
import Alphabets from './components/Alphabets';
import NumberPuzzle from './components/NumberPuzzle';
import ForgotPassword from './components/ForgotPassword';
import ParentalDashboard from './components/ParentalDashboard'
import ViewScores from './components/ViewScores';
import SetGoals from './components/SetGoals';
import ActivityLog from './components/ActivityLog';
import Messages from './components/Messages';
import PuzzlePage from './components/PuzzlePage';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
         <Route path='/' Component={Homepage}/>
         <Route path='/register' Component={Register}/>
         <Route path='/login' Component={Login}/>
         <Route path='/numbers' Component={Numbers}/>
         <Route path='/games' Component={Games}/>
         <Route path='/alphabets' Component={Alphabets}/>
         <Route path='/puzzle' Component={NumberPuzzle}/>
         <Route path='/forgot-password' Component={ForgotPassword}/>
         <Route path='/dashboard' Component={ParentalDashboard}/>
         <Route path='/view-scores' Component={ViewScores}/>
         <Route path='/set-goals' Component={SetGoals}/>
         <Route path='/activity-log' Component={ActivityLog}/>
         <Route path='/messages' Component={Messages}/>
         <Route path='/test' Component={PuzzlePage}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
