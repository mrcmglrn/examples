import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const CvSection = styled(Section)`
`;

export const CvContent = styled.div`
	width: 100%;
	padding: 0 1rem;
	z-index: 10;
	position: relative;
`;

export const ContentRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 0rem 3rem 2rem;
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: right;

  @media screen and (max-width: 960px) {
		justify-content: center;
	}
`;

export const CvButton = styled.button`
	height: 3rem;
	padding: 0.8rem 2rem;
	font-weight: 600;
	font-size: 1.1rem;
	border-radius: 1.5rem;
	border: none;
	background: linear-gradient(150deg, #ccc -10%, #636363);
	cursor: pointer;
	color: white;

	&:hover {
		box-shadow: 0 0 2rem 0.75rem #efefef;
		transition: box-shadow 0.4s ease-in;
	}

	@media screen and (max-width: 960px) {
		justify-content: center;
		align-items: center;
	}
`;
