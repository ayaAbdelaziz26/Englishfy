import React from 'react';
import { useTranslation } from 'react-i18next'; 
import './faq.css';
import Question from '../../Components/Question/Question';

const FAQ = () => {
  const { t } = useTranslation('faq');

  const myQuestions = t('faq.questions', { returnObjects: true });

  return (
    <div id="faq">
      <div className="faq-head">
        <h1>{t('faq.title')}</h1>
      </div>

      <div className="faq-questions">
        {myQuestions.map((item, index) => (
          <Question key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}

export default FAQ;
