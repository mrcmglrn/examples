import React, { useState, useEffect } from 'react';
import { SectionWrapped } from '../../globalStyles';
import {
	SocialProofSection,
	SocialProofWrapper,
	HeadingHeading,
	SocialProofCards,
	SocialProofCardInfo,
	SocialProofCardPlan,
	SocialProofImageWrapper,
	SocialProofCardSocialProof,
	SocialProofCardText,
	SocialProofCardFeature,
	SocialProofCard
} from './SocialProofStyles';

const SocialProof = ({ socialProofParent }) => {

  const [socialProof, setSocialProof] = useState({});

  // [socialProofParent] ==> Whenever the "socialProofParent" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (socialProofParent.body != null)
      setSocialProof(socialProofParent.body.socialProof);
  }, [socialProofParent]);

  return (
    <SocialProofSection>
      <SectionWrapped>
        <SocialProofWrapper>
          <HeadingHeading>{socialProof.title}</HeadingHeading>
          <SocialProofCards>
            {socialProof.items?.map((element, index) => (
              <SocialProofCard key={index}>
                <SocialProofCardInfo>
                  <SocialProofImageWrapper>
                    {element.imageUrl}
                  </SocialProofImageWrapper>
                  <SocialProofCardPlan>{element.title}</SocialProofCardPlan>
                  <SocialProofCardText>{element.description}</SocialProofCardText>
                </SocialProofCardInfo>
              </SocialProofCard>
            ))}
          </SocialProofCards>
        </SocialProofWrapper>
      </SectionWrapped>
    </SocialProofSection>
  )
}

export default SocialProof;