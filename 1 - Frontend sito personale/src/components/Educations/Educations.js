import React, { useState, useEffect } from 'react';
import {
	EducationsSection,
	ContentRow,
	ContentColumn,
	LeftContent,
	ImageCharacter,
	Title,
	EducationsText,
	EducationsContent,
  Bold,
  SchoolUrl
} from './EducationsStyles';

const Educations = ({ educationsParentByLanguage }) => {

  const [educations, setEducations] = useState({});

  // [educationsParentByLanguage] ==> Whenever the "educationsParentByLanguage" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (educationsParentByLanguage.body != null)
    setEducations(educationsParentByLanguage.body.educations);
  }, [educationsParentByLanguage]);

  return (
    <EducationsSection>
      <EducationsContent>
        <Title>
          {educations.title}
        </Title>
        
        {educations.items?.map((element, index) => (
          <ContentRow  key={index}>
            <ContentColumn className="image">
              <ImageCharacter src={element.imageUrl} />
            </ContentColumn>
            <ContentColumn className="description">
              <LeftContent>
                <EducationsText><Bold>{element.period}:</Bold> {element.startDate} - {element.endDate}</EducationsText>
                <EducationsText>{element.degree}</EducationsText>
                <EducationsText><Bold>{element.gradeTitle}:</Bold> {element.grade}</EducationsText>
                {element.thesisTitle.length > 0 ?
                  <EducationsText><Bold>{element.thesisTitle}:</Bold> {element.thesis}</EducationsText>
                :
                  ""
                }
                <EducationsText><Bold>{element.descriptionTitle}:</Bold> {element.description}</EducationsText>
                {element.schoolTitle !== null ?
                    <EducationsText><Bold>{element.schoolTitle}:</Bold>
                      <span>{" "}</span>
                      
                      <SchoolUrl href={element.schoolUrl} target="_blank">
                        {element.school}
                      </SchoolUrl>

                      {element.schoolStreet !== null ?
                        " - " + element.schoolStreet
                      :
                        ""
                      }
                    </EducationsText>
                  :
                    ""
                }
              </LeftContent>
            </ContentColumn>
          </ContentRow>
        ))}
      </EducationsContent>
    </EducationsSection>
  )
}

export default Educations;