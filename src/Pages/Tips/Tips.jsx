import React from 'react';
import './tips.css';
import { useTranslation } from 'react-i18next';

const Tips = () => {
  const { t } = useTranslation('tips');

  // Fetch 'tipItems' as an array
  const tipItems = t('tipItems', { returnObjects: true });

  return (
    <div className="tips-page">
      <div className="tips-header">
        <h1>{t('title')}</h1>
      </div>
      <div className="tips-grid">
        {Array.isArray(tipItems) && tipItems.map((tip, index) => (
          <div className="tip-item" key={index}>
            <div className="circle">{tip.number}</div>
            <p><strong>{t(tip.title)}:</strong> {t(tip.content)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;