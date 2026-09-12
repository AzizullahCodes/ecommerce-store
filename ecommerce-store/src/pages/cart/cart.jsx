// import React, { useEffect, useState } from 'react';
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardImage,
//   MDBBtn,
//   MDBRipple,
//   MDBRow,
//   MDBCol
// } from 'mdb-react-ui-kit';
// const YourCart = () => {
  
//   const [currentOrders,setCurrentOrders] = useState([])
//   const [price,setPrice] = useState(0)
//   const [nowActiveUser,setNowActiveUser] = useState(null)
//   const [otherDetails,setOtherDetails] = useState('')

//   //useEffect 
//   useEffect(()=>{
//     let getData = localStorage.getItem('YourOrders')
//     if(getData){
//       let jsonData = JSON.parse(getData);
//       console.log(jsonData)
//       jsonData && setCurrentOrders(jsonData)
//     }
//     else{
//       localStorage.setItem('YourOrders', JSON.stringify([]))
//     }
// //fetch loggedInUser from localStorage 
// let activeUser = localStorage.getItem('loggedInUser')
// let jsonUser = JSON.parse(activeUser)

// console.log(`active user is ${jsonUser}`)
// jsonUser && setNowActiveUser(jsonUser)
//   },[])
  
// //delete item function 
// const deleteItem = (deleteItemId)=>{
//   let allOrders = [...currentOrders]
//   console.log('allorders......',allOrders)
//   let needeItem = '';
//   // for(let i = 0;i < allOrders.length;i++){
//   //   console.log(allOrders[i].productId == deleteItemId)
//   //   needeItem = needeItem + allOrders[i].productId;
  
//   // }
//   let findIndexNumber = allOrders.findIndex((item)=>{
//     return item.productId === deleteItemId
//   })
//   console.log(`index is ..... ${findIndexNumber}`)
  
//   allOrders.splice(findIndexNumber,1)
//   // console.log('allorder after splicing.....',allOrders)
// setCurrentOrders(allOrders)
  
// //set database in localstorage also 
// localStorage.setItem('YourOrders',JSON.stringify(allOrders))
// }

// //total price calculating function 


// // increment decrement function for setting product quantity 
// //incrementQuantity Function 
// // const increment = (product,index)=>{
// //   console.log(product,index)
// //   // console.log('current orders....',currentOrders)
// //   let objClone = {...product}
// //   console.log(objClone)
// //   console.log(objClone.quantity)
// //   objClone.quantity = objClone.quantity + 1;
// //   console.log(objClone)
// //   let fetchOrderData = [...currentOrders];
// //   console.log(fetchOrderData)
// //   fetchOrderData.splice(index,1,objClone)
// //   console.log(fetchOrderData)
// //   setCurrentOrders(fetchOrderData)
// //   console.log(currentOrders)
// // }
// // const increment = (index) => {
// //   let updatedOrders = [...currentOrders];

// //    updatedOrders[index].quantity += 1;
 

// //   setCurrentOrders(updatedOrders);

// //   localStorage.setItem("YourOrders", JSON.stringify(updatedOrders));
// // };
// const increment = (index) => {
//   console.log(currentOrders[index])
//   currentOrders[index].quantity++;
//   setCurrentOrders([...currentOrders]);
// };
// //decrementQuantity Function 
// const decrement = (product,index)=>{
//   console.log(product,index)
//   // console.log('current orders....',currentOrders)
//   let objClone = {...product}
//   console.log(objClone)
//   console.log(objClone.quantity)
//   objClone.quantity = objClone.quantity - 1;
//   console.log(objClone)
//   let fetchOrderData = [...currentOrders];
//   console.log(fetchOrderData)
//   fetchOrderData.splice(index,1,objClone)
//   console.log(fetchOrderData)
//   setCurrentOrders(fetchOrderData)
//   console.log(currentOrders)
// }

// //total price calculating function 
// // useEffect((currentOrders)=>{
// // const totalPrice = (currentOrders)=>{
// //   console.log('current orders.....',currentOrders)
// //   let arr = []
// //   for(let i = 0;i < currentOrders.length;i++){
// //     arr.push(Number(currentOrders[i].productPrice) * Number(currentOrders[i].quantity))
// //   }
// //   console.log(arr)
// //   let requiredArray = [...arr]
// //   console.log('required array....',requiredArray)
// //   let tot = requiredArray.reduce((prev,next)=>{
// //     return prev + next
// //   },0)
// //   console.log(tot)
// //   tot && setPrice(tot)
// // }
// // }
// // },[])


// useEffect(()=>{
//   console.log('curren orders in useeffect   ',currentOrders)
//   let fetchCurrentOrders = [...currentOrders];
//   console.log(fetchCurrentOrders)
//     let arr = []
//   for(let i = 0;i < fetchCurrentOrders.length;i++){
//     arr.push(Number(fetchCurrentOrders[i].productPrice) * Number(fetchCurrentOrders[i].quantity))
//   }
//   console.log(arr)
//   let requiredArray = [...arr]
//   console.log('required array....',requiredArray)
//   let tot = requiredArray.reduce((prev,next)=>{
//     return prev + next
//   },0)
//   console.log(tot)
//   tot && setPrice(tot)


// },[currentOrders])

// //handlePlaceOrder function 
// const handlePlaceOrder = (currentOrders)=>{
//   let ordersObj = {
//     bucket : currentOrders,
//     totalPrice : price,
//     otherDetails : otherDetails,
//     // userId : nowActiveUser.email
//   }
//   console.log(`orders object is ${ordersObj}`)
// }
// console.log(nowActiveUser)
// console.log(otherDetails)


//   return (
//    <div>
//          <h1>Orders screen</h1>
   
//          {(currentOrders && currentOrders.length > 0) ? (
//            <MDBRow>
//              {currentOrders.map((product, index) => (
//                <MDBCol sm='4' key={index} className="mb-4">
//                  <MDBCard>
//                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
//                      <MDBCardImage
//                        src={product.productImage}
//                        fluid
//                        alt={product.productName}
//                        style={{
//                          height: 100,
//                          width: 80,
//                          objectFit: 'contain'
//                        }}
//                      />
//                      <a>
//                        <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
//                      </a>
//                    </MDBRipple>
//                    <MDBCardBody>
//                      <MDBCardTitle>{product.productName}</MDBCardTitle>
//                      <MDBCardText>{product.productDescription}</MDBCardText>
//                      <MDBCardText> Price : {product.productPrice * product.quantity} PKR</MDBCardText>
//                     <MDBBtn onClick={()=>increment(index)}>+</MDBBtn>
//                      <MDBBtn onClick={()=>decrement(product,index)} disabled={product.quantity < 2} >-</MDBBtn>
//                     <MDBCardText>Quantity :{product.quantity}</MDBCardText>
//                      <MDBBtn onClick={()=>deleteItem(product.productId)} >Delete Item</MDBBtn>
//                    </MDBCardBody>
//                  </MDBCard>
//                </MDBCol>
//              ))}
//            </MDBRow>
//          ) : (
//            <h1>No product found</h1>
//          )}
//          <hr/>
//          <div>
//           <h2>Total Price : {price} </h2>
//          </div>
//          <hr/>
//        <textarea placeholder='Enter others important details'
//        rows={4}
//        cols={60}
//        value={otherDetails}
//        onChange={(e)=>setOtherDetails(e.target.value)}></textarea>

//        {/* button for proceed */}
//           <div className="d-grid gap-2 col-6 mx-auto">
//          <MDBBtn onClick={()=>handlePlaceOrder(currentOrders)}
//          disabled={otherDetails.trim().length < 1} >Place Order</MDBBtn>
         
         
//        </div>
//        </div>
       
//      );
  
// }

// export default YourCart



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

    let ordersObj = {
      bucket: orders,
      totalPrice: price,
      otherDetails: otherDetails,
      userId: nowActiveUser.email,
      orderDate: new Date().toISOString()
    };

    console.log('orders object is', ordersObj); // ✅ no more [object Object]

    // save this order into order-history ("My Orders")
    let existingHistory = JSON.parse(localStorage.getItem('OrderHistory')) || [];
    existingHistory.push(ordersObj);
    localStorage.setItem('OrderHistory', JSON.stringify(existingHistory));

    // clear the cart
    localStorage.setItem('YourOrders', JSON.stringify([]));
    setCurrentOrders([]);
    setOtherDetails('');

    // navigate to success page
    navigate('/order-success');
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