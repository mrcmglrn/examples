import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';

import { 
	SelStyled
} from './OptionsStyles';

const Options = ({ languageParent, navbarParentByLanguage, setLanguageParent, setShowParent }) => {

  const [options, setOptions] = useState(undefined);
	const { SingleValue, Option } = components;

  // [navbarParentByLanguage] ==> Whenever the "navbarParentByLanguage" state variables change...
  useEffect(() => {
    populateOptions();
  }, [navbarParentByLanguage]);

  // ... the "currentObjectByLanguage" status variable is updated.
  const populateOptions = () => {
    const flagsArray = navbarParentByLanguage.body?.flags;
    //console.log("JSON flagsArray: "+JSON.stringify(flagsArray));
    setOptions(flagsArray);
  }

  const IconSingleValue = (props) => (
			<SingleValue {...props}>
				<img src={props.data.src} style={{ height: '1rem', width: '1.5rem' }} />
			</SingleValue>
  );

  const IconOption = (props) => (
			<Option {...props}>
				<img src={props.data.src} style={{ height: '1rem', width: '1.5rem' }} />
				{props.data.title}
			</Option>
  );

	const customStyles = {
    option: (provided) => ({
			...provided,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			background: 'transparent',
			color: '#333',
			cursor: 'pointer',
			'&:hover': {
				backgroundColor: '#999'
			}
    }),
    singleValue: (provided) => ({
			...provided,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			background: 'transparent',
			color: '#000'
    }),
		control: (provided) => ({
			...provided,
			margin: '0.1rem 0.4rem 0.1rem 1rem',
			background: '#efefef',
			cursor: 'pointer',
			border: provided.isFocused ? "0.1rem solid #efefef" : "0.1rem solid #efefef",
			boxShadow: provided.isFocused ? "0 0 1rem 0.5rem #636363" : "none",
			"&:hover": {
				border: '0.1rem solid #efefef',
				boxShadow: '0 0 1rem 0.5rem #636363',
				transition: 'box-shadow 0.4s ease-in'
			}
		}),
		menu: (provided) => ({
			...provided,
			background: '#efefef',
			width: '5.2rem',
			margin: '0.55rem 1.05rem',
			fontSize: '1rem'
		})
	}

  return (
    <>
			<SelStyled>
				<Select options={options}
								value={options?.filter((option) => option.key == languageParent)}
								components={{SingleValue: IconSingleValue, Option: IconOption}}
								onChange={(choice) => (setLanguageParent(choice.key), setShowParent(false)) }
								styles={customStyles}
				/>
			</SelStyled>
    </>
  )
}

export default Options;