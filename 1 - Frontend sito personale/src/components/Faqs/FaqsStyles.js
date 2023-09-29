import styled from 'styled-components';
import { Section } from '../../globalStyles';

export const FaqsSection = styled(Section)`
  padding: 2rem 20% 3rem;

  @media screen and (max-width: 960px) {
    padding: 2rem 10%;
  }
`;

export const FaqsColumn = styled.div`
  display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-items: center;
	width: 100%;
`;

export const FaqsTitle = styled.h2`
	font-size: clamp(1.875rem, 2.7vw, 2.25rem);
	line-height: 1;
	font-weight: 500;
	text-align: center;
	padding-bottom: 2rem;
`;

export const FaqsContent = styled.div`
  width: 100%;
`;

export const Faq = styled.div`
  margin: 1.5rem;
  padding: 1rem;
  border-radius: 1.5rem;
  box-shadow: 0.25rem 0.25rem 0.75rem rgb(102, 102, 102);
  cursor: pointer;
  font-size: clamp(1rem, 1.45vw, 1.25rem);
`;

export const FaqQuestion = styled.div`
  position: relative;
  padding-right: 2rem;
  margin-bottom: ${({ open }) => (open ? "1rem" : 0)};
  transition: all 0.25s ease;

  &:after {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateX(40%) translateY(-40%);
    width: 2rem;
    height: 2rem;
  }

  ${({ open }) => (open ?
    `&:after {
      content: "-";
    }`
    :
    `&:after {
      content: "+";
    }`
  )};
`;

export const FaqAnswer = styled.div`
  opacity: ${({ open }) => (open ? 1 : 0)};
  max-height: ${({ open }) => (open ? "100%" : 0)};
  overflow: hidden;
  background: #636363;
  color: #efefef;
  margin: ${({ open }) => (open ? "0.5rem" : 0)};
  padding: ${({ open }) => (open ? "1rem" : 0)};
  border-radius: 1.5rem;
  white-space: pre-line;
`;

export const FaqAnswerList = styled.ul`
	padding-left: 1.5rem;
`;
