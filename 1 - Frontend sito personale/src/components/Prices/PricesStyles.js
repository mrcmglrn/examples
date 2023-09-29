import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const PricesSection = styled(Section)`
  padding: 2rem 3rem 3rem;

  @media screen and (max-width: 960px) {
    padding: 2rem 1.5rem;
  }
`;

export const PricesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Title = styled.h2`
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;
	padding-bottom: 3rem;

	@media screen and (max-width: 960px) {
		padding-bottom: 1rem;
  }
`;

export const PricesCards = styled.div`
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

export const PricesCard = styled.div`
	&:hover {
		transform: scale(1.1);
		transition: all 0.4s ease-out;
	}
`;

export const PricesCardInfo = styled.div`
	display: flex;
	flex-direction: column;
	box-shadow: 0.25rem 0.25rem 0.75rem rgb(102, 102, 102);
	width: clamp(16rem, 22vw, 24rem);
	height: 100%;
	border-radius: 2.5rem;
	padding: 1.5rem;
	overflow: hidden;

	@media screen and (max-width: 960px) {
		margin: 2rem 0 0;
	}
`;

export const JobType = styled.div`
	height: 2rem;
	background: #007b5a;
	width: 8rem;
	text-align: center;
	font-size: 1rem;
	font-weight: 600;
	line-height: 2rem;
	color: #ffffff;
	transform: rotate(-45deg);
	position: relative;
	top: -0.4rem;
	left: -3.4rem;
	box-shadow: inset 0px 0px 0px 4px rgba(57, 202, 152, 0.85);
`;

export const PricesRepositioning = styled.div`
	margin-top: -1.5rem;
`;

export const FeatureImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;
`;

export const ImageCharacter = styled.img`
	border: 0.05rem solid #999;
	border-radius: 1.5rem;
	width: 5rem;
`;

export const PricesCardPlan = styled.h3`
	margin-bottom: 1rem;
	font-size: clamp(1.25rem, 1.75vw, 1.5rem);
	text-align: center;
`;

export const PricesCardText = styled.p`
	margin: 0.5rem 0 0.25rem;
	font-size: clamp(1rem, 1.45vw, 1.25rem);
`;

export const PricesCardPrices = styled.ul`
	display: flex;
	flex-direction: column;
	margin: 1rem 0 0;
	list-style: none;
`;

export const PricesCardFeature = styled.li`
	display: flex;
	margin-bottom: 1rem;
	font-size: 0.9rem;

	&:before {
		content: '►';
		margin-right: 0.5rem;
		font-size: 0.8rem;
	}
`;
