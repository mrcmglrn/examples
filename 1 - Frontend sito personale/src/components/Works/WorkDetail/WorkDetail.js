import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
	XContentSec,
	XContentRow,
  XContentColumn,
	XTextWrapper,
	XTopLine,
	XTitle,
  XSubtitle,
	XContentButton,
  XButtonLinkTo,
	XImgWrapper,
	XImg
} from './WorkDetailStyles';

const WorkDetail = ({
	element,
	primary,
	text,
	headline,
	description,
	buttonLabel,
  url,
	img,
  imgSmall,
	alt,
	backgroundColor,
	inverse,
	reverse,
	id
}) => {
	const initial = { opacity: 0, y: 30 };
	const transition = { delay: 0.3, duration: 0.6 };
	const animation = useAnimation();

	const { ref, inView } = useInView({
		threshold: 0.2,
	});

	useEffect(() => {
		if (inView) {
			animation.start({
				opacity: 1,
				y: 0,
			});
		}
	}, [inView, animation]);

	return (
		<XContentSec ref={ref} className={element}>
      <XContentRow reverse={reverse}>
        <XContentColumn>
          <XTextWrapper reverse={reverse}>
            <XTopLine
              initial={initial}
              transition={{ delay: 0.3, duration: 0.6 }}
              animate={animation}
            >
              {text}
            </XTopLine>
            <XTitle
              initial={initial}
              transition={{ delay: 0.45, duration: 0.6 }}
              animate={animation}
              inverse={inverse}
            >
              {headline}
            </XTitle>
            <XSubtitle
              initial={initial}
              transition={{ delay: 0.7, duration: 0.6 }}
              animate={animation}
              inverse={inverse}
            >
              {description}
            </XSubtitle>

            <XContentButton
              initial={initial}
              transition={{ delay: 1, duration: 0.6 }}
              animate={animation}
              primary={primary}
              background={backgroundColor}
            >
              <XButtonLinkTo href={url} target="_blank">
                {buttonLabel}
              </XButtonLinkTo>
            </XContentButton>
          </XTextWrapper>
        </XContentColumn>
        <XContentColumn
          initial={initial}
          transition={transition}
          animate={animation}
        >
          <Tilt className="Tilt" options={{ max: 20, scale: 1.01, speed: 200 }}>
            <XImgWrapper background={backgroundColor}>
              <XImg
                src={imgSmall}
                alt={alt}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="imgSmall"
              />
              <XImg
                src={img}
                alt={alt}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="img"
              />
            </XImgWrapper>
          </Tilt>
        </XContentColumn>
      </XContentRow>
		</XContentSec>
	);
};

export default WorkDetail;
