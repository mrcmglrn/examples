import React, { useState, useEffect } from 'react';
import ServiceDetail from './ServiceDetail/ServiceDetail';
import {
	ServicesDetailSection,
  ServicesDetailContent,
	ContentRow,
	LeftContent,
	Title
} from './ServicesDetailStyles';

const ServicesDetail = ({ servicesDetailParent }) => {

  const [servicesDetail, setServicesDetail] = useState({});

  // [servicesDetailParent] ==> Whenever the "servicesDetailParent" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (servicesDetailParent.body != null)
      setServicesDetail(servicesDetailParent.body.servicesDetail);
  }, [servicesDetailParent]);

  return (
    <ServicesDetailSection>
      <ServicesDetailContent>
        <Title>
          {servicesDetail.title}
        </Title>

        <ContentRow>
          <LeftContent>
            {servicesDetail.items?.map((service, index) => (
              <ServiceDetail {...service} key={index} />
            ))}
          </LeftContent>
        </ContentRow>
      </ServicesDetailContent>
    </ServicesDetailSection>
  )
}

export default ServicesDetail;