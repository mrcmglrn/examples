import React, { useState, useEffect } from 'react';
import {
	FaqsSection,
  FaqsTitle,
  FaqsContent,
  FaqsColumn,
	Faq,
	FaqQuestion,
	FaqAnswer,
  FaqAnswerList
} from './FaqsStyles';

const Faqs = ({ faqsParent }) => {

  const [faqs, setFaqs] = useState({});
  const [items, setItems] = useState([]);

  // [faqsParent] ==> Whenever the "faqsParent" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (faqsParent.body != null) {
      setFaqs(faqsParent.body.faqs);
      setItems(faqsParent.body.faqs.items);
    }
  }, [faqsParent]);

  const toggleFAQ = (index) => {
    setItems(
      items.map((element, i) => {
        if (i === index) {
          element.open = !element.open;
        } else {
          element.open = false;
        }

        return element;
      })
    );
  };

  return (
    <FaqsSection>
      <FaqsColumn>
        <FaqsTitle>
          {faqs.title}
        </FaqsTitle>

        <FaqsContent>
          {items.map((element, index) => (
            <Faq key={index}  onClick={() => toggleFAQ(index)}>
              <FaqQuestion open={element.open}>{element.question}</FaqQuestion>
              <FaqAnswer open={element.open}>
                {element.answer}
                
                <FaqAnswerList>
                  {element.subAnswers?.map((subAnswer, index) => (
                    subAnswer !== "*" ? <li key={index}>{subAnswer}</li> : "\n"
                  ))}
                </FaqAnswerList>
              </FaqAnswer>
            </Faq>
          ))}
        </FaqsContent>
      </FaqsColumn>
    </FaqsSection>
  )
}

export default Faqs;