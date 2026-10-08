

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';

const YourCart = () => {
  const navigate = useNavigate();

  const [currentOrders, setCurrentOrders] = useState([]);
  const [price, setPrice] = useState(0);
  const [nowActiveUser, setNowActiveUser] = useState(null);
  const [otherDetails, setOtherDetails] = useState('');

const clearStates = ()=>{
  setCurrentOrders('');
  setOtherDetails('');
  setPrice(0);

  // localStorage.setItem('YourOrders',JSON.stringify([]))

}

  useEffect(() => {
    let getData = localStorage.getItem('YourOrders');
    if (getData) {
      let jsonData = JSON.parse(getData);
      jsonData && setCurrentOrders(jsonData);
    } else {
      localStorage.setItem('YourOrders', JSON.stringify([]));
    }

    let activeUser = localStorage.getItem('loggedInUser');
    let jsonUser = JSON.parse(activeUser);
    jsonUser && setNowActiveUser(jsonUser);
  }, []);

  const deleteItem = (deleteItemId) => {
    let allOrders = [...currentOrders];
    let findIndexNumber = allOrders.findIndex((item) => item.productId === deleteItemId);
    allOrders.splice(findIndexNumber, 1);
    setCurrentOrders(allOrders);
    localStorage.setItem('YourOrders', JSON.stringify(allOrders));
  };

  const increment = (index) => {
    currentOrders[index].quantity++;
    setCurrentOrders([...currentOrders]);
    localStorage.setItem('YourOrders', JSON.stringify(currentOrders));
  };

  const decrement = (product, index) => {
    let objClone = { ...product };
    objClone.quantity = objClone.quantity - 1;
    let fetchOrderData = [...currentOrders];
    fetchOrderData.splice(index, 1, objClone);
    setCurrentOrders(fetchOrderData);
    localStorage.setItem('YourOrders', JSON.stringify(fetchOrderData));
  };

  useEffect(() => {
    let fetchCurrentOrders = [...currentOrders];
    let arr = [];
    for (let i = 0; i < fetchCurrentOrders.length; i++) {
      arr.push(Number(fetchCurrentOrders[i].productPrice) * Number(fetchCurrentOrders[i].quantity));
    }
    let tot = arr.reduce((prev, next) => prev + next, 0);
    setPrice(tot);
  }, [currentOrders]);

  // ✅ FIXED handlePlaceOrder
  const handlePlaceOrder = (orders) => {
    if (!nowActiveUser) {
      console.log('User not logged in — cannot place order');
      return;
    }

    if (!orders || orders.length === 0) {
      console.log('Cart is empty — cannot place order');
      return;
    }
    // let fetchAllOrders = localStorage.getItem('OrderHistory')
    // // console.log('all orders history....',fetchAllOrders)
    // let jsonFetchAllOrders = JSON.parse(fetchAllOrders);

    let ordersObj = {
      orderId : '34',
      bucket: orders,
      totalPrice: price,
      otherDetails: otherDetails,
      userId: nowActiveUser.email,
      orderDate: new Date().toLocaleDateString(),
      orderTime : new Date().toLocaleTimeString()
    };

    
  //  jsonFetchAllOrders.push(ordersObj)
   localStorage.setItem('OrderHistory',JSON.stringify(ordersObj))
   alert('order placed successfully')

   navigate('/orders')
   
    // // clear the cart
    // localStorage.setItem('YourOrders', JSON.stringify([]));
    // setCurrentOrders([]);
    // setOtherDetails('');

    // // navigate to success page
    // navigate('/order-success');
  };

  return (
    <div>
      <h1>Orders screen</h1>

      {(currentOrders && currentOrders.length > 0) ? (
        <MDBRow>
          {currentOrders.map((product, index) => (
            <MDBCol sm='4' key={index} className="mb-4">
              <MDBCard>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                  <MDBCardImage
                    src={product.productImage}
                    fluid
                    alt={product.productName}
                    style={{ height: 100, width: 80, objectFit: 'contain' }}
                  />
                  <a>
                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                  </a>
                </MDBRipple>
                <MDBCardBody>
                  <MDBCardTitle>{product.productName}</MDBCardTitle>
                  <MDBCardText>{product.productDescription}</MDBCardText>
                  <MDBCardText>Price : {product.productPrice * product.quantity} PKR</MDBCardText>
                  <MDBBtn onClick={() => increment(index)}>+</MDBBtn>
                  <MDBBtn onClick={() => decrement(product, index)} disabled={product.quantity < 2}>-</MDBBtn>
                  <MDBCardText>Quantity : {product.quantity}</MDBCardText>
                  <MDBBtn onClick={() => deleteItem(product.productId)}>Delete Item</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      ) : (
        <h1>No product found</h1>
      )}

      <hr />
      <div>
        <h2>Total Price : {price}</h2>
      </div>
      <hr />

      <textarea
        placeholder='Enter others important details'
        rows={4}
        cols={60}
        value={otherDetails}
        onChange={(e) => setOtherDetails(e.target.value)}
      ></textarea>

      <div className="d-grid gap-2 col-6 mx-auto">
        {/* ✅ FIXED: arrow function se pass karo, taake event ki jagah currentOrders jaaye */}
        <MDBBtn
          onClick={() => handlePlaceOrder(currentOrders)}
          disabled={otherDetails.trim().length < 1}
        >
          Place Order
        </MDBBtn>
      </div>
    </div>
  );
};

export default YourCart;