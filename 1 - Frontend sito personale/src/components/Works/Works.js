import React, { useState, useEffect } from 'react';
import WorkDetail from './WorkDetail/WorkDetail';
import {
	WorksSection,
  WorksContent,
	ContentRow,
	LeftContent,
	Title
} from './WorksStyles';

const Works = ({ worksParent }) => {

  const [works, setWorks] = useState({});

  // [worksParent] ==> Whenever the "worksParent" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (worksParent.body != null)
      setWorks(worksParent.body.works);
  }, [worksParent]);

  return (
    <WorksSection>
      <WorksContent>
        <Title>
          {works.title}
        </Title>

        <ContentRow>
          <LeftContent>
            {works.items?.map((work, index) => (
              <WorkDetail {...work} key={index} />
            ))}
          </LeftContent>
        </ContentRow>
      </WorksContent>
    </WorksSection>
  )
}

export default Works;