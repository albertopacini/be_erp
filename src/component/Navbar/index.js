import React from 'react';
import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  font-family: 'Montserrat', sans-serif;
`;

const Nav = (props) => {
  return (<Wrapper>{props.children}</Wrapper>);
}

export default Nav;