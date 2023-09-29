import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const ExperiencesSection = styled(Section)`
	padding: 2rem 0 0;
`;

export const ExperiencesContent = styled.div`
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

export const ContentColumn = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	text-align: justify;

	&.image {
		padding-top: 0.5rem;
	}

	&.description {
		flex-grow: 5;
		padding-left: 2rem;
	}
	
	@media screen and (max-width: 960px) {
		flex-basis: 100%;
		align-items: center;

		&.description {
			padding: 1rem 2rem 0;
		}
	}
`;

export const ImageCharacter = styled.img`
	border: 0.05rem solid #999;
	border-radius: 1rem;
	width: 8rem;
`;

export const LeftContent = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: left;
`;

export const Title = styled.h2`
	margin: 1rem 0 0;
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;

	@media screen and (max-width: 960px) {
		margin: 0;
	}
`;

export const ExperiencesText = styled.div`
	white-space: pre-line;
	margin: 0.35rem 0rem;
	font-size: clamp(1rem, 1.45vw, 1.25rem);
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;

	@media screen and (max-width: 960px) {
		justify-content: center;
	}
`;

export const ExperiencesButton = styled.button`
	height: 3rem;
	padding: 0.8rem 2rem;
	font-weight: 600;
	font-size: 1.1rem;
	border-radius: 1.5rem;
	border: none;
	background: linear-gradient(150deg, #ccc -10%, #636363);
	cursor: pointer;
	color: white;
	margin: 2rem 2rem 0rem;

	&:hover {
		box-shadow: 0 0 2rem 0.75rem #efefef;
		transition: box-shadow 0.4s ease-in;
	}

	@media screen and (max-width: 960px) {
		justify-content: center;
		align-items: center;
	}
`;

export const Bold = styled.span`
	font-weight: 600;
	font-style: italic;
`;

export const DetailList = styled.ul`
	font-size: clamp(1rem, 1.45vw, 1.25rem);
	padding-left: 2rem;
`;

export const CompanyUrl = styled.a`
	margin: 0.75rem 0;
	text-align: center;
`;
