import React, { useState, useEffect } from 'react';
import HomeDataService from "../services/homeService";

//Components
import Personal from '../components/Personal/Personal';
import Biography from '../components/Biography/Biography';
import Skills from '../components/Skills/Skills';

const Home = ({ language }) => {

  const [home, setHome] = useState([]);
  const [homeByLanguage, setHomeByLanguage] = useState({});

  // [] ==> Only once when loading the component...
  useEffect(() => {
    retrieveHome();
  }, []);

  // ... retrieve all Home structure.
  const retrieveHome = () => {
    HomeDataService.getAll()
      .then(response => {
        setHome(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // [language, home] ==> Whenever the "language" and/or "home" state variables change...
  useEffect(() => {
    getCurrentObjectByLanguage();
  }, [language, home]);

  // ... the "currentObjectByLanguage" status variable is updated.
  const getCurrentObjectByLanguage = () => {
    // Filter by language: from Array to Array
    const currentObjectAsArray = home.filter(item => item.language == language);
    // Deconstructs the array: from Array to Object
    const currentObject = Object.assign({}, ...currentObjectAsArray);
    // The state variable now is manipulable by fields!
    setHomeByLanguage(currentObject);
  }

  return (
    <>
      <Personal homeParentByLanguage={homeByLanguage} />
      <Biography homeParentByLanguage={homeByLanguage} />
    </>
  )
}

export default Home;