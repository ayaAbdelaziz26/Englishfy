import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from '../src/Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Topics from './Pages/Topics/Topics';
import Videos from './Pages/Videos/Videos';
import AddLinks from './Pages/AddLinks/AddLinks';
import ChangePass from './Pages/ChangePass/ChangePass';
import TopicsHome from './Pages/TopicsHome/TopicsHome';
import VideoHome from './Pages/VideoHome/VideoHome';
import AboutUs from './Pages/Aboutus/AboutUs';
import FAQ from './Pages/FAQ/FAQ';
import EnglishArticle from './Pages/EnglishArticle/EnglishArticle';
import Features from './Pages/Features/Features';
import Benefits from './Pages/Benefits/Benefits';
import Basics from './Pages/Basics/Basics';
import Listen from './Pages/Listen/Listen';
import ContactUs from './Pages/ContactUs/ContactUs';
import Terms from './Pages/Terms/Terms';
import Privacy from './Pages/Privacy/Privacy';
import Tips from './Pages/Tips/Tips';
import ForgetPass from './Components/ForgetPass/ForgetPass';
import ResetPass from './Pages/ResetPass/ResetPass';
import './i18n';
import { useState,useEffect } from 'react';
import Footer from './Components/Footer/Footer';

function App() {

  const [forgetPass,setForgetPass]=useState(false);

  return (
    <>
    {forgetPass?<ForgetPass setForgetPass={setForgetPass}/>:<></>}
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<TopicsHome />} />
          <Route path="/topics/:topicId/playlists/:playlistId" element={<VideoHome />} />
          <Route path="/topics/:topicId/video/:itemId" element={<VideoHome />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path='englisharticle' element={<EnglishArticle/>}/>
          <Route path='features' element={<Features/>}/>
          <Route path='benefits' element={<Benefits/>}/>
          <Route path='basics' element={<Basics/>}/>
          <Route path='listen' element={<Listen/>}/>
          <Route path='tips' element={<Tips/>}/>
          <Route path='contactus' element={<ContactUs/>}/>
          <Route path='terms' element={<Terms/>}/>
          <Route path='privacy' element={<Privacy/>}/>
          <Route path='footer' element={<Footer/>}/>

        </Route>
          <Route path="/login" element={<Login forgetPass={forgetPass} setForgetPass={setForgetPass}/>} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/addlinks" element={<AddLinks />} />
          <Route path="/changepass" element={<ChangePass />} />
          <Route path="/forgetpass" element={<ForgetPass />} />
          <Route path='/resetpass' element={<ResetPass/>}/>
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;