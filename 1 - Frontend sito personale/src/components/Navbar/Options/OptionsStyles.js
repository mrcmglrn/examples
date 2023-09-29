import styled from 'styled-components';

// Serve per centrare la SELECT rispetto ai LINK del menu.
export const SelStyled = styled.li`
	@media screen and (max-width: 960px) {
		padding: 2rem 0rem;
	}
`;

// PER ADESSO NON HO TROVATO UN MODO PER FARLI FUNZIONARE DA QUI!
/*
export const OptStyled = styled.option`
	display: flex,
	flexDirection: column,
	alignItems: center,
	background: transparent,
	color: #000,
	cursor: pointer,
	&:hover: {
		backgroundColor: #ccc
	}
`;

export const SinValStyled = styled.singleValue`
	display: flex,
	flexDirection: row,
	alignItems: center,
	background: transparent,
	color: #000
`;

export const ConStyled = styled.control`
	margin: 0 1rem,
	cursor: pointer,
	border: provided.isFocused ? 0.1rem solid #999 : 0.1rem solid #999,
	boxShadow: provided.isFocused ? 0 0 1rem #636363 : none,
	&:hover: {
		border: 0.1rem solid #999,
		boxShadow: 0 0 1rem #636363
	}
`;

export const MenuStyled = styled.menu`
	width: 5.125rem,
	margin: 0.55rem 1.1rem
`;
*/
