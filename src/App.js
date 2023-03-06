import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Roles from './components/Roles';
import Image from './components/Image';
import Others from './components/Others';
import ImageSlides from './ImageSlides';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/tvdash" exact element={<Dashboard/>}></Route>
      <Route path="tvdash/Image" exact element={<Image/>}></Route>
      <Route path="tvdash/Roles" exact element={<Roles/>}></Route>
      <Route path="tvdash/Others" exact element={<Others/>}></Route>
      <Route path="tvdash/ImageSlides" exact element={<ImageSlides/>}></Route>
      
     
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
