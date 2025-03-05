import React, { useEffect } from 'react'; // Import useEffect
import './features.css';
import FeatureCard from '../../Components/FeatureCard/FeatureCard';
import { useTranslation } from 'react-i18next';

// Import feature icons dynamically
const featureIcons = [
  require('../../assets/best-seller.png'),
  require('../../assets/digital-product.png'),
  require('../../assets/precious.png'),
  require('../../assets/diagram.png'),
  require('../../assets/tap.png'),
  require('../../assets/family-support.png'),
  require('../../assets/link.png'),
  require('../../assets/suggestion.png'),
  require('../../assets/tax-free.png'),
];

const Features = () => {
  const { t } = useTranslation('features');

  const featuresData = t('features.cards', { returnObjects: true }); // Fetch an array of feature descriptions

  return (
    <div className="features">
      <h1>{t('features.title')}</h1>

      <div className="features-cards">
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index}
            featureIcon={featureIcons[index]} // Dynamically use the imported icons
            description={feature.description} // Description from the translation file
          />
        ))}
      </div>
    </div>
  );
};

export default Features;