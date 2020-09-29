
import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;  
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  &:active {
    color: #2f5c9c;
  }
`;

const IconButton = (props) => {
  return (
    <StyledButton onClick={props.onClick}>
      <span className="material-icons">{props.icon}</span>
    </StyledButton>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default IconButton;