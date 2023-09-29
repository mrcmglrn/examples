import styled from 'styled-components';

export const PBStyle = styled.div`
	width: 100%;
`;

export const PBContainer = styled.div`
	height: 1.1rem;
	background-color: #dfdfdf;
	border-radius: 3rem;
	margin: 0 0 0.5rem;
`;

export const PBFiller = styled.div`
	height: 100%;
	width: ${(props) => props.level}%;
	background-color: #24aa79;
	border-radius: inherit;
	text-align: center;
`;

export const PBLabel = styled.span`
	font-size: 0.65rem;
	font-weight: bold;
	color: #efefef;
`;