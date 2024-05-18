// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaTrash } from 'react-icons/fa';
// import Message from '../components/Message';
// // import { Row } from 'react-bootstrap';
// import { addToCart } from '../slices/cartSlice'; 

// const ShippingScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;
//   console.log(cartItems)

//   const [quantities, setQuantities] = useState({}); // State to hold quantities for each item

//   // Function to handle quantity change for a specific item
//   const handleQuantityChange = (itemId, newQuantity) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [itemId]: newQuantity,
//     }));
//   };

//   const decrementQuantity = (itemId) => {
//     const currentQuantity = quantities[itemId] || 1; // Default to 1 if quantity is not set
//     if (currentQuantity > 1) {
//       handleQuantityChange(itemId, currentQuantity - 1);
//     }
//   };

//   const incrementQuantity = (itemId, countInStock) => {
//     const currentQuantity = quantities[itemId] || 0; // Default to 0 if quantity is not set
//     if (currentQuantity < countInStock) {
//       handleQuantityChange(itemId, currentQuantity + 1);
//     }
//   };

//   // Calculate the total price including taxes
//   const totalPriceWithTax = cartItems.reduce((acc, item) => {
//     return acc + (item.price * (quantities[item._id] || 1));
//   }, 0) + Number(cart.shippingTax);

//   const addToCartHandler = () => {
//     console.log('addtocart')
//   }

//   const proceedToCheckoutHandler = () => {
//     navigate('/login?redirect=/checkout');
//   }

//   return (
//     <div className='p-8 items-center' >
//       {/* <Row> */}
//         <h1 className="text-3xl text-center mb-8 font-light">your basket</h1>
//       <div className='text-2xl'>

//         {cartItems.map((item) => (
//           <div key={item._id} className="px-8 mb-4">
//             <div className="container mx-auto px-4">
//               <div className="flex flex-col justify-center md:flex-row gap-4">
//                 <div className="md:w-3/4">
//                   <div className="bg-white rounded-lg border-b p-6 mb-4">
//                     <table className="w-full">
//                       <thead>
//                         {/* <tr className='mb-2'>
//                           <th className="text-left font-normal">product</th>
//                           <th className="text-left font-normal">price</th>
//                           <th className="text-left font-normal">quantity</th>
//                           <th className="text-left font-normal">total </th>
//                           <th className="text-left "></th>
//                         </tr> */}
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td className="py-4">
//                             <Link to={`/product/${item._id}`}>
//                               <div className="flex items-center">
//                                 <img className="h-16 w-16 mr-4" src={item.image[0]} alt={item.name} />
//                                 <span className="">{item.name}</span>
//                               </div>
//                             </Link>
//                           </td>
//                           <td className="py-4 text-red-500">${item.price.toFixed(2)}</td>
//                           <td className="py-4">
//                             <div className="flex items-center">
//                               <button className="border rounded-md py-2 px-4 mr-2" onClick={() => decrementQuantity(item._id)} onChange={(e) => addToCartHandler(item._id, Number(e.target.value))}>−</button>
//                               <span className="text-center w-8">{quantities[item._id] || 1}</span>
//                               <button className="border rounded-md py-2 px-4 ml-2" onClick={() => incrementQuantity(item._id, item.countInStock)}>+</button>
//                             </div>
//                           </td>
//                           <td className="py-4 text-red-500">${(item.price * (quantities[item._id] || 1)).toFixed(2)} <a className='block underline text-[12px] text-red-700' href='#'>Remove</a></td>
//                         </tr>
//                         {/* More product rows */}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//           </div>
          
//         ))}

//       </div>

//       {/* </Row> */}
//       <div className="md:w-1/4 mb-4">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-lg font-semibold mb-4">Summary</h2>
//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)} Items</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Taxes</span>
//             <span>${cart.shippingTax}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Shipping</span>
//             <span>${cart.shippingPrice}</span>
//           </div>
//           <hr className="my-2" />
//           <div className="flex justify-between mb-2">
//             <span className="font-semibold">Total</span>
//             <span className="font-semibold">${totalPriceWithTax}</span>
//           </div>
//           <button onClick={proceedToCheckoutHandler}className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShippingScreen;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Form } from 'react-bootstrap';
import Alert from '../components/Alert';
import { addToCart, removeFromCart} from '../slices/cartSlice'; 

const ShippingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems)
  console.log(cart)

  const [quantities, setQuantities] = useState({});
  const [showAlert, setShowAlert] = useState(false); // State to hold quantities for each item

  // Function to handle quantity change for a specific item
  const handleQuantityChange = (itemId, newQuantity) => {
    console.log(newQuantity)
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
      
    }));

  };

  const decrementQuantity = (itemId) => {
    const currentQuantity = quantities[itemId] || 1;
    // Default to 1 if quantity is not set
    if (currentQuantity > 1) {
      handleQuantityChange(itemId, currentQuantity - 1);
    }
  };

  const incrementQuantity = (itemId, countInStock) => {
    const currentQuantity = quantities[itemId] || 0; // Default to 0 if quantity is not set
    if (currentQuantity < countInStock) {
      handleQuantityChange(itemId, currentQuantity + 1);
    }
  };

  // Calculate the total price including taxes
  const totalPriceWithTax = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.qty);
  }, 0) + Number(cart.shippingTax) + Number(cart.shippingPrice);

  const addToCartHandler = async (product, qty) => {
    console.log(product,qty)
    dispatch(addToCart({...product, qty}));
  }

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000)
  }

  const proceedToCheckoutHandler = () => {
    navigate('/login?redirect=/checkout');
  }

  return (
    <>
    { cartItems.length === 0 ? (
      <h1 className='text-center text-2xl font-light'>Your cart is empty </h1>
    ) 
    
    : (
      <>
        <div>
          {showAlert && <Alert mode="success" message={"Product removed from cart"} />}
        </div>

        <div className='p-8 max-sm:p-0 items-center w-4/6 mx-auto max-[900px]:w-full' >
        <h1 className="text-3xl text-center mb-8 font-light">your basket</h1>
        <table className="w-full px-8">
          <thead className='max-sm:hidden'>
            <tr className='mb-2 text-xl'>
              <th className="text-left font-normal">product</th>
              <th className="text-left font-normal">price</th>
              <th className="text-left font-normal">quantity</th>
              <th className="text-left font-normal">total </th>
              <th className="text-left "></th>
            </tr>
          </thead>
          <tbody className=''>
            {cartItems.map((item) => (
              <tr key={item._id} className="px-8 max-[470px]:p-1 mb-4 border-b max-sm:flex max-sm:flex-col max-sm:items-center">
                <td className="py-4 max-sm:self-start">
                  <Link to={`/product/${item._id}`}>
                    <div className="flex items-center">
                      <img className="h-16 w-16 mr-4" src={item.image[0]} alt={item.name} />
                      <span className="">{item.name}</span>
                    </div>
                  </Link>
                </td>

                {/* Small screen version */}

              <div className='hidden max-sm:block flex items-center'>
                  <td className="py-4 text-red-500"> <span className='text-black'>Price:</span> ${item.price.toFixed(2)}</td>
                  <td className="py-4">
                    <div className="flex items-center mx-4">
                    
                    <Form.Control as='select' value={item.qty} onChange={ (e) => {addToCartHandler(item, Number(e.target.value))} }>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={ x + 1 } key={ x + 1}>
                            { x + 1 }
                          </option>
                            ))}
                      </Form.Control>
                    </div>
                  </td>
                  <td className="py-4 text-red-500"><span className='text-black'>Total:</span> ${(item.price * (quantities[item._id] || 1)).toFixed(2)} </td>
                  <td> <a className='block underline ml-6 text-red-500' href='#'><FaTrash /></a></td>

              </div>

                {/* big screen version */}

                <td className="max-sm:hidden py-4 text-red-500"> ${item.price.toFixed(2)}</td>
                <td className="max-sm:hidden py-4">
                  <div className="flex items-center">
                  <Form.Control as='select' value={item.qty} onChange={ (e) => {addToCartHandler(item, Number(e.target.value))} }>
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option value={ x + 1 } key={ x + 1}>
                            { x + 1 }
                          </option>
                            ))}
                      </Form.Control>
                  </div>
                </td>
                  <td className="max-sm:hidden py-4 text-red-500">${(item.price *  item.qty).toFixed(2)} <a href="#" onClick={() => removeFromCartHandler(item._id)} className='block underline text-[12px] text-red-700'>Remove</a></td>
              </tr>
              
            ))}
          </tbody>
        </table>

        <div className="mb-4">
          <div className="lg p-6 text-center">
            <h2 className="text-3xl font-light text-center mb-4">summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)} Items</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Taxes</span>
              <span>${cart.shippingTax}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${totalPriceWithTax}</span>
            </div>
            <button onClick={proceedToCheckoutHandler}className="bg-primary hover:bg-primary_dark transition text-white py-2 px-8 mt-4 text-center w-1/2">checkout</button>
          </div>
        </div>
      </div>
    </>
    )}
        
    </>


  );
};

export default ShippingScreen;
