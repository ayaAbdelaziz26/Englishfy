import React from 'react';
import { useTranslation } from 'react-i18next';
import './terms.css';

const Terms = () => {
  const { t } = useTranslation('terms');

  return (
    <div className="terms">
      <h1>{t('terms.title')}</h1>
      <p>{t('terms.intro')}</p>

      {t('terms.sections', { returnObjects: true }).map((section, index) => (
        <div key={index}>
          <h2>{t(section.title)}</h2>
          <ol>
            {section.content.map((item, i) => (
              <li key={i}>{t(item)}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default Terms;