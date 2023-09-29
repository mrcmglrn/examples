import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const BiographySection = styled(Section)`
`;

export const BiographyContent = styled.div`
	width: 100%;
	padding: 0 1rem;
	z-index: 10;
	position: relative;
`;

export const ContentRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 4rem 2rem;

	@media screen and (max-width: 960px) {
		padding: 4rem 0;
	}
`;

export const ContentColumn = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	@media screen and (max-width: 960px) {
		flex-basis: 100%;
		align-items: center;
	}
`;

export const ImageCharacter = styled.img`
	border: 0.05rem solid #999;

	&.one {
		width: clamp(16rem, 36vw, 30rem);
	}
`;

export const LeftContent = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 960px) {
		padding: 2rem 0 0;
	}
`;

export const Title = styled.h2`
	margin: 1rem 0rem;
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
`;

export const BiographyText = styled.div`
	margin: 1rem 0rem;
	font-size: clamp(1.1875rem, 1.55vw, 1.3125rem);
	white-space: pre-line;
	text-align: justify;
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 600px) {
		flex-direction: column;
	}
`;

export const BiographyButton = styled.button`
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