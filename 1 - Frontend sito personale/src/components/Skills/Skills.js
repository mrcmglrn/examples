import React, { useState, useEffect } from 'react';
import SkillsDataService from "../../services/skillsService";
import ProgressBar from "./ProgressBar/ProgressBar";

import {
	SkillsSection,
  SkillsWrapper,
  Title,
  SkillsCards,
  SkillsCard,
  SkillsCardInfo,
  SkillsCardPlan,
  SkillsCardFeature,
  SkillsCardPrices
} from './SkillsStyles';

const Skills = ({ language }) => {

  const [skills, setSkills] = useState([]);
  const [skillsByLanguage, setSkillsByLanguage] = useState({});

  // [] ==> Only once when loading the component...
  useEffect(() => {
      retrieveSkills();
  }, []);

  // ... retrieve all Skills structure.
  const retrieveSkills = () => {
    SkillsDataService.getAll()
      .then(response => {
        setSkills(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // [language, skills] ==> Whenever the "language" and/or "skills" state variables change...
  useEffect(() => {
    getSkillsByLanguage();
  }, [language, skills]);

  // ... the "skillsByLanguage" status variable is updated.
  const getSkillsByLanguage = () => {
    // Filter by language: from Array to Array
    const currentObjectAsArray = skills.filter(item => item.language == language);
    // Deconstructs the array: from Array to Object
    const currentObject = Object.assign({}, ...currentObjectAsArray);
    // The state variable now is manipulable by fields!
    setSkillsByLanguage(currentObject);
  }

  return (
    <SkillsSection>
      <SkillsWrapper>
        <Title>
          {skillsByLanguage.body?.skills.title}
        </Title>

        <SkillsCards>
          {skillsByLanguage.body?.skills.groups.map((group, indexGroup) => (
            <SkillsCard key={indexGroup}>
              <SkillsCardInfo>
                <SkillsCardPlan>{group.title}</SkillsCardPlan>
                <SkillsCardPrices>
                  {group.items.map((element, indexSkill) => (
                    <SkillsCardFeature key={indexSkill}>
                      <ProgressBar key={indexSkill} title={element.title} description={element.description} level={element.level} />
                    </SkillsCardFeature>
                  ))}
                </SkillsCardPrices>
              </SkillsCardInfo>
            </SkillsCard>
          ))}
        </SkillsCards>
      </SkillsWrapper>
    </SkillsSection>
  )
}

export default Skills;