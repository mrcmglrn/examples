import React, { useState, useEffect } from 'react';
import ContactDataService from "../services/contactService";

//Components
import ContactForm from '../components/ContactForm/ContactForm';

// Manipulate data as json & populate fields by language
const Contact = ({ language }) => {

  const [contact, setContact] = useState([]);
  const [contactByLanguage, setContactByLanguage] = useState({});

  // [] ==> Only once when loading the component...
  useEffect(() => {
    retrieveContact();
  }, []);

  // ... retrieve all Skills structure.
  const retrieveContact = () => {
    ContactDataService.getAll()
      .then(response => {
        setContact(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // [language, contact] ==> Whenever the "language" and/or "contact" state variables change...
  useEffect(() => {
    getCurrentObjectByLanguage();
  }, [language, contact]);

  // ... the "currentObjectByLanguage" status variable is updated.
  const getCurrentObjectByLanguage = () => {
    // Filter by language: from Array to Array
    const currentObjectAsArray = contact.filter(item => item.language == language);
    // Deconstructs the array: from Array to Object
    const currentObject = Object.assign({}, ...currentObjectAsArray);
    // The state variable now is manipulable by fields!
    setContactByLanguage(currentObject);
  }

  return (
    <>
      <ContactForm contactParentByLanguage={contactByLanguage} />
		</>
  )
}

export default Contact;