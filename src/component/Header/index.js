import React from 'react';
import styled from "styled-components";

const Wrapper = styled.header`
  width: 100%;
  min-height: 75px;
  display: flex;
  justify-content: center;
  background: #FFF;  
  box-shadow: 0px 0px 10px 0px rgba(170,170,170,0.5);
`;

const Header = (props) => {
  return (<Wrapper>{props.children}</Wrapper>);
}

export default Header;