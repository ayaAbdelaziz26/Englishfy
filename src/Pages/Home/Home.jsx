import React from 'react'
import { useState } from 'react'
import './home.css'
import { Outlet } from 'react-router-dom';

const Home = () => {
    const [maximize, setMaximize] = useState(false);

    return (
        <main id='home'>
            <div className="home-left">
                <div className="google-ad-top">
                </div>

                <div className="content">
                <Outlet context={{ maximize, setMaximize }} />
                </div>
            </div>

            <div className="google-ad-right">
                <div className="google-ad-right-top">
                </div>

                <div className="google-ad-right-bottom">
                </div>
            </div>

            <div className='footer-ad'></div>
        </main>
    )
}

export default Home