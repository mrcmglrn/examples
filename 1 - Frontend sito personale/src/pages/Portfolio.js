import React, { useState, useEffect } from 'react';
import PortfolioDataService from "../services/portfolioService";

//Components
import Works from '../components/Works/Works';
import Articles from '../components/Articles/Articles';
import Books from '../components/Books/Books';
import SocialProof from '../components/SocialProof/SocialProof';
import Blog from '../components/Blog/Blog';

const Portfolio = ({ language }) => {

  const [portfolio, setPortfolio] = useState([]);
  const [portfolioByLanguage, setPortfolioByLanguage] = useState({});

  // [] ==> Only once when loading the component...
  useEffect(() => {
    retrievePortfolio();
  }, []);

  // ... retrieve all Portfolio structure.
  const retrievePortfolio = () => {
    PortfolioDataService.getAll()
      .then(response => {
        setPortfolio(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // [language, portfolio] ==> Whenever the "language" and/or "portfolio" state variables change...
  useEffect(() => {
    getCurrentObjectByLanguage();
  }, [language, portfolio]);

  // ... the "currentObjectByLanguage" status variable is updated.
  const getCurrentObjectByLanguage = () => {
    // Filter by language: from Array to Array
    const currentObjectAsArray = portfolio.filter(item => item.language == language);
    // Deconstructs the array: from Array to Object
    const currentObject = Object.assign({}, ...currentObjectAsArray);
    // The state variable now is manipulable by fields!
    setPortfolioByLanguage(currentObject);
  }
  
  return (
    <>
      <Works worksParent={portfolioByLanguage} />
      <SocialProof socialProofParent={portfolioByLanguage} />
			<Articles articlesParent={portfolioByLanguage} />
			<Books booksParent={portfolioByLanguage} />
      <Blog blogParent={portfolioByLanguage} />
		</>
  )
}

export default Portfolio;