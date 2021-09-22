import React,  { Fragment, useState, useEffect, useReducer } from 'react';
import { Card, Accordion, Button, Container,Row,Col,Image,Input} from 'react-bootstrap';
import axios from 'axios';
// simulate getting products from DataBase
const products = [
    { name: "Apples", country: "Italy", cost: 3, instock: 10 },
    { name: "Oranges", country: "Spain", cost: 4, instock: 3 },
    { name: "Beans", country: "USA", cost: 2, instock: 5 },
    { name: "Cabbage", country: "USA", cost: 1, instock: 8 },
  ];
  //=========Cart=============
/*   const Cart = (props) => {

    let data = props.location.data ? props.location.data : products;
    console.log(`data:${JSON.stringify(data)}`);
  
    return <Accordion defaultActiveKey="0">{{list}}</Accordion>;
  } */
  
  const useDataApi = (initialUrl, initialData) => {
    const { useState, useEffect, useReducer } = React;
    const [url, setUrl] = useState(initialUrl);
  
    const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
    });
    console.log(`useDataApi called`);
    useEffect(() => {
      console.log("useEffect Called");
      let didCancel = false;
      const fetchData = async () => {
        dispatch({ type: "FETCH_INIT" });
        try {
          const result = await axios(url);
          console.log("FETCH FROM URl");
          if (!didCancel) {
            dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          }
        } catch (error) {
          if (!didCancel) {
            dispatch({ type: "FETCH_FAILURE" });
          }
        }
      };
      fetchData();
      return () => {
        didCancel = true;
      };
    }, [url]);
    return [state, setUrl];
  };
  const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_INIT":
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };
  
 export default function Products  (/* props */) {
    const [items, setItems] = React.useState(products);
    const [cart, setCart] = React.useState([]);
    /* const [total, setTotal] = React.useState(0); */
 
    //  Fetch Data
 
    const [query, setQuery] = useState("http://localhost:1337/products");
    const [{ data}, doFetch] = useDataApi(
      "http://localhost:1337/products",
      {
        data: [],
      }
    );
    console.log(  `Rendering Products ${JSON.stringify(data)}`);
    // Fetch Data
    const addToCart = (e) => {
      let name = e.target.name;
      let item = items.filter((item) => item.name === name);
      console.log(`add to Cart ${JSON.stringify(item)}`);
      if (item[0].instock > 0) {
        console.log(item[0].instock);
        setCart([...cart, ...item]);
        let updatedList = [...items]
        let indexOfUpdated = updatedList.indexOf(item[0])
        // console.log(item[0])
        updatedList[indexOfUpdated].instock -= 1
        setItems([...updatedList])
      } else {
        alert(`there is not ${name}`)
      }
      //doFetch(query);

    };
    const deleteCartItem = (dIndex) => {
      let newCart = cart.filter((item, i) => dIndex !== i);
      let target = cart.filter((item, index) => dIndex === index);
      let newItems = items.map((item, index) => {
        if (item.name === target[0].name) item.instock = item.instock + 1;
        return item;
      });
      setCart(newCart);
      setItems(newItems);
    };
  /*   const photos = ["apple.png", "orange.png", "beans.png", "cabbage.png"]; */
  
    let list = items.map((item, index) => {
      let n = index + 1050;
      let url = "https://picsum.photos/id/" + n + "/50/50";
  
      return (
        <Fragment>
        <li key={index}>
          <Image src={url} width={70} roundedCircle></Image>
          <Button variant="primary" size="large">
          {item.name}:{item.cost}  - Stock: {item.instock}
          </Button>
          <input name={item.name} type="submit" onClick={addToCart}></input>
        </li>
        </Fragment>
      );
    });
    let cartList = cart.map((item, index) => {
      return (
        <Accordion defaultActiveKey={index}>
        <Accordion.Item eventKey={1 + index}>
          <Accordion.Header>{item.name}</Accordion.Header>
          <Accordion.Body
            onClick={() => deleteCartItem(index)}
            eventKey={1 + index}>
            $ {item.cost} from {item.country}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      );
    });
  
    let finalList = () => {
      let total = checkOut();
      let final = cart.map((item, index) => {
        return (

        <div key={index} index={index}>
            {item.name}
          </div>

        );
      });
      return { final, total };
    };
  
    const checkOut = () => {
      let costs = cart.map((item) => item.cost);
      const reducer = (accum, current) => accum + current;
      let newTotal = costs.reduce(reducer, 0);
      console.log(`total updated to ${newTotal}`);
      return newTotal;
    };
    // TODO: implement the restockProducts function
    const restockProducts = (url) => {
    doFetch(url);
    let newItems = data.map((item) => {
      let { name, country, cost, instock } = item;
      return { name, country, cost, instock }
    });
      setItems([...items, ...newItems])
    };
    return (
      <Container>
        <Row>
          <Col>
            <h1>Product List</h1>
            <ul style={{ listStyleType: "none" }}>{list}</ul>
          </Col>
          <Col>
            <h1>Cart Contents</h1>
            <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey='0'>
              <Accordion.Body eventKey='0'>{cartList}</Accordion.Body>
            </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <h1>CheckOut </h1>
            <Button onClick={checkOut}>CheckOut $ {finalList().total}</Button>
            <div> {finalList().total > 0 && finalList().final} </div>
          </Col>
        </Row>
        <Row>
          <form
            onSubmit={(event) => {
              restockProducts(`http://localhost:1337/${query}`);
              console.log(`Restock called on ${query}`);
              event.preventDefault();
            }}
          >
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit">ReStock Products</button>
          </form>
        </Row>
      </Container>
    );
  };
