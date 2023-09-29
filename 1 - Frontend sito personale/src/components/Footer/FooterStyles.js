import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const FooterSection = styled(Section)`
	background-image: linear-gradient(45deg, #007b5a, #39ca98);
	padding: 3rem 2rem 2rem;
`;

export const FooterRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%;

	&.footerContents {
		padding: 0 1rem 1rem;
	}

	&.footerRights {
		border-top: 2px solid #636363;
		padding: 1.5rem 0 0;
		justify-content: center;
		font-size: 0.9rem;
	}

	&.footerContactElement {
		justify-content: start;

		@media screen and (max-width: 960px) {
			flex-direction: row;
			justify-content: center;
		}
	}

	@media screen and (max-width: 960px) {
		flex-direction: column;
		align-items: center;
	}
`;

export const FooterColumn = styled.div`
	display: flex;
	flex-direction: column;

	&.footerSocial {
		flex-direction: row;
	}
`;

export const FooterIcon = styled.p`
	font-size: 1.2rem;
	padding: 0.5rem 0;
`;

export const FooterText = styled.p`
	font-size: clamp(1rem, 1.8vw, 1.1rem);
	padding: 0.35rem 1rem 0.65rem;
`;

export const FooterSocialIcon = styled.a`
	color: #efefef;
	font-size: 1.8rem;
	padding-left: 2rem;

	&:hover {
		color: #636363;
		transition: 0.4s ease-out;
	}

	@media screen and (max-width: 960px) {
		align-items: center;
		padding: 1.5rem 1rem 0;
	}
`;
