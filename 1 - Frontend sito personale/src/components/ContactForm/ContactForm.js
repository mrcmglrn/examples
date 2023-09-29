import React, { useState, useEffect } from 'react';
import {
	ContactFormSection,
  ContactFormContent,
	ContentRow,
	ContentColumn,
  Title,
  ContentGroup,
  ContentInput,
  ContentArea,
  Warning,
	ButtonContainer,
	ContactFormButton
} from './ContactFormStyles';

// Information rendering & apply CSS 
const Contact = ({ contactParentByLanguage }) => {

  const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL

  const [contact, setContact] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // [contactParentByLanguage] ==> Whenever the "contactParentByLanguage" state variable change...
  useEffect(() => {
    // ... after it has been populated...
    if (contactParentByLanguage.body != null)
      setContact(contactParentByLanguage.body);
  }, [contactParentByLanguage]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [object, setObject] = useState('');
  const [message, setMessage] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [objectError, setObjectError] = useState('');
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    if (firstName != '') 
      validateFirstName();
  }, [firstName]);

  useEffect(() => {
    if (lastName != '') 
      validateLastName();
  }, [lastName]);

  useEffect(() => {
    if (email != '') 
      validateEmail();
  }, [email]);

  useEffect(() => {
    if (phone != '') 
      validatePhone();
  }, [phone]);

  useEffect(() => {
    if (object != '') 
      validateObject();
  }, [object]);

  useEffect(() => {
    if (message != '') 
      validateMessage();
  }, [message]);
  
  const validateFirstName = () => {
    let isValid = true;
  
    if (!firstName) {
      setFirstNameError(contact.firstNameError);
      isValid = false;
    } else {
      setFirstNameError('');
    }
  
    return isValid;
  };
  
  const validateLastName = () => {
    let isValid = true;
  
    if (!lastName) {
      setLastNameError(contact.lastNameError);
      isValid = false;
    } else {
      setLastNameError('');
    }
  
      return isValid;
    };
  
  const validateEmail = () => {
    let isValid = true; 
  
    if (!email) {
      setEmailError(contact.emailError);
      isValid = false;
    } else if (!/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.*([A-Za-z]{2,})$/.test(email)) {
      setEmailError(contact.emailExample);
      isValid = false;
    } else {
      setEmailError('');
    }
  
    return isValid;
  };
  
  const validatePhone = () => {
    let isValid = true; 
  
    if (phone && (!/^\d{4}-\d{5,}$/.test(phone))) {
      setPhoneError(contact.phoneExample);
      isValid = false;
    } else {
      setPhoneError('');
    }
  
    return isValid;
  };
  
  const validateObject = () => {
    let isValid = true; 
  
    if (!object) {
      setObjectError(contact.objectError);
      isValid = false;
    } else {
      setObjectError('');
    }
  
    return isValid;
  };
  
  const validateMessage = () => {
    let isValid = true; 
  
    if (!message) {
      setMessageError(contact.messageError);
      isValid = false;
    } else {
      setMessageError('');
    }
  
    return isValid;
  };

  const validateContent = () => {
    let isValid = true;
  
    isValid = validateFirstName();
    isValid = validateLastName();
    isValid = validateEmail();
    isValid = validatePhone();
    isValid = validateObject();
    isValid = validateMessage();

    return isValid;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (validateContent()) {
      let details = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        object: object,
        message: message
      };

      fetch(SERVER_API_URL+"/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed.');
        }
      })
      .then(data => {
        // Visualize confirmation
        console.log(data);
        setSubmitted(true);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });   
    }
  };

  return (
    <ContactFormSection>
      <ContactFormContent>
        <Title>
          {contact.title}
        </Title>
        
        <ContentRow>
          { submitted ?
            <ContentColumn className="responseOk">
              {contact.response}
            </ContentColumn>
          :
            <form noValidate onSubmit={handleSubmit}>
              <ContentRow>
                <ContentColumn>
                  <ContentGroup>
                    <ContentInput type="text" 
                                  id="firstName"
                                  placeholder={contact.firstName} 
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  className={firstNameError ? 'inputError' : ''}
                                  required />
                      {firstNameError && <Warning>{firstNameError}</Warning>}
                  </ContentGroup>
                  <ContentGroup>
                    <ContentInput type="text" 
                                  id="lastName" 
                                  placeholder={contact.lastName} 
                                  onChange={(e) => setLastName(e.target.value)}
                                  className={lastNameError ? 'inputError' : ''}
                                  required />
                      {lastNameError && <Warning>{lastNameError}</Warning>}
                  </ContentGroup>
                </ContentColumn>
              </ContentRow>
              <ContentRow>
                <ContentColumn>
                  <ContentGroup>
                    <ContentInput type="email" 
                                  id="email"
                                  placeholder={contact.emailAddress} 
                                  onChange={(e) => setEmail(e.target.value)}
                                  className={emailError ? 'inputError' : ''}
                                  required />
                    {emailError && <Warning>{emailError}</Warning>}
                  </ContentGroup>
                  <ContentGroup>
                    <ContentInput type="tel" 
                                  id="phone"
                                  placeholder={contact.phone} 
                                  onChange={(e) => setPhone(e.target.value)}
                                  className={phoneError ? 'inputError' : ''} />
                    {phoneError && <Warning>{phoneError}</Warning>}
                  </ContentGroup>
                </ContentColumn>
              </ContentRow>
              <ContentRow>
                <ContentColumn>
                  <ContentGroup>
                    <ContentInput type="text" 
                                  id="object"
                                  placeholder={contact.object} 
                                  onChange={(e) => setObject(e.target.value)}
                                  className={objectError ? 'inputError' : ''}
                                  required />
                    {objectError && <Warning>{objectError}</Warning>}
                  </ContentGroup>
                  <ContentInput className="hidden"
                                id="hidden" 
                                type="text" />
                </ContentColumn>
              </ContentRow>
              <ContentRow>
                <ContentArea id="message"
                             placeholder={contact.message} 
                             onChange={(e) => setMessage(e.target.value)}
                             className={messageError ? 'inputError' : ''}
                             required />
              </ContentRow>
              <ContentRow className="messageError">
                {messageError && <Warning>{messageError}</Warning>}
              </ContentRow>
              <ContentRow className="button">
                {contact.buttons?.map((element, index) => (
                  <ContentColumn key={index}>
                    <ButtonContainer>
                      <ContactFormButton type="submit">
                        {element.name}
                      </ContactFormButton>
                    </ButtonContainer>
                  </ContentColumn>
                ))}
              </ContentRow>
            </form>
          }
        </ContentRow>
      </ContactFormContent>
    </ContactFormSection>
  )
}

export default Contact;
