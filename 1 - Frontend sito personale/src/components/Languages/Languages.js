import React, { useState, useEffect } from 'react';
import {
	LanguagesSection,
  LanguagesContent,
	ContentRow,
	LeftContent,
	Title,
  LanguagesText,
  Table,
  TableVertical
} from './LanguagesStyles';

const Languages = ({ languagesParentByLanguage }) => {

  const [languages, setLanguages] = useState({});

  // [languagesParentByLanguage] ==> Whenever the "languagesParentByLanguage" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (languagesParentByLanguage.body != null)
    setLanguages(languagesParentByLanguage.body.languages);
  }, [languagesParentByLanguage]);

  return (
    <LanguagesSection>
      <LanguagesContent>
        <ContentRow>
            <LeftContent>
              <Title>
                {languages.title}
              </Title>
              
              <LanguagesText>
                {languages.nativeLanguageTitle}: {languages.nativeLanguage}
              </LanguagesText>

              <Table>
                <thead>
                  {languages.itemsTitle?.map((elementT, indexT) => (
                    <tr key={indexT}>
                      <th className="first">{elementT.languageTitle}</th>
                      <th>{elementT.listeningTitle}</th>
                      <th>{elementT.readingTitle}</th>
                      <th>{elementT.interactionTitle}</th>
                      <th>{elementT.pronunciationTitle}</th>
                      <th>{elementT.writingTitle}</th>
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {languages.items?.map((element, index) => (
                    <tr key={index}>
                      <td className="first">{element.language}</td>
                      <td>{element.listening}</td>
                      <td>{element.reading}</td>
                      <td>{element.interaction}</td>
                      <td>{element.pronunciation}</td>
                      <td>{element.writing}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <TableVertical>
                <thead>
                  {languages.itemsTitleVertical?.map((elementT, indexT) => (
                    <tr key={indexT}>
                      <th className="first">{elementT.skill}</th>
                      <th className="other">{elementT.item1}</th>
                      <th className="other">{elementT.item2}</th>
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {languages.itemsVertical?.map((element, index) => (
                    <tr key={index}>
                      <td className="first">{element.skill}</td>
                      <td>{element.item1}</td>
                      <td>{element.item2}</td>
                    </tr>
                  ))}
                </tbody>
              </TableVertical>
            </LeftContent>
        </ContentRow>
      </LanguagesContent>
    </LanguagesSection>
  )
}

export default Languages;