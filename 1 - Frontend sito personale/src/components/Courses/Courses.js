import React, { useState, useEffect } from 'react';
import {
	CoursesSection,
	ContentRow,
	ContentColumn,
	LeftContent,
	ImageCharacter,
	Title,
	CoursesText,
	CoursesContent,
  Bold,
  DetailList,
  CompanyUrl
} from './CoursesStyles';

const Courses = ({ coursesParentByLanguage }) => {

  const [courses, setCourses] = useState({});

  // [coursesParentByLanguage] ==> Whenever the "coursesParentByLanguage" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (coursesParentByLanguage.body != null)
      setCourses(coursesParentByLanguage.body.courses);
  }, [coursesParentByLanguage]);

  return (
    <CoursesSection>
      <CoursesContent>
        <Title>
          {courses.title}
        </Title>
        
        {courses.items?.map((element, index) => (
          <ContentRow  key={index}>
            <ContentColumn className="image">
              <ImageCharacter src={element.imageUrl} />
            </ContentColumn>
            <ContentColumn className="description">
              <LeftContent>
                <CoursesText><Bold>{element.period}:</Bold> {element.startDate} - {element.endDate}</CoursesText>
                <CoursesText><Bold>{element.nameTitle}:</Bold> {element.name}</CoursesText>
                <CoursesText><Bold>{element.descriptionTitle}:</Bold> {element.description}</CoursesText>
                {element.descriptionDetails !== null ?
                    <DetailList>
                      {element.descriptionDetails.map((elementDetail, index) => (
                        elementDetail !== "*" ? <li key={index}>{elementDetail}</li> : "\n"
                      ))}
                    </DetailList>
                  :
                    ""
                }
                <CoursesText><Bold>{element.timeTitle}:</Bold> {element.time}</CoursesText>
                <CoursesText><Bold>{element.sectorTitle}:</Bold> {element.sector}</CoursesText>
                {element.companyTitle !== null ?
                    <CoursesText><Bold>{element.companyTitle}:</Bold>
                      <span>{" "}</span>
                      
                      <CompanyUrl href={element.companyUrl} target="_blank">
                        {element.company}
                      </CompanyUrl>

                      {element.companyStreet !== null ?
                        " - " + element.companyStreet
                      :
                        ""
                      }
                    </CoursesText>
                  :
                    ""
                }
              </LeftContent>
            </ContentColumn>
          </ContentRow>
        ))}
      </CoursesContent>
    </CoursesSection>
  )
}

export default Courses;