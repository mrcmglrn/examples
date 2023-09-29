import React, { useState, useEffect } from 'react';
import {
	ExperiencesSection,
	ContentRow,
	ContentColumn,
	LeftContent,
	ImageCharacter,
	Title,
	ExperiencesText,
  Bold,
	ExperiencesContent,
  DetailList,
  CompanyUrl
} from './ExperiencesStyles';


const Experiences = ({ experiencesParentByLanguage }) => {

  const [experiences, setExperiences] = useState({});

  // [experiencesParentByLanguage] ==> Whenever the "experiencesParentByLanguage" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (experiencesParentByLanguage.body != null)
      setExperiences(experiencesParentByLanguage.body.experiences);
  }, [experiencesParentByLanguage]);

  return (
    <ExperiencesSection>
      <ExperiencesContent>
        <Title>
          {experiences.title}
        </Title>
        
        {experiences.items?.map((element, index) => (
          <ContentRow  key={index}>
            <ContentColumn className="image">
              <ImageCharacter src={element.imageUrl} />
            </ContentColumn>
            <ContentColumn className="description">
              <LeftContent>
                <ExperiencesText><Bold>{element.period}:</Bold> {element.startDate} - {element.endDate}</ExperiencesText>
                <ExperiencesText><Bold>{element.positionTitle}:</Bold> {element.position}</ExperiencesText>
                <ExperiencesText><Bold>{element.descriptionTitle}:</Bold> {element.description}</ExperiencesText>
                {element.descriptionDetails !== null ?
                    <DetailList>
                      {element.descriptionDetails.map((elementDetail, index) => (
                        elementDetail !== "*" ? <li key={index}>{elementDetail}</li> : "\n"
                      ))}
                    </DetailList>
                  :
                    ""
                }
                {element.sectorTitle !== null ?
                    <ExperiencesText><Bold>{element.sectorTitle}:</Bold> {element.sector}</ExperiencesText>
                  :
                    ""
                }
                {element.companyTitle !== null ?
                    <ExperiencesText><Bold>{element.companyTitle}:</Bold>
                      <span>{" "}</span>
                      
                      <CompanyUrl href={element.companyUrl} target="_blank">
                        {element.company}
                      </CompanyUrl>

                      {element.companyStreet !== null ?
                        " - " + element.companyStreet
                      :
                        ""
                      }
                    </ExperiencesText>
                  :
                    ""
                }
              </LeftContent>
            </ContentColumn>
          </ContentRow>
        ))}
      </ExperiencesContent>
    </ExperiencesSection>
  )
}

export default Experiences;