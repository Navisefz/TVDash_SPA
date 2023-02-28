import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Roles from './components/Roles';
import Image from './components/Image';
import Others from './components/Others';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Dashboard/>}></Route>
      <Route path="/Image" exact element={<Image/>}></Route>
      <Route path="/Roles" exact element={<Roles/>}></Route>
      <Route path="/Others" exact element={<Others/>}></Route>
     
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
