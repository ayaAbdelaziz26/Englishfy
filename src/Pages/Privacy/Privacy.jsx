import React from 'react';
import './privacy.css';
import { useTranslation } from 'react-i18next';

const Privacy = () => {
  const { t } = useTranslation('privacy');

  const sections = t('privacy.sections', { returnObjects: true });

  return (
    <div className="privacy">
      <h1>{t('privacy.title')}</h1>

      {sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          {section.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {section.list && (
            <ul>
              {section.list.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
          {section.note && <p><em>{section.note}</em></p>}
        </div>
      ))}
    </div>
  );
};

export default Privacy;