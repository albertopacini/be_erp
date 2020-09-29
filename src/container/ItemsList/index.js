import React, { useEffect, useState, useRef } from 'react';
import OrderItem from '../../component/OrderItem';
import styled from "styled-components";

const Wrapper = styled.div`  
  display: flex;
  flex-direction: column;  
  height: 50vh;
  overflow: auto;
  border-bottom: solid 1px #eaeef5;
  border-top: solid 1px #eaeef5;
  padding:5px;  
  margin-top: 10px;`;

const InfiniteLoading = styled.div`
  display: flex;`;

const Counter = styled.div`
  padding: 10px 0px; 
  display: flex;`;

function ItemsList(props) {
  const [loadingRef, setLoadingRef] = useState();
  const [wrapperRef, setWrapperRef] = useState();

  const prevY = useRef(0);
  const page = useRef(props.page);
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

  const loadMore = () => {
    page.current++;
    props.loadItems(page.current, filters.current);
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
    props.loadItems(page.current, filters.current, true);
  }, [props.filters]);

  useEffect(() => {
    page.current = props.page;
  }, [props.page]);


  return (
    <React.Fragment>
      <Wrapper ref={wrapperRef => setWrapperRef(wrapperRef)}>
        {Array.isArray(props.items) && props.items.map((v, i) => {
          return (
            <OrderItem
              key={`order_${v.orderId}`}
              orderId={v.orderId}
              orderDate={v.orderDate}
              customer={v.customer}
              shipping={v.shipping}
              summary={v.summary}
              amount={v.amount}
              onClone={() => props.cloneItem(v.orderId)}
            />
          );
        })}
        <InfiniteLoading ref={loadingRef => setLoadingRef(loadingRef)} />
      </Wrapper>
      <Counter>
        <span> Records: {props.items.length} di {props.totalSize} </span>
      </Counter>
    </React.Fragment>
  );
}

export default ItemsList;
