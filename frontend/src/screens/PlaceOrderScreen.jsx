import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Button, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { toast } from 'react-toastify';
import { clearCartItems } from '../slices/cartSlice'
import { useCreateOrderMutation } from '../slices/ordersApiSlice'


const PlaceOrderScreen = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart)
  const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  useEffect(() => {
      if(!cart.shippingAddress.address){
          navigate('/shipping')
      } else if(!cart.paymentMethod){
          navigate('/payment');
      }
  }
  , [cart.shippingAddress, cart.paymentMethod, navigate]);

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
        console.log(error)
    }
}

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Place Order</h1>
                
                {/* Shipping Address */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <p>{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                </div>
                
                {/* Payment Method */}
                <div className="mb-8">
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </p>
                </div>
                
                {/* Ordered Items */}
                <div>
                {cart.cartItems.length === 0 ? (<Message>Your cart is empty</Message>) : (
                        <ListGroup variant='flush'>
                        {cart.cartItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                    <Image
                                    src={item.image[0]}
                                    alt={item.name}
                                    fluid
                                    rounded>
                                    </Image>
                                </Col>

                                <Col> <Link to={`/products/${item.product}`}>{item.name}</Link> </Col>

                                <Col md={4}>{item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}</Col>
                            </Row>

                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    )}

                </div>
                
                {/* Place Order Button */}
                <div className="mt-8">
                      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block" onClick={placeOrderHandler} >Place Order</Button>
                      {isLoading && <Loader />}
                </div>
            </div>

            
        </div>
    );
};

export default PlaceOrderScreen;
