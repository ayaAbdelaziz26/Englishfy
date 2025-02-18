import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './contactUs.css';

const ContactUs = () => {
  const { t } = useTranslation('contactUs');
  const[fullName,setFullName]=useState("")
  const[email,setEmail]=useState("")
  const[message,setMessage]=useState("")

  const sendMail = async (event) => {
    event.preventDefault();
  
    const request = { fullName, email, message };
  
    try {
      const response = await fetch('http://145.223.23.146:5000/api/v1/user/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        console.log('Message sent successfully:', responseData);
      } else if (response.status === 404) {
        console.log('Error 404: Missing data.');
      } else {
        console.log('Server Error:', responseData.message || 'An error occurred');
      }
    } catch (error) {
      console.log('Internal Server Error:', error.message);
    }
  };
  

  return (
    <div className="contact-us">
      <h1>{t('contactUs.title')}</h1>

      <form onSubmit={sendMail}>
        <div className="my-input">
          <label htmlFor="name">{t('contactUs.form.fullName')}</label>
          <input
            type="text"
            id="name"
            onChange={(e)=>{setFullName(e.target.value)}}
            value={fullName}
            required
            placeholder={t('contactUs.form.placeholders.name')}
          />
        </div>

        <div className="my-input">
          <label htmlFor="email">{t('contactUs.form.email')}</label>
          <input
            type="text"
            id="email"
            value={email}
            required
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder={t('contactUs.form.placeholders.email')}
          />
        </div>

        <div className="my-input">
          <label htmlFor="message">{t('contactUs.form.message')}</label>
          <textarea
            id="message"
            value={message}
            required
            onChange={(e)=>{setMessage(e.target.value)}}
            placeholder={t('contactUs.form.placeholders.message')}
          ></textarea>
        </div>

        <button type='submit'>{t('contactUs.form.submit')}</button>
      </form>
    </div>
  );
};

export default ContactUs;