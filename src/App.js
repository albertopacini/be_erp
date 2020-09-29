import React, { useState } from 'react';
import Theme from "./Theme";
import styled from "styled-components";
import Header from './component/Header';
import Navbar from './component/Navbar';
import NavbarItem from './component/Navbar/NavbarItem';
import Box from './component/Box';
import Logo from './component/Logo';
import Button from './component/Button';
import ItemsList from './container/ItemsList';
import Filters from './container/Filters';
import CreateOrder from './container/CreateOrder';
import Modal from './component/Modal';

const Container = styled.div`  
  width: 1260px;
  @media (max-width: 1024px) {
    width: 100%;    
  }
  margin: 0px auto;
  display:flex;  
  flex-direction:column;
`;

const Wrapper = styled.div`  
  margin-top:20px;
`;

export const OrderContext = React.createContext(null);


function App() {
  const [filters, setFilters] = useState({});
  const [items, setItems] = useState({});
  const [counter, setCounter] = useState(0);
  const [activeModal, setActiveModal] = useState(false);
  const itemsForPage = 30;

  const closeModal = () => {
    setActiveModal(false);
  }

  const formatFilterURI = (page, filters) => {
    let qs = [
      `page=${page}`,
      `rows=${itemsForPage}`
    ];
    for (let key in filters) {
      const values = filters[key].map(i => i.value && i.value);
      if (values.length) {
        qs.push(`${key}=${values.join('|')}`);
      }
    }

    return qs.join('&');
  }

  const loadItems = (page, filters, replace = false) => {
    fetch(`${process.env.REACT_APP_API_HOST}/orders?${formatFilterURI(page, filters)}`)
      .then(response => response.json())
      .then(data => {
        setItems(items => (replace ? data.results : [...items, ...data.results]));
        setCounter(data.count);
      });
  }

  const cloneAction = (itemId) => {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_HOST}/orders/clone/${itemId}`, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        });
    })
  }

  const addOrderHandler = () => {
    closeModal();
    loadItems(1, filters, true);
  }

  return (
    <Theme>
      <Header>
        <Container>
          <Box>
            <Logo />
            <Navbar>
              <NavbarItem active={true}>Ordini</NavbarItem>
            </Navbar>
          </Box>
        </Container>
      </Header>
      <Wrapper>
        <OrderContext.Provider>
          <Modal active={activeModal} >
            <h3>Crea ordine</h3>
            <CreateOrder onCancel={closeModal} onSuccess={addOrderHandler}></CreateOrder>
          </Modal>
          <Container>
            <Filters onChange={setFilters}></Filters>
            <Box justifyContent="flex-end">
              <Button onClick={() => { setActiveModal(true) }}>Crea nuovo ordine</Button>
            </Box>
            <ItemsList
              loadItems={loadItems}
              cloneItem={cloneAction}
              filters={filters}
              items={items}
              totalSize={counter}
            />
          </Container>
        </OrderContext.Provider>
      </Wrapper>
    </Theme>
  );
}

export default App;
