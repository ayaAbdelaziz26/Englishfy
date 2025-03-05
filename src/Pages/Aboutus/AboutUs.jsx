import React from 'react';
import './aboutUs.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonChalkboard, faClock } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';


const AboutUs = () => {
  const { t } = useTranslation('aboutus'); // Specify 'about' namespace

  return (
    <main className="aboutus">
      <div className="aboutus-top">
        <h1>{t('about_us_title')}</h1>
        <p>{t('about_us_description')}</p>
      </div>

      <div className="aboutus-bottom">
        <div>
          <FontAwesomeIcon icon={faPersonChalkboard} className="topic-icon" />
          <span>38<br />{t('topics')}</span>
        </div>

        <div>
          <FontAwesomeIcon icon={faYoutube} className="youtube-icon" />
          <span>20000<br />{t('videos')}</span>
        </div>

        <div>
          <FontAwesomeIcon icon={faClock} className="hours-icon" />
          <span>5000<br />{t('hours')}</span>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;