import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Weather from "../Weather";
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin: 10px 0px;`;

const InfoBox = styled.div`  
  border: solid 1px #eaeef5;    
  background: #eaeef5;
  display: grid;
  grid-gap: 10px 10px; 
  box-shadow: 0px 0px 10px 0px rgba(170,170,170,0.5);
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr
  }  
  table {
    width:100%;
  }
  th, td {
    padding: 10px;
    text-align:left;
    font-size: 14px;    
  }

  tbody tr:nth-child(odd) {
    background: #FFF
  }`;



const Grid = styled.div`
  width: 100%;  
  display: grid;
  grid-gap: 10px 10px; 
  box-shadow: 0px 0px 10px 0px rgba(170,170,170,0.5);
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr 2fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr 2fr 1fr; 
  }  
`;


const Col = styled.div`
  width: 100%;  
  display:flex;    
  align-items: center;  
  ${(props) => props.background ? `background:${props.background};` : ''}
  ${(props) => props.padding ? `padding:${props.padding};` : ''}
  @media (max-width: 1024px) {
    justify-content: center;
    ${(props) => props.mobileHidden ? 'display:none;' : ''}
  }
  .material-icons {
    margin-right: 5px;
    color: #2f5c9c;
  }`;


const ActionCol = styled.div`
  background: #eaeef5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;  
  .material-icons {
    margin-right: 5px;
    color: #2f5c9c;
  }`;


const OrderItem = (props) => {

  const [weather, setWeather] = useState(null);
  const [active, setActive] = useState(false);
  const [cloning, setCloning] = useState(false);

  useEffect(() => {
    active && !weather &&
      fetch(`${process.env.REACT_APP_API_HOST}/weather?place=${props.shipping.city},${props.shipping.country}`)
        .then(response => response.json())
        .then(data => setWeather(data));

  }, [active, weather]);

  const dateFormat = (value) => {
    try {
      return new Date(value).toISOString().split('T')[0].split('-').reverse().join('/');
    } catch (e) {
      return value;
    }
  }

  const numberFormat = (value) =>
    new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);

  const cloneElement = async () => {
    setCloning(true);
    await props.onClone();
    setCloning(false);
  }

  return (
    <Wrapper>
      <Grid>
        <ActionCol padding="20px" onClick={() => setActive(!active)} key={`order_${props.orderId}`}>
          <span className="material-icons">{active ? 'expand_less' : 'expand_more'}</span>
        </ActionCol>
        <Col padding="20px 0px">
          <span title="Id ordine" className="material-icons">qr_code</span>
          {props.orderId}
        </Col>
        <Col padding="20px 0px" mobileHidden={true}>
          <span title="Data di creazione" className="material-icons">event_available</span>
          {dateFormat(props.orderDate)}
        </Col>
        <Col padding="20px 0px" mobileHidden={true}>
          <span title="Cliente" className="material-icons">contacts</span>
          {props.customer.name}
        </Col>
        <Col padding="20px 0px" mobileHidden={true}>
          <span title="Azienda" className="material-icons">business</span>
          {props.customer.company}
        </Col>
        <Col padding="20px 0px" mobileHidden={true}>
          <span title="Luogo spedizione" className="material-icons">local_shipping</span>
          {props.shipping.city}, {props.shipping.country}
        </Col>
        <ActionCol padding="20px" onClick={cloneElement}>
          <span className="material-icons">{(cloning) ? 'hourglass_top' : 'content_copy'}</span>
        </ActionCol>
      </Grid>
      { active &&
        <InfoBox>
          <Col background="#fff">
            {weather &&
              <Weather
                icon={weather.icon}
                place={weather.place}
                day={weather.day}
                temp={weather.temp}
                forecast={weather.forecast} />
            }
          </Col>
          <Col>
            <table>
              <thead>
                <tr>
                  <th>Prodotto</th>
                  <th align="right">Quantità</th>
                  <th align="right">Prezzo</th>
                  <th align="right">Totale</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(props.summary) && props.summary.map((i, k) => (
                  <tr key={`orderItem_${props.orderId}_${k}`}>
                    <td><b>{i.category}:</b> {i.product}</td>
                    <td align="right">{i.quantity}</td>
                    <td align="right">{numberFormat(i.unitPrice)}</td>
                    <td align="right">{numberFormat(i.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3"></td>
                  <td><b>{numberFormat(props.amount)}</b></td>
                </tr>
              </tfoot>
            </table>
          </Col>
        </InfoBox>
      }
    </Wrapper>
  );
}

OrderItem.propTypes = {
  shipping: PropTypes.object,
  amount: PropTypes.number,
  unitPrice: PropTypes.number,
  quantity: PropTypes.number,
  summary: PropTypes.array,
  width: PropTypes.string,
  background: PropTypes.string,
  onClone: PropTypes.func
}

export default React.memo(OrderItem);