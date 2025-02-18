import React, { useState } from 'react'
import './forgetPass.css'
import { useEffect } from 'react'
import cancel from '../../assets/close.png'
import Success from '../Success/Success'

const ForgetPass = ({setForgetPass}) => {
    const [email, setEmail] = useState('');

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleForgetPass = async (e) => {
      e.preventDefault();
  
      const url = 'http://localhost:5000/api/v1/admin/auth/forgot-password';
      const forgetData = {email};
  
      try {
          const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(forgetData),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            setMessage('Sent successfully, check your email!')
            setSeverity('success')
          } else {
            setMessage('You are not authorized!')
            setSeverity('error')
          }
      } catch (error) {
          console.error('Error during request:', error);
      }finally{
        setOpenSnackbar(true)
      }
  };  

      
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    useEffect(() => {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
  
      return () => {
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
      };
    }, []);


  return (
    <div className='forget-pass'>
        <form className='forget-pass-popup'>
            <img src={cancel} alt="Close Icon" onClick={()=>{setForgetPass(false)}}/>
            <div className="forget-pass-input">
            <label htmlFor="">Email:</label>
            <input type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
            </div>
           <button onClick={handleForgetPass}>Send Email</button>
        </form>

        <Success message={message} color={severity} open={openSnackbar} setOpen={setOpenSnackbar} />
    </div>
  )
}
export default ForgetPass;