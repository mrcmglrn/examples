import styled from 'styled-components';
import { motion } from 'framer-motion';

export const XContentSec = styled.div`
	padding: 3rem 0;
	border-bottom: ${({ isDetailDisplaied }) => (isDetailDisplaied == "block" ? '1px solid #999' : '')};
	margin-bottom: ${({ isDetailDisplaied }) => (isDetailDisplaied == "block" ? '1rem' : '')};

	@media screen and (max-width: 960px) {
		padding: 2rem;
	}
`;

export const XContentRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
	justify-content: space-around;
	white-space: pre-line;

	@media screen and (max-width: 960px) {
		flex-direction: column-reverse;
	}
`;

export const XContentRowDetail = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
	justify-content: space-around;
	padding: 3rem 6rem 0;
	white-space: pre-line; 

	line-height: 1.35rem;
	font-size: clamp(1rem, 1.35vw, 1.15rem);

	@media screen and (max-width: 960px) {
		flex-direction: column-reverse;
		padding: 2rem 1rem 0;
	}
`;

export const XContentColumn = styled(motion.div)`
	flex: 1;
	z-index: 10;
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 960px) {
		max-width: 100% !important;
		flex-basis: 100%;
		justify-content: center;
		align-items: center;
	}
`;

export const XTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: ${({ reverse }) => (reverse ? 'flex-end' : 'flex-start')};
	margin-right: ${({ reverse }) => (reverse ? '0' : '2rem')};
	margin-left: ${({ reverse }) => (reverse ? '2rem' : '0')};

	@media screen and (max-width: 960px) {
		padding: 2rem 0 0;
		> h1, p {
			text-align: center;
		}
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 0;
		margin-left: 0;
	}

	> img {
		width: 20rem;
	}
`;

export const XContentButton = styled(motion.button)`
	height: 3rem;
	padding: 0.8rem 2rem;
	font-weight: 700;
	font-size: 1.1rem;
	border-radius: 1.5rem;
	border: none;
	background: ${({ background }) => (background ? background : 'yellow')};
	cursor: pointer;
	color: white;

	&:hover {
		box-shadow: 0 0 1.5rem 0.5rem #333;
		transition: box-shadow 0.4s ease-in;
	}
`;

export const XTopLine = styled(motion.div)`
	font-size: 0.9rem;
	line-height: 1rem;
	font-weight: 700;
	margin-bottom: 1.3rem;
	color: #999;
`;

export const XTitle = styled(motion.h2)`
	margin-bottom: 1.5rem;
	font-size: 1.25rem;
	font-size: clamp(1.25rem, 1.8vw, 1.5rem);
	font-weight: 600;

	@media screen and (max-width: 960px) {
		text-align: center;
	}
`;

export const XSubtitle = styled(motion.p)`
	max-width: 30rem;
	margin-bottom: 2rem;
	line-height: 1.5rem;
	font-size: clamp(1rem, 1.45vw, 1.25rem);
`;

export const XImgWrapper = styled(motion.div)`
	display: flex;
	justify-content: ${({ imgStart }) => (imgStart ? 'flex-start' : 'flex-end')};
	height: 20rem;
	max-width: 100%;
	justify-content: center;
	box-shadow: 0 0 2rem 0.25rem #ccc;
	border-radius: 1rem;
	position: relative;
	background: ${({ background }) => (background ? background : 'yellow')};
	
	&:before {
		width: 100%;
		height: 100%;
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		background-size: 100% auto;
		object-fit: cover;
	}
`;

export const XImg = styled(motion.img)`
	padding-right: 0;
	border: 0;
	vertical-align: middle;
	display: inline-block;
	object-fit: cover;
	height: 20rem;
	max-width: 100%;
	z-index: 1;

	&.imgSmall {
		display: none;
	}

	&.img {
		display: none;
	}

	&.imgBig {
		display: block;
	}

	@media screen and (max-width: 1200px) {
		&.imgSmall {
			display: none;
		}
	
		&.img {
			display: block;
		}
	
		&.imgBig {
			display: none;
		}
	}

	@media screen and (max-width: 600px) {
		&.imgSmall {
			display: block;
		}
	
		&.img {
			display: none;
		}
	
		&.imgBig {
			display: none;
		}
	}
`;

export const DetailParagraph = styled.p`
	padding-bottom: 0.75rem;

	&.duration {
		padding-bottom: 1.5rem;
	}
`;

export const DetailList = styled.ul`
	padding-left: 1.5rem;
`;
