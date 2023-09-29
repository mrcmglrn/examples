import React, { useState, useEffect } from 'react';
import {
	BooksSection,
  Title,
  BooksList,
  ContentRow,
  ContentColumn,
  BooksData,
  BooksTitle,
  BooksDescription,
  BooksUrl
} from './BooksStyles';

const Books = ({ booksParent }) => {

  const [books, setBooks] = useState({});

  // [booksParent] ==> Whenever the "booksParent" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (booksParent.body != null)
      setBooks(booksParent.body.books);
  }, [booksParent]);

  return (
    <BooksSection>
      <Title>
        {books.title}
      </Title>

      {books.items?.map((element, index) => (
        <BooksList key={index}>
          <ContentRow className={element.css}>
            <ContentColumn className="data">
              <BooksData>{element.data}</BooksData>
              <BooksTitle>{element.title}</BooksTitle>
              <BooksDescription>{element.description}</BooksDescription>
            </ContentColumn>
            <ContentColumn className="url">
              <BooksUrl href={element.url}>{element.urlText}</BooksUrl>
            </ContentColumn>
          </ContentRow>
        </BooksList>
      ))}
    </BooksSection>
  )
}

export default Books;