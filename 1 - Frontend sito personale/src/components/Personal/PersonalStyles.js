import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const PersonalSection = styled(Section)`
	background-image: linear-gradient(45deg, #007b5a, #39ca98);
	background-size: cover;
	background-attachment: fixed;
	z-index: 10;
	align-items: center;
	position: relative;
	display: flex;
	min-height: 91vh;
`;

export const PersonalImage = styled.img`
	z-index: 10;
	width: 100%;
	position: absolute;
	left: 0;
	object-fit: cover;

	&.shadow {
		height: 100%;
		max-height: 100%;
	}
`;

export const PersonalContent = styled.div`
	width: 100%;
	padding: 0 1rem;
	z-index: 10;
	position: relative;
`;

export const ContentRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 0rem 2rem;

	@media screen and (max-width: 960px) {
		padding: 0 2rem 4rem;
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
	}
`;

export const ImageCharacter = styled.img`
	&.one {
		width: clamp(10rem, 40vw, 27rem);

		@media screen and (max-width: 960px) {
			display: none;
		}
	}
`;

export const LeftContent = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const PersonalHeading = styled.h1`
	margin: 3rem 0rem 1rem;
	padding: 5rem 0rem 0rem;
	font-size: clamp(2.25rem, 3.3vw, 2.75rem);
	line-height: 1.1;
	font-weight: 600;

	@media screen and (max-width: 960px) {
		padding: 1rem 0rem 0rem;
		text-align: center;
	}
`;

export const Title = styled.h2`
	margin: 1rem 0rem;
	font-size: clamp(1.8rem, 2.65vw, 2.25rem);
	line-height: 1;
	font-weight: 500;

	@media screen and (max-width: 600px) {
		text-align: center;
	}
`;

export const PersonalText = styled.div`
	margin: 1rem 0rem;
	font-size: clamp(1.5rem, 2vw, 1.75rem);

	@media screen and (max-width: 600px) {
		text-align: center;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: center;

	@media screen and (max-width: 600px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const PersonalButton = styled.button`
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
