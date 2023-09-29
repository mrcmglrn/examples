import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const ContactFormSection = styled(Section)`
	padding: 3rem 0 0;
`;

export const ContactFormContent = styled.div`
	width: 100%;
	padding: 0 1rem;
	z-index: 10;
	position: relative;
`;

export const ContentRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;

	&.button {
		justify-content: right;

		@media screen and (max-width: 720px) {
			justify-content: center;
		}
	}

	&.messageError {
		justify-content: left;

		@media screen and (max-width: 720px) {
			padding-bottom: 1rem;
		}
	}
`;

export const ContentColumn = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;

	&.responseOk {
		font-size: 1.25rem;
		padding: 2rem 0 3rem;
	}

	@media screen and (max-width: 720px) {
		flex-direction: column;
	}
`;

export const Title = styled.h2`
	margin: 1rem 0rem 2rem;
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;
`;

export const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const ContentInput = styled.input`
	margin: 1rem 2rem;
	height: 2rem;
	width: 30vw;
	font-size: 1rem;

	&.inputError {
		border: 1px solid red;
	}

	&.hidden {
		visibility: hidden;

		@media screen and (max-width: 720px) {
			display: none;
		}
	}

	&:focus::placeholder {
		visibility: hidden;
		border: 1px solid #ccc;
	}

	@media screen and (max-width: 720px) {
		width: 60vw;
	}
`;

export const ContentArea = styled.textarea`
	margin: 1rem 2rem;
	height: 10rem;
	width: 100%;
	font-size: 1rem;

	&.inputError {
		border: 1px solid red;
	}

	&:focus::placeholder {
		visibility: hidden;
		border: 1px solid #ccc;
	}
`;

export const Warning = styled.span`
  color: red;
  font-size: 0.75rem;
	padding-left: 2rem;

	&.input {
		border: 1px solid red;
	}
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	padding: 3rem 3rem 2rem 0;

	@media screen and (max-width: 720px) {
		padding: 2rem 0;
	}
`;

export const ContactFormButton = styled.button`
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
