import React, { useState } from 'react';
import Theme from "./Theme";
import styled from "styled-components";
import Header from './component/Header';
import Navbar from './component/Navbar';
import NavbarItem from './component/Navbar/NavbarItem';
import Box from './component/Box';
import Logo from './component/Logo';
import Orders from './container/Orders';
import Filters from './container/Filters';

const Container = styled.div`  
  width: 1260px;
  margin: 0px auto;
  display:flex;  
  flex-direction:column;
`;

const Wrapper = styled.div`  
  margin-top:20px;
`;


function App() {
  const [filters, setFilters] = useState({});

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
        <Container>
          <Filters onChange={setFilters}></Filters>
          <Orders filters={filters} />
        </Container>
      </Wrapper>
    </Theme>
  );
}

export default App;
