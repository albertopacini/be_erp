import React, { useState, useEffect } from 'react';
import Theme from "../../Theme";
import Input from '../../component/Input';
import styled from "styled-components";


const ChipWrapper = styled.div`    
  display: flex;
  margin: 20px 0px;
  height: 40px;
  overflow: auto;
`;
const Wrapper = styled.div`    
  display: flex;
  div {    
    margin-right: 20px;
    &:first-child { 
      margin-left: 0px;
      
    }
    &:last-child { 
      margin-right: 0px;
    }
  }
  
  
`;
const Chip = styled.div`    
  display: flex;
  align-items: center;
  border: solid 1px #2f5c9c;  
  padding: 10px;
  margin-right: 5px;
  display:flex;  
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
    <Theme>
      <Wrapper>
        <Input
          label="Customer"
          id="customer_filter"
          type="text"
          name="customer"
          onChange={handlerFilter}
          placeholder="Search customer..." source={'customers'} />
        <Input
          label="Order"
          id="order_filter"
          type="text"
          name="order"
          source={'orders'}
          onChange={handlerFilter}
          placeholder="Search order..." />
        <Input
          label="Company"
          id="company_filter"
          type="text"
          name="company"
          source={'companies'}
          onChange={handlerFilter}
          placeholder="Search company..." />
        <Input
          label="City"
          id="city_filter"
          type="text"
          name="city"
          source={'cities'}
          onChange={handlerFilter}
          placeholder="Search city..." />
      </Wrapper>
      <ChipWrapper>
        {renderFilters()}
      </ChipWrapper>
    </Theme>
  );
}

export default Filters;
