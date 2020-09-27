import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Weather from "../Weather";

const Wrapper = styled.div`
  margin: 10px 0px;
`;
const Row = styled.div`      
  display:flex;    
  padding: 0px;
  justify-content:space-between;
  box-shadow: 0px 0px 10px 0px rgba(170,170,170,0.5);
  border-radius: 4px;
  font-size:14px; 
`;
const Cell = styled.div`    
  display: flex;
  align-items: center; 
  width: ${(props => props.width ? props.width : '20%')};
  padding: 20px;
  .material-icons {
    margin-right: 5px;
    color: #2f5c9c;
  }`;

const ActionCell = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;  
  padding: 20px;
  width: 5%;  
  background: #eaeef5;
  .material-icons {
    margin-right: 5px;
    color: #2f5c9c;
  }`;

const InfoBox = styled.div`  
  border: solid 1px #eaeef5;  
  display: flex;    
  background: #eaeef5;
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
  }
`;

const Col = styled.div`      
  flex:1;  
  background: ${(props) => props.background ? props.background : 'none'};
  display:flex;
`;


const OrderItem = (props) => {

  const [weather, setWeather] = useState(null);
  const [active, setActive] = useState(false);

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

  return (
    <Wrapper>
      <Row>
        <ActionCell onClick={() => setActive(!active)} key={`order_${props.orderId}`}>
          <span class="material-icons">{active ? 'expand_less' : 'expand_more'}</span>
        </ActionCell>
        <Cell width="10%"><span title="Id ordine" className="material-icons">qr_code</span> {props.orderId}</Cell>
        <Cell width="15%"><span title="Data di creazione" className="material-icons">event_available</span> {dateFormat(props.orderDate)}</Cell>
        <Cell><span title="Cliente" className="material-icons">contacts</span> {props.customer.name}</Cell>
        <Cell><span title="Azienda" className="material-icons">business</span> {props.customer.company}</Cell>
        <Cell><span title="Luogo spedizione" className="material-icons">local_shipping</span> {props.shipping.city}, {props.shipping.country}</Cell>
        <ActionCell>
          <span class="material-icons">content_copy</span>
        </ActionCell>
      </Row>
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

export default React.memo(OrderItem);