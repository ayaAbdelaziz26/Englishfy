// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
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
import PlaylistVideos from './Pages/PlaylistVideos/PlaylistVideos';
import ForgetPass from './Components/ForgetPass/ForgetPass';
import ResetPass from './Pages/ResetPass/ResetPass';
import Footer from './Components/Footer/Footer';
import UserProvider from './Context/UserProvider';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useState } from 'react';
import './i18n'

function AppContent({ forgetPass, setForgetPass }) {
  const location = useLocation();
  const hideNavbarRoutes = ['/topics', '/videos', '/addlinks', '/changepass'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname.toLowerCase());

  return (
    <div className="App">
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<TopicsHome />} />
          <Route path="/topics/:topicId/playlists/:playlistId" element={<VideoHome />} />
          <Route path="/topics/:topicId/video/:itemId" element={<VideoHome />} />
          <Route path="/topics/:topicId/playlists/:playlistId/videos" element={<PlaylistVideos />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="englisharticle" element={<EnglishArticle />} />
          <Route path="features" element={<Features />} />
          <Route path="benefits" element={<Benefits />} />
          <Route path="basics" element={<Basics />} />
          <Route path="listen" element={<Listen />} />
          <Route path="tips" element={<Tips />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="footer" element={<Footer />} />
        </Route>

        <Route path="/login" element={<Login forgetPass={forgetPass} setForgetPass={setForgetPass} />} />
        <Route path="/forgetpass" element={<ForgetPass />} />
        <Route path="/resetpass" element={<ResetPass />} />

        {/* 👇 Protected Routes */}
        <Route
          path="/topics"
          element={
            <ProtectedRoute>
              <Topics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos"
          element={
            <ProtectedRoute>
              <Videos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addlinks"
          element={
            <ProtectedRoute>
              <AddLinks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/changepass"
          element={
            <ProtectedRoute>
              <ChangePass />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  const [forgetPass, setForgetPass] = useState(false);

  return (
    <UserProvider>
      {forgetPass ? <ForgetPass setForgetPass={setForgetPass} /> : null}
      <Router>
        <AppContent forgetPass={forgetPass} setForgetPass={setForgetPass} />
      </Router>
    </UserProvider>
  );
}

export default App;