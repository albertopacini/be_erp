import React, { useEffect, useState, useRef, useCallback } from 'react';
import OrderItem from '../../component/OrderItem';
import styled from "styled-components";

const Wrapper = styled.div`  
  display: flex;
  flex-direction: column;  
  height: 65vh;
  overflow: auto;
  border-bottom: solid 1px #eaeef5;
  border-top: solid 1px #eaeef5;
  padding:5px;  
`;

const InfiniteLoading = styled.div`
  display: flex;      
`;

const Counter = styled.div`
  padding: 10px 0px; 
  display: flex;      
`;

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [counter, setCounter] = useState(0);
  const [orderForPage, setOrderForPage] = useState(30);
  const [loadingRef, setLoadingRef] = useState();
  const [wrapperRef, setWrapperRef] = useState();

  const prevY = useRef(0);
  const page = useRef(1);
  const filters = useRef(props.filters);

  const observer = useRef((root) => {
    return new IntersectionObserver(
      (entities) => {
        const y = entities[0].boundingClientRect.y;
        if (prevY.current > y) {
          loadMore();
        }

        prevY.current = y;
      },
      {
        rootMargin: "20px",
        threshold: 1.0
      }
    )
  });

  const formatFilterURI = (page, filters) => {
    let qs = [
      `page=${page}`,
      `rows=${orderForPage}`
    ];
    for (let key in filters) {
      const values = filters[key].map(i => i.value && i.value);
      if (values.length) {
        qs.push(`${key}=${values.join('|')}`);
      }
    }

    return qs.join('&');
  }

  const handlerLoadResults = useCallback(async (page, filters, replace = false) => {
    fetch(`${process.env.REACT_APP_API_HOST}/orders?${formatFilterURI(page, filters)}`)
      .then(response => response.json())
      .then(data => {
        setOrders(orders => (replace ? data.results : [...orders, ...data.results]));
        setCounter(data.count);
      });
  });

  const loadMore = () => {
    page.current++;
    handlerLoadResults(page.current, filters.current);
  }

  useEffect(() => {
    const currentObserver = observer.current(wrapperRef);
    if (loadingRef && wrapperRef) {
      currentObserver.observe(loadingRef);
    }
  }, [loadingRef, wrapperRef]);

  useEffect(() => {
    page.current = 1;
    filters.current = props.filters;
    handlerLoadResults(page.current, filters.current, true);
  }, [props.filters]);


  return (
    <React.Fragment>
      <Wrapper ref={wrapperRef => setWrapperRef(wrapperRef)}>
        {Array.isArray(orders) && orders.map((v, i) => {
          return (
            <OrderItem
              key={`order_${v.orderId}`}
              orderId={v.orderId}
              orderDate={v.orderDate}
              customer={v.customer}
              shipping={v.shipping}
              summary={v.summary}
              amount={v.amount}
            />
          );
        })}
        <InfiniteLoading ref={loadingRef => setLoadingRef(loadingRef)} />
      </Wrapper>
      <Counter>
        <span> Records: {orders.length} di {counter} </span>
      </Counter>
    </React.Fragment>
  );
}

export default Orders;
