import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	PersonalSection,
	ContentRow,
	ContentColumn,
	LeftContent,
	ImageCharacter,
	PersonalHeading,
	Title,
	PersonalText,
	ButtonContainer,
	PersonalButton,
	PersonalImage,
	PersonalContent
} from './PersonalStyles';

const Personal = ({ homeParentByLanguage }) => {

  const [personal, setPersonal] = useState({});
  const [buttons, setButtons] = useState([]);

  // [homeParentByLanguage] ==> Whenever the "homeParentByLanguage" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (homeParentByLanguage.body != null) {
      setPersonal(homeParentByLanguage.body.personal);
			setButtons(homeParentByLanguage.body.buttons);
		}

    // EQUIVALENTE 
    //setPersonal(homeParentByLanguage.body?.personal);
		//setButtons(homeParentByLanguage.body?.buttons);
  }, [homeParentByLanguage]);

  const clickButton = (cmdPath) => {
		window.open(cmdPath);
	};

  return (
		<PersonalSection inverse={true}>
			<PersonalImage className="shadow" src={personal.backgroundImageUrl} />
			<PersonalContent>
				<ContentRow>
					<ContentColumn>
						<LeftContent>
							<PersonalHeading>{personal.name}</PersonalHeading>
							<Title>{personal.description}</Title>
							<PersonalText>
								<p>{personal.content}</p> 
								<p>{personal.subcontent}</p> 
							</PersonalText>
							<ButtonContainer>
								{buttons.filter(button => button.parent == 'personal').map((item, index) => (
									<Link to={item.commandPath} key={index}>
										<PersonalButton>
											{item.name}
										</PersonalButton>
									</Link>
								))}
							</ButtonContainer>
						</LeftContent>
					</ContentColumn>
					<ContentColumn>
						<ImageCharacter
							className="one"
							src={personal.imageUrl}
						/>
					</ContentColumn>
				</ContentRow>
			</PersonalContent>
		</PersonalSection>
	)
}

export default Personal;
