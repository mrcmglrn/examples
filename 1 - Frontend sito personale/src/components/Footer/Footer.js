import React, { useState, useEffect } from 'react';
import FooterDataService from "../../services/footerService";
import {
	FooterSection,
	FooterRow,
	FooterColumn,
  FooterIcon,
  FooterText,
  FooterSocialIcon
} from './FooterStyles';

import * as FaIcons from 'react-icons/fa';
import * as TbIcons from 'react-icons/tb';
import * as Io5Icons from 'react-icons/io5';
import * as SiIcons from  'react-icons/si';

const DynamicIcon = ({ name }) => {
  let IconComponent = FaIcons[name];

  if (!IconComponent) {
    IconComponent = TbIcons[name];
  }

  if (!IconComponent) {
    IconComponent = Io5Icons[name];
  }

  if (!IconComponent) {
    IconComponent = SiIcons[name];
  }

  if (!IconComponent) {
    return <FaIcons.FaQuestion />;
  }

  return <IconComponent />;
};

const Footer = ({ language }) => {

  const [footer, setFooter] = useState([]);
  const [footerByLanguage, setFooterByLanguage] = useState({});

  // [] ==> Only once when loading the component...
  useEffect(() => {
      retrieveFooter();
  }, []);

  // ... retrieve all Footer structure.
  const retrieveFooter = () => {
    FooterDataService.getAll()
      .then(response => {
        setFooter(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // [language, footer] ==> Whenever the "language" and/or "footer" state variables change...
  useEffect(() => {
    getFooterByLanguage();
  }, [language, footer]);

  // ... the "footerByLanguage" status variable is updated.
  const getFooterByLanguage = () => {
    // Filter by language: from Array to Array
    const currentObjectAsArray = footer.filter(item => item.language === language);
    // Deconstructs the array: from Array to Object
    const currentObject = Object.assign({}, ...currentObjectAsArray);
    // The state variable now is manipulable by fields!
    setFooterByLanguage(currentObject);
  }

	return (
    <FooterSection inverse={true} >
      <FooterRow className="footerContents">
        <FooterColumn className="footerContact">
          {footerByLanguage.body?.contact.map((element, index) => (
            <FooterRow key={index} className="footerContactElement">
              <FooterIcon>
                <DynamicIcon name={element.icon} />
              </FooterIcon>
              <FooterText>
                {element.value}
              </FooterText>
            </FooterRow>
          ))}
        </FooterColumn>

        <FooterColumn className="footerMenu">
        </FooterColumn>

        <FooterColumn className="footerSocial">
          {footerByLanguage.body?.social.map((element, index) => (
            <FooterSocialIcon
              key={index}
              href={element.url}
              target="_blank"
              title={element.title}
            >
              <DynamicIcon name={element.icon} />
            </FooterSocialIcon>
          ))}
        </FooterColumn>
      </FooterRow>
      <FooterRow className="footerRights">
        {footerByLanguage.body?.copyright}
      </FooterRow>
    </FooterSection>
	)
}

export default Footer;