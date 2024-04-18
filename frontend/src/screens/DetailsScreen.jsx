import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
// import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify';

const DetailsScreen = () => {
    const cart = useSelector((state) => state.cart);
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    const { cartItems } = cart

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!cart.shippingAddress.address || !cart.paymentMethod){
            navigate('/checkout');
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

    console.log(cart)
    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.shippingTax,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    }
    return (
    
      <div className='p-8'>

          <h1 className="text-2xl mb-8 text-center">Order Details</h1>

              <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                  <div className="px-4 mb-4">
                  {/* <p className="text-xl font-medium mb-1">Order Summary</p> */}
                  <p>
                          <strong>Shipping address: </strong>
                          {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
                  </div>
              </div>

              <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                  <div className="px-4">
                  <p className="mb-1"> <strong> Payment Method: </strong> {cart.paymentMethod}</p>
                  {/* <p className="text-sm font-semibold ">{cart.paymentMethod}</p> */}
                  </div>
              </div>          

          <div className="grid sm:px-10 lg:grid-cols-1 lg:px-20 xl:px-32">
            <div className="px-4">
              {/* <p className="text-xl font-medium">Order Summary</p> */}
              <div className="mt-8 space-y-3 rounded-lg border-b px-2 py-4 sm:px-6">
                {
                  cart.cartItems.map((item, index) => (
                    <div className="flex max-[520px]:flex-col rounded-lg flex-row max-[520px]:items-center max-[520px]:text-center">
                    <img className="m-2 h-24 w-28 object-cover object-center" src={item.image[0]} alt={item.name}/>
                    <div className="flex w-full flex-col px-4 py-4">
                      <span  className='font-semibold'><Link to={`/products/${item.product}`}>{item.name}</Link></span>
                      <p className="text-lg">{item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                  ))}
              </div>
          
                    {/* <!-- Total --> */}
                <div className="mt-6 border-t border-b py-2">
                    <h2 className="text-sm text-gray-900 pb-3">Order Summary</h2>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Items</p>
                    <p className="font-semibold text-gray-900">${cart.itemsPrice}</p>
                  </div>
          
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                    <p className="font-semibold text-gray-900">${cart.shippingPrice}</p>
                  </div>
          
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Tax</p>
                    <p className="font-semibold text-gray-900">${cart.shippingTax}</p>
                  </div>
          
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Subtotal</p>
                    <p className="text-2xl font-semibold text-gray-900">${cart.totalPrice}</p>
                </div>
          
                <center>
                  <button className="mt-4 mb-8 w-1/2 bg-primary py-2 text-white" disabled={cart.cartItems.length === 0} onClick={ placeOrderHandler }>Place Order</button>
                </center>
          
            </div>
          </div>
          
      </div> 

    
    );
}

export default DetailsScreen