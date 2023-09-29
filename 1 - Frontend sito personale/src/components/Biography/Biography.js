import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	BiographySection,
	BiographyContent,
	ContentRow,
	ContentColumn,
	ImageCharacter,
	LeftContent,
	Title,
	BiographyText,
	ButtonContainer,
	BiographyButton
} from './BiographyStyles';

const Biography = ({ homeParentByLanguage }) => {

  const [biography, setBiography] = useState({});
  const [buttons, setButtons] = useState([]);

  // [homeParentByLanguage] ==> Whenever the "homeParentByLanguage" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (homeParentByLanguage.body != null) {
      setBiography(homeParentByLanguage.body.biography);
      setButtons(homeParentByLanguage.body.buttons);
    }
  }, [homeParentByLanguage]);

  const clickButton = (cmdPath) => {
		//window.open(BiographyData.filter(item => item.url != null).map(item => item.url));
		alert("My path is: "+cmdPath);
	};

  return (
    <BiographySection>
			<BiographyContent>
				<ContentRow>
        	<ContentColumn>
						<ImageCharacter
							className="one"
							src={biography.imageUrl}
						/>
					</ContentColumn>
					<ContentColumn>
						<LeftContent>
							<Title>{biography.title}</Title>
							<BiographyText>
								<p>{biography.content}</p> 
								<p>{biography.subcontent}</p> 
							</BiographyText>
							<ButtonContainer>
								{buttons.filter(button => button.parent == 'biography').map((item, index) => (
									<Link to={item.commandPath} key={index}>
										<BiographyButton>
											{item.name}
										</BiographyButton>
									</Link>
								))}
							</ButtonContainer>
						</LeftContent>
					</ContentColumn>
				</ContentRow>
			</BiographyContent>
		</BiographySection>
	)
}

export default Biography;