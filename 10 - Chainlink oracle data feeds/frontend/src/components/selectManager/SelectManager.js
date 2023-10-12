import React from 'react';
import Select, { components } from 'react-select';
import {
} from './SelectManagerStyles';

const SelectManager = ({ options, selectedOption, networkId, setNetworkId }) => {
  const { SingleValue, Option } = components;

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img src={props.data.image} style={{ height: '1.5rem', width: '2rem' }} />
    </SingleValue>
  );

  const IconOption = (props) => (
      <Option {...props}>
        <img src={props.data.image} style={{ height: '1.5rem', width: '2rem' }} />
        {props.data.label}
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
      margin: '0.275rem 1rem',
      padding: '0.2rem 0',
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
      margin: '0.55rem 0.05rem',
      fontSize: '1rem',
      textAlign: 'center'
    })
  }

  return (
    <div id="selectManager" className="Select">
      <Select options={options}
              onChange={(choice) => setNetworkId(choice.value)}
              components={{SingleValue: IconSingleValue, Option: IconOption}}
              defaultValue={options.filter((option) => option.value === networkId)}
              value={selectedOption}
              styles={customStyles}
      />
    </div>
  );
}

export default SelectManager;
