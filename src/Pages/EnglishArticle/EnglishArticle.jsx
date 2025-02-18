import React from 'react';
import { useTranslation } from 'react-i18next';
import './englishArticle.css';
import articleImage from '../../assets/learn-english-1.avif';

const EnglishArticle = () => {
  const { t } = useTranslation('englishArticle');

  const points = t('englishArticle.points', { returnObjects: true });

  return (
    <main className='english-article'>
      <h1>{t('englishArticle.title')}</h1>
      <img src={articleImage} alt={t('englishArticle.imageAlt')} />

      {Array.isArray(points) && (
        <ol>
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ol>
      )}
    </main>
  );
};

export default EnglishArticle;
