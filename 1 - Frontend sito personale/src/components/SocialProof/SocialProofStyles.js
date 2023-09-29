import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const SocialProofSection = styled(Section)`



  display: none;








  padding: 2rem 3rem;

  @media screen and (max-width: 960px) {
    padding: 2rem 1.5rem;
  }
`;

export const SocialProofWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const HeadingHeading = styled.h1`
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 1.1;
  font-weight: 600;
  padding-bottom: 3rem;

  @media screen and (max-width: 960px) {
    padding-bottom: 1rem;
  }
`;

export const SocialProofCards = styled.div`
	display: flex;
	flex-flow: wrap;
	flex-direction: row;
	justify-content: space-around;
	align-items: stretch;
	width: 100%;

	@media screen and (max-width: 960px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
`;

export const SocialProofCard = styled.div`
	&:hover {
		transform: scale(1.1);
		transition: all 0.4s ease-out;
	}
`;

export const SocialProofCardInfo = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 0.25rem 0.25rem 0.75rem rgb(102, 102, 102);
	width: clamp(16rem, 22vw, 24rem);
	height: 100%;
	border-radius: 2.5rem;
	padding: 1.5rem;

	@media screen and (max-width: 960px) {
		margin: 2rem 0 0;
	}
`;

export const SocialProofImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;
`;

export const SocialProofCardPlan = styled.h3`
	margin-bottom: 0.25rem;
	font-size: 1.5rem;
`;

export const SocialProofCardText = styled.p`
	font-size: 1rem;
	margin: 0.5rem 0;
`;

export const SocialProofCardSocialProof = styled.ul`
	display: flex;
	flex-direction: column;
	margin: 1rem 0 0;
	list-style: none;
`;

export const SocialProofCardFeature = styled.li`
	display: flex;
	margin-bottom: 1rem;
	font-size: 0.9rem;

	&:before {
		content: '►';
		margin-right: 0.5rem;
	}
`;
