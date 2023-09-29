import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	CvSection,
	CvContent,
	ContentRow,
	ButtonContainer,
	CvButton
} from './CvStyles';

const Cv = ({ cvParentByLanguage }) => {

  const [cv, setCV] = useState([]);

  // [cvParentByLanguage] ==> Whenever the "cvParentByLanguage" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (cvParentByLanguage.body != null)
    setCV(cvParentByLanguage.body.buttons);
  }, [cvParentByLanguage]);

  return (
    <CvSection>
      <CvContent>
        <ContentRow>
          <ButtonContainer>
            {cv.map((item, index) => (
              <a href={item.commandPath} key={index} target="_blank" >
                <CvButton>
                  {item.name}
                </CvButton>
              </a>
            ))}
          </ButtonContainer>
        </ContentRow>
			</CvContent>
		</CvSection>
  )
}

export default Cv