import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
	XContentSec,
	XContentRow,
  XContentRowDetail,
  XContentColumn,
	XTextWrapper,
	XTopLine,
	XTitle,
  XSubtitle,
	XContentButton,
	XImgWrapper,
	XImg,
  DetailParagraph,
  DetailList
} from './ServiceDetailStyles';

const ServiceDetail = ({
	element,
	primary,
	text,
	headline,
	description,
  fullDescription,
	buttonLabelToOpen,
  buttonLabelToClose,
  imgSmall,
	img,
  imgBig,
	alt,
	backgroundColor,
	inverse,
	reverse,
	index
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

  const [isDetailDisplaied, setIsDetailDisplaied] = useState("none");
  const [buttonName, setButtonName] = useState(buttonLabelToOpen);

  const toggleDetail = () => {
    setIsDetailDisplaied(isDetailDisplaied === "none" ? "block" : "none");
    setButtonName(isDetailDisplaied === "none" ? buttonLabelToClose : buttonLabelToOpen);
  }

  useEffect(() => {
    setButtonName(isDetailDisplaied === "block" ? buttonLabelToClose : buttonLabelToOpen);
  },[buttonLabelToOpen]);

	return (
		<XContentSec ref={ref} className={element} isDetailDisplaied={isDetailDisplaied}>
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
              transition={transition}
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
              onClick={() => toggleDetail()}
            >
              {buttonName}
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
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.5 }}
                className="imgSmall"
              />
              <XImg
                src={img}
                alt={alt}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.5 }}
                className="img"
              />
              <XImg
                src={imgBig}
                alt={alt}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.5 }}
                className="imgBig"
              />
            </XImgWrapper>
          </Tilt>
        </XContentColumn>
      </XContentRow>
      <XContentRowDetail style={{display: isDetailDisplaied}} >
        <DetailParagraph className="duration">{fullDescription?.durationLabel !== "" ? fullDescription?.durationLabel + fullDescription?.duration : ""}</DetailParagraph>
        <DetailParagraph>{fullDescription?.sectionsLabel !== "" ? fullDescription?.sectionsLabel : ""}</DetailParagraph>
        <DetailList>
          {fullDescription?.sections.map((section, index) => (
            section !== "*" ? <li key={index}>{section}</li> : "\n"
          ))}
        </DetailList>
      </XContentRowDetail>
		</XContentSec>
	);
};

export default ServiceDetail;
