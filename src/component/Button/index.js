
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  border: solid 1px #2f5c9c;  
  padding: 10px;  
  border-radius: 4px;  
  color: #2f5c9c;
  background: none;
  cursor: pointer;
  font-size: 14px;
  .material-icons {
    cursor: pointer;
    margin-left: 10px;    
  }
  &:disabled {
    color: #eaeef5;
    border-color: #eaeef5;
  }
  `;

const Button = (props) => {
  return (
    <StyledButton
      type={props.type}
      onClick={props.onClick}
      width={props.width}
      size={props.size}
      color={props.color}
      variant={props.variant}
      disabled={props.disabled}
      className={props.className}
      iconStart={props.iconStart}
      iconEnd={props.iconEnd}
    >
      {Children.toArray(props.children)}
    </StyledButton>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

export default Button;