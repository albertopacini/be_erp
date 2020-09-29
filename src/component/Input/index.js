import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const InputField = styled.input`    
  margin: 0px;
  border: solid 1px transparent;
  border-radius: 4px;  
  padding: 10px;  
  font-size: 14px;
  border: 1px solid #eaeef5; 
  box-shadow: 0px 0px 10px 0px rgba(170,170,170,0.5);
`;

const Wrapper = styled.div`
  width: ${(props) => props.width ? props.width : '100%'};
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


const Input = (props) => {
  const [value, setValue] = useState('');

  const changeHandler = (ev) => {
    setValue(ev.target.value);
    props.onChange && props.onChange(ev.target.value);
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value])

  return (
    <Wrapper width={props.width}>
      <Label htmlFor={props.id}>{props.label}:</Label>
      <InputField
        onChange={changeHandler}
        id={props.id}
        name={props.name}
        type={props.type}
        value={value || ''}
        placeholder={props.placeholder}
        autocomplete={props.autocomplete}
      />
    </Wrapper>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autocomplete: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;