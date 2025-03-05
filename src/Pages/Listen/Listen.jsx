import React from 'react';
import { useTranslation } from 'react-i18next'; // Use i18next for translations
import './listen.css';

const Listen = () => {
  const { t } = useTranslation('listen'); // Access the translation function
  const points = t('listen.points', { returnObjects: true }); // Get the points array from the translation

  // Ensure that 'points' is an array
  if (!Array.isArray(points)) {
    console.error('Expected points to be an array');
    return null;
  }

  return (
    <main className="listen-page">
      <div className="listen-container">
        <h1 className="listen-title">{t('listen.title')}</h1>

        <ul className="listen-list">
          {points.map((point, index) => (
            <li key={index}>
              <strong>{point.strong}:</strong> {point.text}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Listen;