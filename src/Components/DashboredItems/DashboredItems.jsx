// import React, { useState, useEffect } from "react";
// import './dashboredItems.css'
// import dashboredImg from "../../assets/dashbored.png";
// import topicsImg from "../../assets/exam.png";
// import videosImg from "../../assets/video-dashbored.png";
// import addLinksImg from "../../assets/add-link.png";
// import changePassImg from "../../assets/reset-pass.png";
// import logoutImg from "../../assets/logout.png";
// import { Link } from "react-router-dom";

// const DashboredItems = () => {
//     const [menuVisible, setMenuVisible] = useState(false);

//     const handleClickOutside = (e) => {
//       if (!e.target.closest(".dropdown-container")) {
//         setMenuVisible(false);
//       }
//     };
  
//     useEffect(() => {
//       document.addEventListener("click", handleClickOutside);
//       return () => document.removeEventListener("click", handleClickOutside);
//     }, []);

//   return (      
//       <div className="dropdown-container">
//         <img
//           src={dashboredImg}
//           alt="Dashboard"
//           onClick={() => setMenuVisible(!menuVisible)}
//           className="dropdown-toggle"
//         />
//         {menuVisible && (
//           <ul className="dropdown-menu visible">
//             <li>
//               <Link to='/topics'>
//                 <img src={topicsImg} alt="" />
//                 Topics
//               </Link>
//             </li>
//             <li>
//               <Link to='/videos'>
//                 <img src={videosImg} alt="" />
//                 Videos
//               </Link>
//             </li>
//             <li>
//               <Link to='/addlinks'>
//                 <img src={addLinksImg} alt="" />
//                 Add Links
//               </Link>
//             </li>
//             <li>
//               <Link to='/changepass'>
//                 <img src={changePassImg} alt="" />
//                 Change Password
//               </Link>
//             </li>
//             <li>
//               <Link to='/login'>
//                 <img src={logoutImg} alt="" />
//                 Logout
//               </Link>
//             </li>
//           </ul>
//         )}
//       </div>
//   )
// }

// export default DashboredItems

import React, { useState, useEffect } from "react";
import './dashboredItems.css'
import dashboredImg from "../../assets/dashbored.png";
import topicsImg from "../../assets/exam.png";
import videosImg from "../../assets/video-dashbored.png";
import addLinksImg from "../../assets/add-link.png";
import changePassImg from "../../assets/reset-pass.png";
import logoutImg from "../../assets/logout.png";
import { Link, useNavigate } from "react-router-dom";

const DashboredItems = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");  // 👈 مسح التوكن
    navigate("/login");                    // 👈 تحويل لصفحة تسجيل الدخول
  };

  return (
    <div className="dropdown-container">
      <img
        src={dashboredImg}
        alt="Dashboard"
        onClick={() => setMenuVisible(!menuVisible)}
        className="dropdown-toggle"
      />
      {menuVisible && (
        <ul className="dropdown-menu visible">
          <li>
            <Link to='/topics'>
              <img src={topicsImg} alt="" />
              Topics
            </Link>
          </li>
          <li>
            <Link to='/videos'>
              <img src={videosImg} alt="" />
              Videos
            </Link>
          </li>
          <li>
            <Link to='/addlinks'>
              <img src={addLinksImg} alt="" />
              Add Links
            </Link>
          </li>
          <li>
            <Link to='/changepass'>
              <img src={changePassImg} alt="" />
              Change Password
            </Link>
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <Link>
            <img src={logoutImg} alt="" />
            Logout
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DashboredItems;
