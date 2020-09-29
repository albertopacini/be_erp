import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const Overlay = styled.div`  
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.2);
`;

const Wrapper = styled.div`  
  box-shadow: 0px 0px 10px 0px rgba(170, 170, 170, 0.5);
  background-color: #fff;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #eaeef5;
  width: 80%;
  min-height: 250px;
`;


const Modal = (props) => {

  return (
    <React.Fragment>
      {props.active &&
        <Overlay>
          <Wrapper>
            {props.children}
          </Wrapper>
        </Overlay>
      }
    </React.Fragment>);
}


Modal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default Modal;