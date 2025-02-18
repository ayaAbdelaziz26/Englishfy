import React from 'react'
import './featureCard.css'
import anyIcon from '../../assets/best-seller.png'

const FeatureCard = ({featureIcon,description}) => {
  return (
    <div className='feature-card'>
      <img src={featureIcon} alt="Feature Icon" />
      <p>{description}</p>
    </div>
  )
}

export default FeatureCard
