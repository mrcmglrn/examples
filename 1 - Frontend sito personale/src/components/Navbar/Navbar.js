import React, { useState, useEffect } from 'react';
import NavbarDataService from "../../services/navbarService";
import Options from "./Options/Options"

import { CgMenuRight } from 'react-icons/cg';
import { FaTimes } from 'react-icons/fa';
import { NavbarSection,
         Nav, 
         NavbarContainer, 
         NavLogo, 
         NavIcon, 
         MobileIcon, 
         NavMenu, 
         NavLinks, 
         NavItem, 
         NavButton 
} from './NavbarStyles';

const Navbar = ({ language, setLanguage }) => {

  const [navbar, setNavbar] = useState([]);
  const [navbarByLanguage, setNavbarByLanguage] = useState({});
  const [show, setShow] = useState(false);

  // [] ==> Only once when loading the component...
  useEffect(() => {
      retrieveNavbar();
  }, []);

  // ... retrieve all Navbar structure.
  const retrieveNavbar = () => {
    NavbarDataService.getAll()
      .then(response => {
        setNavbar(response.data);
        //console.log("JSON response.data: "+JSON.stringify(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  }

  // [language, navbar] ==> Whenever the "language" and/or "navbar" state variables change...
  useEffect(() => {
    getNavbarByLanguage();
  }, [language, navbar]);

  // ... the "currentObjectByLanguage" status variable is updated.
  const getNavbarByLanguage = () => {
    // Filter by language: from Array to Array
    const currentObjectAsArray = navbar.filter(item => item.language == language);
    // Deconstructs the array: from Array to Object
    const currentObject = Object.assign({}, ...currentObjectAsArray);
    // The state variable now is manipulable by fields!
    setNavbarByLanguage(currentObject);
    //console.log("JSON currentObject: "+JSON.stringify(currentObject));
  }

  //const onChangeLanguageEvent = (lang) => {
  //  setLanguage(lang);
  //}

  // Not used here!
  const scrollTo = (id) => {
		const element = document.getElementById(id);

		element.scrollIntoView({
			behavior: 'smooth',
		});
		
		setShow(false);
	};

  // Not used here!
	const redirectTo = (url) => {
		window.open(url);

		setShow(false);
	}

  /*
   * È necessario l'operatore OPTIONAL CHAINING "?." perché all'inizio i campi non sono popolati!!!
   * È equivalente di fare il check esterno in un'iterazione di mappa!!!
   * 
   * "navbarByLanguage" esiste a prescindere perché l'ho definito come variabile di stato!
   * Tutti i campi successivi al body esisteranno a prescindere dopo il recupero del body!
   */
  return (
    <NavbarSection inverse={true} > 
      <Nav>
        <NavbarContainer>
          {//navbarByLanguage.body &&
            <NavLogo to={navbarByLanguage.body?.logo.to}>
              <NavIcon src={navbarByLanguage.body?.logo.src} alt={navbarByLanguage.body?.logo.alt} />
            </NavLogo>
          }

          <MobileIcon onClick={() => setShow(!show)}>
            {show ? <FaTimes /> : <CgMenuRight />}
          </MobileIcon>
          <NavMenu show={show}>
            {//navbarByLanguage.body?.routes.map((element, index) => (
              navbarByLanguage.body && navbarByLanguage.body.routes.map((element, index) => (
              <NavItem key={index}>
                {element.url ?
                  <NavButton onClick={() => redirectTo(element.url)}>
                    {element.title}
                  </NavButton>	
                  : 
                  element.to ?
                    <NavLinks to={element.to} onClick={() => setShow(false)}>
                      {element.title}
                    </NavLinks>	
                    : 
                    <NavLinks onClick={() => scrollTo(element.id)}>
                      {element.title}
                    </NavLinks>
                }
              </NavItem>
            ))}
            <Options languageParent={language} 
                    navbarParentByLanguage={navbarByLanguage} 
                    setLanguageParent={setLanguage}
                    setShowParent={setShow} />
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </NavbarSection> 
  )
}

export default Navbar;