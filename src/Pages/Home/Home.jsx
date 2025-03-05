import React from 'react'
import { useState } from 'react'
import './home.css'
import { Outlet } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
    const [maximize, setMaximize] = useState(false);

    return (
        <main id='home'>
            <div className="home-left">
                <div className="google-ad-top">
                    This is the first ad.
                </div>

                <div className="content">
                <Outlet context={{ maximize, setMaximize }} />
                </div>
            </div>

            <div className="google-ad-right">
                <div className="google-ad-right-top">
                    This is the second ad.
                </div>

                <div className="google-ad-right-bottom">
                    This is the third ad.
                </div>

                <div className="google-ad-right-small">
                    this is fourth ad
                </div>
            </div>

            <div className='footer-ad'>this is footer ad.</div>

            {/* <Footer/> */}
        </main>
    )
}

export default Home