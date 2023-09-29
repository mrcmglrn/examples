import React, { useState, useEffect } from 'react';
import {
	ArticlesSection,
	ArticlesWrapper,
  Title,
	ArticlesContainer,
  ArticlesGroup,
	ArticleInfo,
  ArticleData,
	ArticleTitle,
  ArticleText,
  ArticleUrl
} from './ArticlesStyles';

const Articles = ({ articlesParent }) => {

  const [articles, setArticles] = useState({});

  // [articlesParent] ==> Whenever the "articlesParent" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (articlesParent.body != null)
      setArticles(articlesParent.body.articles);
  }, [articlesParent]);

  return (
    <ArticlesSection>
      <ArticlesWrapper>
        <Title>
          {articles.title}
        </Title>

        <ArticlesContainer>
          {articles.items?.map((element, index) => (
            <ArticlesGroup key={index}>
              <ArticleInfo translated={element.translated}>
                <ArticleData translated={element.translated}>{element.translatedAlert} {element.data}</ArticleData>
                <ArticleTitle>{element.title}</ArticleTitle>
                <ArticleText>{element.description}</ArticleText>
                <ArticleUrl href={element.url} target="_blank">{element.urlText}</ArticleUrl>
              </ArticleInfo>
            </ArticlesGroup>
          ))}
        </ArticlesContainer>
      </ArticlesWrapper>
    </ArticlesSection>
  )
}

export default Articles;