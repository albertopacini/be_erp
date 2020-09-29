import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const Wrapper = styled.nav`
  display: flex;
  font-family: 'Montserrat', sans-serif;
`;

const Nav = (props) => {
  return (<Wrapper>{props.children}</Wrapper>);
}


Nav.propTypes = {
  children: PropTypes.node
};

export default Nav;