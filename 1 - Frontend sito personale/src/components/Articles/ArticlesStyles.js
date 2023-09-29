import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const ArticlesSection = styled(Section)`
  padding: 2rem 3rem 3rem;

  @media screen and (max-width: 960px) {
    padding: 2rem 3rem 1rem;
  }
`;

export const ArticlesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Title = styled.h2`
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;

	@media screen and (max-width: 960px) {
		padding-bottom: 1rem;
  }
`;

export const ArticlesContainer = styled.div`
	display: flex;
	flex-flow: wrap;
	flex-direction: row;
	justify-content: space-around;
	align-items: stretch;
	width: 100%;
`;

export const ArticlesGroup = styled.div`
	padding: 3rem 2rem;

	&:hover {
		transform: scale(1.1);
		transition: all 0.4s ease-out;
	}

	@media screen and (max-width: 960px) {
		padding: 1rem 2rem;
  }
`;

export const ArticleInfo = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 0.25rem 0.25rem 0.75rem rgb(102, 102, 102);
	width: clamp(18rem, 20vw, 22rem);
	height: 100%;
	border-radius: 2.5rem;
	padding: 1.5rem;
	background-color: ${({ translated }) => (translated ? '#fff' : '#dcdcdc')};
`;

export const ArticleData = styled.p`
	font-size: clamp(0.9rem, 1.3vw, 1.05rem);
	font-style: italic;
	margin-bottom: 0.75rem;
	color: ${({ translated }) => (translated ? "inherit" : "red")};

	&.alert {
		display: ${({ translated }) => (translated ? "none" : "inline")};
	}
`;

export const ArticleTitle = styled.h3`
	margin: 0.75rem 0;
	font-size: clamp(1.1rem, 1.35vw, 1.35rem);
	text-align: center;
`;

export const ArticleText = styled.p`
	margin: 0.75rem 0;
	font-size: clamp(1rem, 1.2vw, 1.2rem);
	text-align: center;
`;

export const ArticleUrl = styled.a`
	margin: 0.75rem 0;
	font-size: clamp(0.9rem, 1.3vw, 1.05rem);
	text-align: center;
`;
