//AddProducts.jsx 
import React, { useEffect, useState } from 'react'

const AddProducts = () => {
    const [productName,setProductName] = useState('');
    const [productImage,setProductImage] = useState('');
    const [productDescription,setProductDescription] = useState('');
    const [productPrice,setProductPrice] = useState('');
    const[quantity,setQuantity] = useState(0)
    //use state for gettitng products handling from localstorage 
    const [getProducts,setGetProducts] = useState([]);

    //addProductsHandler 
    const addProductsHandler = ()=>{
        
        let obj = {
            productId : Date.now().toString(),
            productName,
            productImage,
            productDescription,
            productPrice,
            quantity : 1
        }
        
        //clone already existing products
        let exitingProducts = [...getProducts];
        console.log(exitingProducts)

        //push new product to clone
        exitingProducts.push(obj)
        console.log(exitingProducts)

        // update getProducts useState
        setGetProducts(exitingProducts);
        console.log(getProducts)

        // we update local storage 
        localStorage.setItem('productList',JSON.stringify(exitingProducts))
        console.log('getProduct is ', exitingProducts)

        //clear states 
        setProductName('');
        setProductImage('');
        setProductDescription('');
        setProductPrice('');
        

    
    }

    //
    useEffect(()=>{
    let raw = localStorage.getItem('productList');
    if(raw){
        console.log('product list already exist in local storage');
        let jsonData = JSON.parse(raw);
        console.log(jsonData)
        setGetProducts(jsonData)
    }
    else{
        console.log('product list is not exist in localstorage')
        localStorage.setItem('productList',JSON.stringify([]))
        console.log('productList is created successfully in localstorage')
    }

    },[])
  return (
   <div>
    <h1>Add Products Page</h1>
    <div> 
        <label>
            ProductName : 
            <input
            type='text'
            placeholder='Enter product name' 
            value={productName}
            autoComplete='new-productName'
            onChange={(e)=>setProductName(e.target.value)}/>
        </label><br/>

         <label>
            Product Image : 
            <input
            type='text'
            placeholder='upload Image' 
            value={productImage}
            autoComplete='new-productImage'
            onChange={(e)=>setProductImage(e.target.value)}/>
        </label><br/>

         <label>
            Product Description : 
            <input
            type='text'
            placeholder='Enter product description' 
            value={productDescription}
            autoComplete='new-productDescription'
            onChange={(e)=>setProductDescription(e.target.value)}/>
        </label><br/>

         <label>
            Product Price : 
            <input
            type='text'
            placeholder='Enter product price' 
            value={productPrice}
            autoComplete='new-productPrice'
            onChange={(e)=>setProductPrice(e.target.value)}/>
        </label><br/>

        <button onClick={addProductsHandler}>Add product</button>
    </div>
   </div>
  )
}

export default AddProducts