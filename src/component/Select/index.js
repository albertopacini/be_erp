import React, { useState } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';
import Input from "../Input";

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

const Label = styled.label`  
  margin: 5px 0px;
  color: #2f5c9c;
`;

const SelectedWrapper = styled.div`    
  display:flex;
  flex: 1;
  flex-direction:column;
  position: relative;    
  label {
    display:block;
  }
`;

const SelectedValue = styled.div`  
  border: solid 1px transparent;
  border-radius: 4px;  
  padding: 10px;  
  font-size: 14px;
  border: 1px solid #eaeef5; 
  box-shadow: 0px 0px 10px 0px rgba(170,170,170,0.5);
  display:flex;
  align-items: center;
  justify-content:space-between;
  font-size: 14px;
  .material-icons {
    cursor: pointer;
    font-size: 14px;
  }
`;

const Select = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(null);

  const changeHandler = (value) => {
    setValue(value);
    fetch(`${process.env.REACT_APP_API_HOST}/autocomplete/${props.source}?q=${value}`)
      .then(response => response.json())
      .then(data => setSuggestions(data));
  }

  const resetHandler = () => {
    setSuggestions([]);
    setValue('');
  };

  const resetSelectedValueHandler = () => {
    setSelected(null);
    setValue('');
    props.onChange && props.onChange(props.source, '');
  };

  const chooseValueHandler = (item) => {
    setSelected(item)
    props.onChange && props.onChange(props.source, item);
    resetHandler();
  };

  return (
    <Wrapper>
      {selected &&
        <SelectedWrapper>
          <Label>{props.label}:</Label>
          <SelectedValue>
            <span>{selected.label}</span>
            <span onClick={resetSelectedValueHandler} className="material-icons">clear</span>
          </SelectedValue>
        </SelectedWrapper>}
      {!selected &&
        <Input
          id={props.id}
          label={props.label}
          onChange={changeHandler}
          name={props.name}
          type={props.type}
          value={value}
          placeholder={props.placeholder} />
      }
      <AutocompleteWrapper>
        {suggestions.map((i, k) => (
          <AutocompleteItem
            key={`item_${k}`}
            onClick={() => chooseValueHandler(i)}>{i.label}</AutocompleteItem>
        ))}
      </AutocompleteWrapper>
    </Wrapper>
  );
}

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  source: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;