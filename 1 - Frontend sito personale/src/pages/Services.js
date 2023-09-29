import React, { useState, useEffect } from 'react';
import ServicesDataService from "../services/servicesService";

//Components
import Skills from '../components/Skills/Skills';
import ServicesDetail from '../components/ServicesDetail/ServicesDetail';
import Prices from '../components/Prices/Prices';
import Faqs from '../components/Faqs/Faqs';

const Services = ({ language }) => {

  const [services, setServices] = useState([]);
  const [servicesByLanguage, setServicesByLanguage] = useState({});

  // [] ==> Only once when loading the component...
  useEffect(() => {
    retrieveServices();
  }, []);

  // ... retrieve all Services structure.
  const retrieveServices = () => {
    ServicesDataService.getAll()
      .then(response => {
        setServices(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // [language, services] ==> Whenever the "language" and/or "services" state variables change...
  useEffect(() => {
    getCurrentObjectByLanguage();
  }, [language, services]);

  // ... the "currentObjectByLanguage" status variable is updated.
  const getCurrentObjectByLanguage = () => {
    // Filter by language: from Array to Array
    const currentObjectAsArray = services.filter(item => item.language == language);
    // Deconstructs the array: from Array to Object
    const currentObject = Object.assign({}, ...currentObjectAsArray);
    // The state variable now is manipulable by fields!
    setServicesByLanguage(currentObject);
  }
  
  return (
    <>
      {/*<Skills language={language} />*/}
      <ServicesDetail servicesDetailParent={servicesByLanguage} />
      <Prices pricesParent={servicesByLanguage} />
      <Faqs faqsParent={servicesByLanguage} />
		</>
  )
}

export default Services;