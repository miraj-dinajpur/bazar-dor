import AllProductsSection from '@/components/AllProductsSection';
import HeroSection from '@/components/HeroSection';
import PriceDecreaseSection from '@/components/PriceDecreaseSection';
import PriceIncreaseSection from '@/components/PriceIncreaseSection';

import React from 'react';

const HomePage = () => {
  return (
    <div>
      <HeroSection/>
      <PriceIncreaseSection/>
      <PriceDecreaseSection/>
      <AllProductsSection/>
    </div>
  );
};

export default HomePage;