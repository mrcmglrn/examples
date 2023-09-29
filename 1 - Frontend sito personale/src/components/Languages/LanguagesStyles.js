import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const LanguagesSection = styled(Section)`
`;

export const LanguagesContent = styled.div`
	width: 100%;
	padding: 0 1rem;
	z-index: 10;
	position: relative;
`;

export const ContentRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 2rem;

	@media screen and (max-width: 960px) {
		padding: 2rem 0 1rem;
	}
`;

export const LeftContent = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Title = styled.h2`
	margin: 1rem 0 0;
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;
`;

export const LanguagesText = styled.div`
	margin: 2rem 0 0;
	font-size: clamp(1.2rem, 1.6vw, 2rem);
`;

export const Table = styled.table`
	border: 2px solid #666;
	border-collapse: collapse;
  margin: 2rem 0;
  width: clamp(30rem, 80vw, 60rem);
  height: 24vh;

	thead, tbody {
		height: 8vh;
	}

	/* Styles applied only in Firefox */
  @-moz-document url-prefix() {
    thead, tbody {
			height: auto;
		}
  }

	th {
		border: 2px solid #666;
		font-style: italic;

		&.first {
			background-color: #dfdfdf;
		}
	}
		
	td {
		border: 2px solid #666;
		text-align: center;

		&.first {
			background-color: #dfdfdf;
		}
	}

	@media screen and (max-width: 720px) {
		display: none;
	}
`;

export const TableVertical = styled.table`
	border: 2px solid #666;
	border-collapse: collapse;
  margin: 2rem 0;
  width: clamp(10rem, 80vw, 60rem);
  height: 24vh;

	thead, tbody {
		height: 4vh;
	}

	/* Styles applied only in Firefox */
  @-moz-document url-prefix() {
    thead, tbody {
			height: auto;
		}
  }

	th {
		border: 2px solid #666;
		background-color: #dfdfdf;

		&.first {
			font-style: italic;
		}

		&.other {
			font-weight: 400;
		}
	}
		
	td {
		border: 2px solid #666;
		text-align: center;

		&.first {
			font-style: italic;
			font-weight: 600;
		}
	}

	@media screen and (min-width: 719px) {
		display: none;
	}
`;