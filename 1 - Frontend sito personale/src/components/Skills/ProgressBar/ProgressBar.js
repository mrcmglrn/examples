import React from 'react';

import { 
  PBStyle,
  PBContainer,
  PBFiller, 
  PBLabel 
} from './ProgressBarStyles';

const ProgressBar = ({ title, description, level }) => {
  
    return (
			<PBStyle>
        {title}
				<PBContainer title={description}>
					<PBFiller level={level}>
						<PBLabel>
              {level}%
            </PBLabel>
					</PBFiller>
				</PBContainer>
			</PBStyle>
    );
  };
  
  export default ProgressBar;