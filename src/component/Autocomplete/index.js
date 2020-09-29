import React, { useState } from 'react';
import styled from "styled-components";
import Input from "../Input";
import PropTypes from 'prop-types';

const Wrapper = styled.div`  
  display:flex;
  flex: 1;
  flex-direction:column;
  position: relative;  
  label {
    display:block;
  }
`;

const AutocompleteWrapper = styled.div`  
  position: absolute;
  border: 1px solid #eaeef5;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px; 
  overflow: auto;
  background-color: #fff;
`;

const AutocompleteItem = styled.div`  
  padding: 10px;
  cursor: pointer;
  background-color: #fff; 
  border-bottom: 1px solid #eaeef5; 
`;

const Autocomplete = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  const changeHandler = (value) => {
    setValue(value);
    fetch(`${process.env.REACT_APP_API_HOST}/autocomplete/${props.source}?q=${value}`)
      .then(response => response.json())
      .then(data => setSuggestions(data));
  }

  const chooseValueHandler = (item) => {
    props.onChange && props.onChange(props.source, item);
    setSuggestions([]);
    setValue('');
  };

  return (
    <Wrapper>
      <Input
        id={props.id}
        label={props.label}
        onChange={changeHandler}
        name={props.name}
        type={props.type}
        value={value}
        placeholder={props.placeholder}
        autocomplete={props.autocomplete}
      />
      <AutocompleteWrapper>
        {suggestions.map((i, k) => (
          <AutocompleteItem
            key={`item_${k}`}
            onClick={() => chooseValueHandler(i)}>{i.label}
          </AutocompleteItem>
        ))}
      </AutocompleteWrapper>
    </Wrapper>
  );
}

Autocomplete.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  source: PropTypes.string,
  autocomplete: PropTypes.string,
  onChange: PropTypes.func,
};

export default Autocomplete;