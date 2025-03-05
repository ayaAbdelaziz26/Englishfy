import React from 'react';
import { useTranslation } from 'react-i18next';
import './basics.css';
import basicsImage from '../../assets/basics-image.png';

const Basics = () => {
  const { t } = useTranslation('basics');

  const episodes = t('basics.episodes', { returnObjects: true });

  return (
    <div className="basics">
      <h1>{t('basics.title')}</h1>

      <div className="basics-intro">
        <img src={basicsImage} alt={t('basics.intro.imageAlt')} />
        <h2>{t('basics.intro.heading')}</h2>
      </div>

      {Array.isArray(episodes) ? (
        episodes.map((episode, index) => (
          <article key={index} className="episode">
            <div className="episode__number">{episode.number}</div>
            <div className="episode__content">
              <div className="title">{episode.title}</div>
              <div className="story">
                {episode.content.map((content, idx) => (
                  <p key={idx}>{content}</p>
                ))}
              </div>
            </div>
          </article>
        ))
      ) : (
        <p>No episodes found or invalid data format.</p>
      )}
    </div>
  );
};

export default Basics;