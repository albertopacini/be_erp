import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection};
  flex-wrap: ${props => props.flexWrap};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  align-content: ${props => props.alignContent};
  flex-grow: ${props => props.flexGrow};
  flex-shrink: ${props => props.flexShrink};
  align-self: ${props => props.alignSelf};
  order: ${props => props.order};
  flex-basis: ${props => props.flexBasis};
`;

const Box = (props) => {
  return (<Wrapper
    className={props.className}
    flexDirection={props.flexDirection}
    flexWrap={props.flexWrap}
    justifyContent={props.justifyContent}
    alignItems={props.alignItems}
    alignContent={props.alignContent}
    flexGrow={props.flexGrow}
    flexShrink={props.flexShrink}
    alignSelf={props.alignSelf}
    order={props.order}
    flexBasis={props.flexBasis}
  >{Children.toArray(props.children)}</Wrapper>);
}


Box.propTypes = {
  children: PropTypes.node,
  flexDirection: PropTypes.oneOf([
    'row',
    'row-reverse',
    'column',
    'column-reverse',
  ]),
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justifyContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
    'start',
    'end',
    'left',
    'right',
  ]),
  alignItems: PropTypes.oneOf([
    'stretch',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'first baseline',
    'last baseline',
    'start',
    'end',
    'self-start',
    'self-end',
  ]),
  alignContent: PropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
    'stretch',
    'start',
    'end',
    'baseline',
    'first baseline',
    'last baseline',
  ]),
  flexGrow: PropTypes.number,
  flexShrink: PropTypes.number,
  alignSelf: PropTypes.oneOf([
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'baseline',
    'stretch',
  ]),
  order: PropTypes.number,
  className: PropTypes.string,
  flexBasis: PropTypes.string,
};

Box.defaultProps = {
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  flexGrow: 0,
  flexShrink: 1,
  alignSelf: 'auto',
};

export default Box;
