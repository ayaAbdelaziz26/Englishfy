import React from 'react';
import { useTranslation } from 'react-i18next';
import './benefits.css';

const Benefits = () => {
  const { t } = useTranslation('benefits');

  const benefitsList = t('benefits.items', { returnObjects: true });

  return (
    <div className="benefits">
      <h1>{t('benefits.title')}</h1>
      <ol>
        {Array.isArray(benefitsList) ? (
          benefitsList.map((benefit, index) => (
            <li key={index}>
              <p>{benefit}</p>
            </li>
          ))
        ) : (
          <p>{t('benefits.no_items', 'No benefits available at the moment.')}</p>
        )}
      </ol>
    </div>
  );
};

export default Benefits;