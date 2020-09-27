import React from 'react';
import styled from "styled-components";
import Box from '../Box';

const Wrapper = styled.div`      
  display:flex;
  flex-direction:column;  
  padding:20px;
  min-width: 233px;
`;

const ForecastWrapper = styled.div`      
  display:flex;
  flex-direction:column;
  margin: 0px 10px;
  align-items:center;
`;

const Weather = (props) => {
  return (
    <Wrapper>
      <Box alignItems="center">
        <img alt="Weather condition" src={props.icon}></img>
        <Box flexDirection="column">
          <h5>{props.place}</h5>
          <h4>{props.day}</h4>
          <h3>{props.temp.current} °C</h3>
          <span>{props.temp.max} / {props.temp.min} °C</span>
        </Box>
      </Box>
      <Box flexDirection="column">
        <Box alignItems="center">
          {props.forecast.map((i, k) => (
            <ForecastWrapper>
              <img width="64" alt="{i.day} condition" src={i.icon}></img>
              <h6>{i.day}</h6>
              <small>{i.temp.max} / {i.temp.min} °C</small>
            </ForecastWrapper>
          ))}
        </Box>
      </Box>
    </Wrapper>
  );
}

export default Weather;