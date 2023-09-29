import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const BooksSection = styled(Section)`
  padding: 0 10% 2rem;
	display: none;

	@media screen and (max-width: 960px) {
		padding: 0 15% 1rem;
	}
`;

export const Title = styled.h2`
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;
	padding-bottom: 1rem;
`;

export const BooksList = styled.div`
`;

export const ContentRow = styled.div`
	border-top: 1px solid #ccc;
	padding: 2rem;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;

	&.first {
		border-top: none;
	}

	@media screen and (max-width: 960px) {
		flex-direction: column;
		align-items: center;
	}
`;

export const ContentColumn = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	text-align: justify;

	&.data {
		flex-grow: 3;
		padding-right: 2rem;
	}

	&.url {
		justify-content: center;
		text-align: right;
		padding-left: 2rem;
	}

	@media screen and (max-width: 960px) {
		&.data {
			justify-content: center;
			text-align: center;
			padding-right: 0;
		}
	
		&.url {
			justify-content: center;
			text-align: center;
			padding-top: 1.5rem;
			padding-left: 0;
		}
	}
`;

export const BooksData = styled.div`
	font-size: clamp(1rem, 1.45vw, 1.25rem);
	font-style: italic;
`;

export const BooksTitle = styled.h3`
	padding: 0.5rem 0 1.5rem;
	font-size: clamp(1.25rem, 1.75vw, 1.5rem);
`;

export const BooksDescription = styled.p`
	font-size: clamp(0.9rem, 1.3vw, 1.1rem);
`;

export const BooksUrl = styled.a`
	font-size: clamp(1rem, 1.45vw, 1.25rem);
`;
