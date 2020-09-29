import React, { useState, useEffect } from 'react';
import Autocomplete from '../../component/Autocomplete';
import styled from "styled-components";


const ChipWrapper = styled.div`    
  display: flex;
  margin: 20px 0px;
  height: 40px;
  overflow: auto;
`;

const Wrapper = styled.div`    
  border-bottom: solid 1px #eaeef5;
  margin-bottom: 10px;
`;

const InputGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px 10px; 
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Col = styled.div`
  width: 100%;  
  display:flex;  
`;

const Chip = styled.div`    
  display: flex;
  align-items: center;
  border: solid 1px #eaeef5;  
  padding: 10px;
  margin-right: 5px;   
  border-radius: 4px;  
  color: #2f5c9c;
  .material-icons {
    cursor: pointer;
    margin-left: 10px;
    font-size: 14px;    
  }
`;

function Filters(props) {

  const [filters, setFilters] = useState({});
  useEffect(() => {
    props.onChange && props.onChange(filters);
  }, [filters]);

  const handlerFilter = (key, item) => {
    if (Array.isArray(filters[key]) && filters[key].filter(i => i.value === item.value).length) {
      return;
    }

    let filterObj = [item];
    if (filters[key] && Array.isArray(filters[key])) {
      filterObj = [...filters[key], item];
    }
    setFilters({ ...filters, [key]: filterObj });
  };

  const removeFilterValueHandler = (filter, value) => {
    let filterObj = filters[filter].filter(item => item.value !== value);
    setFilters({ ...filters, [filter]: filterObj });
  };

  const renderFilters = () => {
    const chips = [];
    for (let key in filters) {
      Array.isArray(filters[key]) && filters[key].forEach((e, i) => {
        chips.push(<Chip key={`chip_${key}_${e.value}`}><span>{e.label}</span> <span onClick={() => removeFilterValueHandler(key, e.value)} className="material-icons">clear</span></Chip>);
      })
    }

    return chips;
  }

  return (
    <Wrapper>
      <InputGrid>
        <Col>
          <Autocomplete
            label="Ordine"
            id="order_filter"
            type="text"
            autocomplete="off"
            name="orf"
            source={'orders'}
            onChange={handlerFilter}
            placeholder="Ricerca ordine..." />
        </Col>
        <Col>
          <Autocomplete
            label="Cliente"
            id="customer_filter"
            type="text"
            name="cusf"
            autocomplete="off"
            onChange={handlerFilter}
            placeholder="Ricerca cliente..." source={'customers'} />
        </Col>
        <Col>
          <Autocomplete
            label="Azienda"
            id="company_filter"
            type="text"
            name="accf"
            autocomplete="off"
            source={'companies'}
            onChange={handlerFilter}
            placeholder="Ricerca azienda..." />
        </Col>
        <Col>
          <Autocomplete
            label="Città"
            id="city_filter"
            type="text"
            name="cf"
            autocomplete="be_demo"
            source={'cities'}
            onChange={handlerFilter}
            placeholder="Ricerca città..." />
        </Col>
        <Col>
          <Autocomplete
            label="Paese"
            id="country_filter"
            type="text"
            name="cof"
            autocomplete="off"
            source={'countries'}
            onChange={handlerFilter}
            placeholder="Ricerca paese..." />
        </Col>
      </InputGrid>
      <ChipWrapper>
        {renderFilters()}
      </ChipWrapper>
    </Wrapper>
  );
}

export default Filters;
