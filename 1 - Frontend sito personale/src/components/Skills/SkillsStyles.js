import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const SkillsSection = styled(Section)`
	padding: 3rem 0 0;
`;

export const SkillsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Title = styled.h2`
	margin: 1rem 0 2rem;
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;

	@media screen and (max-width: 960px) {
		margin: 1rem 0;
	}
`;

export const SkillsCards = styled.div`
	display: flex;
	flex-flow: wrap;
	flex-direction: row;
	justify-content: space-around;
	align-items: stretch;
	width: 100%;
`;

export const SkillsCard = styled.div`
    padding: 2rem 3rem;
`;

export const SkillsCardInfo = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 0.25rem 0.25rem 0.75rem rgb(102, 102, 102);
	width: clamp(20rem, 20vw, 28rem);
	height: 100%;
	border-radius: 2.5rem;
	padding: 1.5rem;
`;

export const SkillsCardPlan = styled.h3`
	margin-bottom: 0.25rem;
	font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  text-align: center;
  padding-bottom: 1rem;
`;

export const SkillsCardPrices = styled.ul`
	display: flex;
	flex-direction: column;
	margin: 1rem 0 0;
	list-style: none;
`;

export const SkillsCardFeature = styled.li`
	display: flex;
	margin-bottom: 1rem;
	font-size: 0.9rem;
`;
