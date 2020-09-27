import React, { useState } from 'react';
import styled from "styled-components";

const InputField = styled.input`    
  border: solid 1px transparent;
  border-radius: 4px;  
  padding: 10px;
  font-size: 14px;
  box-shadow: 0px 0px 10px 0px rgba(170,170,170,0.5);
`;

const Wrapper = styled.div`  
  display:flex;
  flex: 1;
  flex-direction:column;
  position: relative;  
  label {
    display:block;
  }
`;

const Label = styled.label`  
  margin: 5px 0px;
  color: #2f5c9c;
`;

const Autocomplete = styled.div`  
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
`;

const AutocompleteItem = styled.div`  
  padding: 10px;
  cursor: pointer;
  background-color: #fff; 
  border-bottom: 1px solid #eaeef5; 
`;

const Header = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  const changeHandler = (ev) => {
    setValue(ev.target.value);
    fetch(`${process.env.REACT_APP_API_HOST}/autocomplete/${props.source}?q=${ev.target.value}`)
      .then(response => response.json())
      .then(data => setSuggestions(data));
  }

  const resetHandler = () => {
    setSuggestions([]);
    setValue('');
  };

  const chooseValueHandler = (item) => {
    props.onChange && props.onChange(props.source, item);
    resetHandler();
  };

  return (
    <Wrapper>
      <Label htmlFor={props.id}>{props.label}:</Label>
      <InputField onChange={changeHandler} id={props.id} name={props.name} type={props.type} value={value} placeholder={props.placeholder} />
      <Autocomplete>
        {suggestions.map((i, k) => (
          <AutocompleteItem key={`item_${k}`} onClick={() => chooseValueHandler(i)}>{i.label}</AutocompleteItem>
        ))}
      </Autocomplete>
    </Wrapper>
  );
}

export default Header;