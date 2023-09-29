import React, { useState, useEffect } from 'react';
import {
	PricesSection,
	PricesWrapper,
  Title,
	PricesCards,
	PricesCardInfo,
  JobType,
  PricesRepositioning,
	PricesCardPlan,
	FeatureImageWrapper,
  ImageCharacter,
	PricesCardPrices,
	PricesCardText,
	PricesCardFeature,
	PricesCard
} from './PricesStyles';

const Prices = ({ pricesParent }) => {

  const [prices, setPrices] = useState({});

  // [pricesParent] ==> Whenever the "pricesParent" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (pricesParent.body != null)
      setPrices(pricesParent.body.prices);
  }, [pricesParent]);

  return (
    <PricesSection>
      <PricesWrapper>
        <Title>
          {prices.title}
        </Title>

        <PricesCards>
          {prices.items?.map((element, index) => (
            <PricesCard key={index}>
              <PricesCardInfo>
                <JobType>{element.jobType}</JobType>

                <PricesRepositioning>
                  <FeatureImageWrapper>
                    <ImageCharacter src={element.imageUrl} />
                  </FeatureImageWrapper>

                  <PricesCardPlan>{element.title}</PricesCardPlan>
                  <PricesCardText>{element.description}</PricesCardText>
                  <PricesCardPrices>
                    {element.features.map((feature, index) => (
                      <PricesCardFeature key={index}>
                        {feature}
                      </PricesCardFeature>
                    ))}
                  </PricesCardPrices>
                </PricesRepositioning>
              </PricesCardInfo>
            </PricesCard>
          ))}
        </PricesCards>
      </PricesWrapper>
    </PricesSection>
  )
}

export default Prices;