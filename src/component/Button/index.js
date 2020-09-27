
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${props => props.width};  
  font-size: '1em';
  padding: '1em';
  border-radius: '4px';
  cursor: pointer;
  outline: none;`;

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
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
  color: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  iconStart: PropTypes.string,
  iconEnd: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  size: 'normal',
  color: 'primary',
  variant: 'normal',
  disabled: false,
};






export default Button;