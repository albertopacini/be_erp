import React from 'react';
import styled from "styled-components";
import Logo from '../../svg/logo.svg';

const Wrapper = styled.img`  
  height: 75px;  
`;

const Header = (props) => {
  return (<Wrapper src={Logo} alt={props.alt || 'Be demo'}>{props.children}</Wrapper>);
}

export default Header;