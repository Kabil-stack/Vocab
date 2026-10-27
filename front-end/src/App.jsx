import { BrowserRouter,  Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { Toaster } from 'react-hot-toast';
import Admin from './pages/Admin';
import {VocabProvider} from './pages/Contexts/VocabContext'

function App() {
    
    
  return (
    <div >
      
      <BrowserRouter> 
      <Toaster/>  
      <VocabProvider>

      
      <Routes>
        <Route path="/" element={<Home  />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
        <Route path='/admin' element={<Admin  />}/>
      </Routes>
      </VocabProvider>
      
      </BrowserRouter>
     
    </div>
  )
}

export default App
