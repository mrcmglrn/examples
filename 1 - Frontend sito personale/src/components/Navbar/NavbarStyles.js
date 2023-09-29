import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Section } from '../../globalStyles';

export const NavbarSection = styled(Section)`
	min-height: 9vh;
	padding: 0rem;
`;

export const Nav = styled.nav`
	background-image: linear-gradient(45deg, #007b5a, #39ca98);
	background-size: cover;
	background-attachment: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: clamp(1.25rem, 1.65vw, 1.4rem);
	position: fixed;
	top: 0;
	z-index: 99;
	width: 100%;
`;

export const NavbarContainer = styled(Container)`
	display: flex;
	justify-content: start;
	margin: 1.5rem;
`;

export const NavLogo = styled(Link)`
	justify-self: flex-start;
	cursor: pointer;
	text-decoration: none;
	font-size: 2rem;
	display: flex;
	align-items: center;
	z-index: 99;
`;

export const NavIcon = styled.img`
	width: 3.5rem;
`;

export const MobileIcon = styled.div`
	display: none;
	z-index: 99;
	margin: 0.75rem 0rem;

	@media screen and (max-width: 960px) {
		color: #636363;
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 60%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

export const NavMenu = styled.ul`
	display: flex;
	align-items: center;
	list-style: none;
	text-align: center;
	width: 100%;

	@media screen and (max-width: 960px) {
		flex-direction: column;
		width: 100%;
		height: 100vh;
		position: fixed;
		padding: 6rem 0;
		top: 0;
		left: 0;
		opacity: ${({ show }) => (show ? 1 : 0)};
		visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
		transform: translateY(${({ show }) => (show ? '0' : '-10px')});
		transition: opacity 0.4s ease;
		background-image: linear-gradient(45deg, #007b5a, #39ca98);
		background-size: cover;
		background-attachment: fixed;
	}

	> li:first-child {
		margin-left: auto;
	}
`;

export const NavItem = styled.li`
	cursor: pointer;

	@media screen and (max-width: 960px) {
		width: 100%;
		display: flex;
		justify-content: center;

		&:hover {
			border: none;
		}
	}
`;

export const NavLinks = styled(Link)`
	color: #efefef;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0.5rem 1rem;
	height: 100%;

	&:hover {
		border-bottom: none;
		color: #636363;
		transition: all 0.4s ease;
	}

	@media screen and (max-width: 960px) {
		text-align: center;
		padding: 2rem;
		width: 100%;
		display: table;

		&:hover {
			border-bottom: none;
			color: #636363;
			transition: all 0.4s ease;
		}
	}
`;

export const NavButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3rem;
	padding: 0.8rem 2rem;
	font-weight: 600;
	font-size: 1.1rem;
	border-radius: 1.5rem;
	border: none;
	background: linear-gradient(150deg, #ccc -10%, #636363);
	cursor: pointer;
	margin: 0.5rem 1rem;

	&:hover {
		box-shadow: 0 0 2rem 0.75rem #efefef;
		transition: box-shadow 0.4s ease-in;
	}

	@media screen and (max-width: 960px) {
		align-items: center;
		margin: 1rem 1rem;
	}
`;
