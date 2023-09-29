import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const WorksSection = styled(Section)`
	padding: 3rem 0 0;
`;

export const WorksContent = styled.div`
	width: 100%;
	padding: 0 1rem;
	z-index: 10;
	position: relative;
`;

export const ContentRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	padding: 0 2rem;
`;

export const LeftContent = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: left;

	@media screen and (max-width: 960px) {
		align-items: center;
	}
`;

export const Title = styled.h2`
	margin: 1rem 0 0;
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;

	@media screen and (max-width: 960px) {
		margin: 1rem 0;
  }
`;
