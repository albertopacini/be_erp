import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const Wrapper = styled.a`
  padding: 0px 25px;
  display:flex;
  align-items: center;
  text-decoration:none;
  color: ${props => props.active ? '#2f5c9c' : '#555e6b'};
  border-bottom: ${props => props.active ? 'solid 5px #2f5c9c' : 'none'};
  &:hover {
    color:#2f5c9c;
  }
`;

const NavbarItem = (props) => {
  return (<Wrapper href="#" active={props.active}>{props.children}</Wrapper>);
}

NavbarItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool
}

export default NavbarItem;