import React, { useState } from 'react';
import Select from '../../component/Select';
import Input from '../../component/Input';
import Box from '../../component/Box';
import IconButton from '../../component/IconButton';
import styled from "styled-components";
import Button from '../../component/Button';

const Divider = styled.hr`      
  border: 1px solid #eaeef5;
  margin: 20px 0px;
`;

const ProductGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px 10px; 
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const InputGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px 10px; 
  grid-template-columns: 1fr 1fr;
`;

const Col = styled.div`
  width: 100%;
  margin: 0px 10px;
  display:flex;
`;


function CreateOrder(props) {

  const [order, setOrder] = useState({
    customerId: '',
    shippingName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingRegion: '',
    shippingCountry: '',
  });

  const [products, setProducts] = useState({
    items: [{
      index: `${new Date().getUTCMilliseconds()}`,
      productId: null,
      quantity: 0,
      price: 0,
      discount: 0,
    }]
  });

  const [loading, setLoading] = useState(false);

  const addProductRow = () => {
    let c = { ...products };
    c.items.push({
      index: `${new Date().getUTCMilliseconds()}`,
      productId: null,
      quantity: 1,
      price: 0,
      discount: 0,
    });

    setProducts(c);
  }

  const removeProductRow = (k) => {
    let c = { ...products };
    c.items.splice(k, 1);

    setProducts(c);
  }

  const onChangeCustomerHandler = (resource, customer) => {
    if (!customer) {
      return setOrder({ ...order, customerId: null });
    }
    fetch(`${process.env.REACT_APP_API_HOST}/customers/${customer.value}`)
      .then(response => response.json())
      .then(data => {
        setOrder({
          customerId: customer.value || null,
          shippingName: data.CompanyName || '',
          shippingAddress: data.Address || '',
          shippingCity: data.City || '',
          shippingPostalCode: data.PostalCode || '',
          shippingRegion: data.Region || '',
          shippingCountry: data.Country || '',
        });
      });
  }

  const onChangeProductHandler = (product, row) => {
    if (!product) {
      let c = { ...products };
      c.items[row].productId = null
      return setProducts(c);
    }
    fetch(`${process.env.REACT_APP_API_HOST}/products/${product.value}`)
      .then(response => response.json())
      .then(data => {
        if (products.items[row]) {
          let c = { ...products };
          c.items[row].productId = product.value;
          c.items[row].price = data.price;
          c.items[row].quantity = 1;
          c.items[row].discount = 0;
          setProducts(c);
        }

      });
  }

  const setFiledValue = (field, value) => {
    if (order[field]) {
      order[field] = value;
      setOrder(order);
    };
  }

  const setProductFiledValue = (row, field, value) => {
    if (products.items[row]) {
      let c = { ...products };
      c.items[row][field] = value;
      return setProducts(c);
    };
  }

  const validate = () => {
    if (!order.customerId || !order.shippingName || !order.shippingAddress || !order.shippingCity || !order.shippingPostalCode || !order.shippingCountry) {
      return false;
    }

    for (let key in products.items) {
      if (!products.items[key].productId || parseInt(products.items[key].quantity) <= 0 || parseFloat(products.items[key].price) <= 0) {
        return false;
      }
    }

    return true;
  }

  const saveOrder = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_HOST}/orders`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order: order, orderItems: products })
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        props.onSuccess && props.onSuccess();
      });
  }

  const cancel = () => {
    props.onCancel();
  }

  return (
    <React.Fragment>
      <Divider />
      <InputGrid>
        <Col>
          <Select
            label="Cliente *"
            id="customer_order"
            type="text"
            name="customer"
            placeholder="Ricerca cliente..." source={'customers'} onChange={onChangeCustomerHandler} />
        </Col>
      </InputGrid>
      <Divider />
      <InputGrid>
        <Col>
          <Input
            onChange={(value) => setFiledValue('shippingName', value)}
            label="Destinatario *"
            id="shipping_name_order"
            type="text"
            name="shipping_name"
            value={order.shippingName}
            placeholder="Inserisci destinatario" />
        </Col>
        <Col>
          <Input label="Indirizzo *"
            onChange={(value) => setFiledValue('shippingAddress', value)}
            id="shipping_address_order"
            type="text"
            value={order.shippingAddress}
            name="shipping_address"
            placeholder="Inserisci indirizzo" />
        </Col>
        <Col>
          <Input label="Città *"
            onChange={(value) => setFiledValue('shippingCity', value)}
            id="shipping_city_order"
            type="text"
            name="shipping_city"
            value={order.shippingCity}
            placeholder="Inserisci città" />
        </Col>
        <Col>
          <Input label="CAP *"
            onChange={(value) => setFiledValue('shippingPostalCode', value)}
            id="shipping_postal_code_order"
            type="text"
            value={order.shippingPostalCode}
            name="shipping_postal_code"
            placeholder="Inserisci codice postale" />
        </Col>
        <Col>
          <Input label="Provincia"
            onChange={(value) => setFiledValue('shippingRegion', value)}
            id="shipping_region_order"
            value={order.shippingRegion}
            type="text"
            name="shipping_region"
            placeholder="Inserisci provincia" />
        </Col>
        <Col>
          <Input label="Nazione *"
            onChange={(value) => setFiledValue('shippingCountry', value)}
            id="shipping_country_order"
            value={order.shippingCountry}
            type="text"
            name="shipping_country"
            placeholder="Inserisci nazione" />
        </Col>
      </InputGrid>
      <Divider />
      <Box justifyContent="flex-end">
        <IconButton icon="add_circle_outline" onClick={addProductRow}>clear</IconButton>
      </Box>
      {
        products.items && products.items.map((i, k) => (
          <ProductGrid key={i.index}>
            <Col>
              <Select
                label="Prodotto *"
                id={`product_${i.index}`}
                type="text"
                name={`product[${k}]`}
                onChange={(resource, value) => onChangeProductHandler(value, k)}
                placeholder="Ricerca prodotto..." source={'products'} />
            </Col>
            <Col>
              <Input label="Quantità"
                id="product_quantity"
                type="number"
                name="product_quantity"
                value={i.quantity}
                onChange={(value) => setProductFiledValue(k, 'quantity', value)}
                placeholder="Inserisci la qualtità" />
            </Col>
            <Col>
              <Input label="Prezzo"
                id="product_price"
                type="number"
                name="product_price"
                value={i.price}
                onChange={(value) => setProductFiledValue(k, 'price', value)}
                placeholder="Inserisci il prezzo" />
            </Col>
            <Col>
              <Input label="Sconto"
                id="product_discount"
                type="number"
                name="product_discount"
                value={i.discount}
                onChange={(value) => setProductFiledValue(k, 'discount', value)}
                placeholder="Inserisci lo sconto" />
              <Box alignItems="flex-end">
                <IconButton onClick={() => removeProductRow(k)} icon="clear" />
              </Box>
            </Col>
          </ProductGrid>
        ))
      }
      <Divider />
      <Box justifyContent="space-between">
        <Button onClick={cancel}>Annulla</Button>
        <Button onClick={saveOrder} disabled={!validate() && !loading}>Salva</Button>
      </Box>
    </React.Fragment >
  )

}

export default CreateOrder;