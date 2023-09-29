import React, { useState, useEffect } from 'react';
import CurriculumDataService from "../services/curriculumService";

//Components
import Experiences from '../components/Experiences/Experiences';
import Courses from '../components/Courses/Courses';
import Educations from '../components/Educations/Educations';
import Languages from '../components/Languages/Languages';
import Skills from '../components/Skills/Skills';
import Cv from '../components/Cv/Cv';

const Curriculum = ({ language }) => {

  const [curriculum, setCurriculum] = useState([]);
  const [curriculumByLanguage, setCurriculumByLanguage] = useState({});

  // [] ==> Only once when loading the component...
  useEffect(() => {
    retrieveCurriculum();
  }, []);

  // ... retrieve all Curriculum structure.
  const retrieveCurriculum = () => {
     CurriculumDataService.getAll()
      .then(response => {
        setCurriculum(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // [language, curriculum] ==> Whenever the "language" and/or "curriculum" state variables change...
  useEffect(() => {
    getCurrentObjectByLanguage();
  }, [language, curriculum]);

  // ... the "currentObjectByLanguage" status variable is updated.
  const getCurrentObjectByLanguage = () => {
    // Filter by language: from Array to Array
    const currentObjectAsArray = curriculum.filter(item => item.language == language);
    // Deconstructs the array: from Array to Object
    const currentObject = Object.assign({}, ...currentObjectAsArray);
    // The state variable now is manipulable by fields!
    setCurriculumByLanguage(currentObject);
  }

  return (
    <>
      <Skills language={language} />
      <Experiences experiencesParentByLanguage={curriculumByLanguage} />
      <Courses coursesParentByLanguage={curriculumByLanguage} />
      <Educations educationsParentByLanguage={curriculumByLanguage} />
      <Languages languagesParentByLanguage={curriculumByLanguage} />
      <Cv cvParentByLanguage={curriculumByLanguage} />
    </>
  )
}

export default Curriculum;