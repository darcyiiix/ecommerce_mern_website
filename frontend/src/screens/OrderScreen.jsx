import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation
} from '../slices/ordersApiSlice';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();
  const { userInfo } = useSelector((state) => state.auth);


  const style = { "color": "silver" };

  useEffect(() => {
    if (!loadingPayPal && !errorPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [paypal, order, loadingPayPal, errorPayPal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment successful');
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    }).then((orderId) => { return orderId; });
  }

  function onError(err) {
    toast.error(err.message);
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };


  return isLoading ? (<Loader />) : error ? (<Message variant='danger' />) : (
    <>
    {console.log(order)}
    <div className='p-8 max-[520px]:p-4'>
      <h1 className='text-2xl max-[520px]:text-xl font-semibold'>  Order {order._id}</h1>

      <div className='mt-12'>
        <div className='text-sm pb-6 mb-4 border-b'>
          <h2 className='text-2xl max-[520px]:text-xl font-semibold mb-2'>Shipping</h2>
          <p className='mb-4'>
            <strong>Name</strong> {order.user.name}
          </p>
          <p className='mb-4'>
            <strong>Email</strong> {order.user.email}
          </p>
          <p className='mb-4'>
            <strong>Address</strong> {order.shippingAddress.address}. {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (<Message variant='success'> Delivered at: {order.deliveredAt}</Message>) : (<Message variant='danger'>Not Delivered</Message>)}
        </div>

        <div className=' pb-6 mb-4 border-b'>
          <h2 className='text-2xl max-[520px]:text-xl font-semibold mb-4'>Payment Method</h2>
          <p className='text-sm mb-4'>
            <strong>Method: </strong> {order.paymentMethod}
          </p>
          {order.isPaid ? (<Message variant='success'>Paid on: {order.paidAt}</Message>) : (<Message variant='danger'>Not Paid</Message>)}
        </div>

        {/* <div>
          <h1>Order Items</h1>
          {order.orderItems.map((item, index) => (
            <div key={index}>
              <div>
                <img src={item.image[0]} alt={item.name} className='m-2 h-24 w-28 object-cover object-center' />
              </div>
              <div><Link to={`/product/${item.product}`}>{item.name}</Link></div>
              <div>{item.qty} x ${item.price} = ${item.qty * item.price}</div>
            </div>
          ))}
        </div> */}

      <div className='flex flex-row justify-between items-start mt-6 max-[940px]:flex-col'>
       
        <div className="my-8 space-y-3 rounded-lg">
                <h2 className='text-2xl max-[520px]:text-xl font-semibold mb-2'>Order Items</h2>

                    {
                    
                    order.orderItems.map((item, index) => (
                    <div key={item._id} className="flex rounded-lg">
                        <img className="m-2 h-16 w-20 object-cover object-center" src={item.image[0]} alt={item.name}/>
                        <div className="flex w-full flex-col px-4 py-4">
                        <span  className='font-semibold'><Link to={`/products/${item.product}`}>{item.name}</Link></span>
                        <p className="text-lg">{item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}</p>
                        { item.selectedDimension && <p className='text-lg'>{item.selectedDimension.diameter}cm x {item.selectedDimension.height}h</p>}
                        </div>
                    </div>
                    ))
                    
                    }
        </div>

        <div className='w-[350px] max-[940px]:w-full bg-white shadow-xl px-4 py-2 grow-0'>
            <h2 className='font-bold mb-2'>Order Summary</h2>
            <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Items</p>
                    <p className="font-semibold text-gray-900">${order.itemsPrice.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Shipping</p>
                    <p className="font-semibold text-gray-900">${order.shippingPrice.toFixed(2)}</p>
                </div>
            
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Tax</p>
                    <p className="font-semibold text-gray-900">${order.taxPrice.toFixed(2)}</p>
                </div>
            
            </div>
                    
            <div className="mt-6 flex items-center justify-between border-b mb-6 pb-6">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="text-xl font-semibold text-gray-900">${order.totalPrice.toFixed(2)}</p>
            </div>

            {isPending ? <Loader /> : (
          <div>
            {userInfo.isAdmin &&
              (
                <div>
                  <button onClick={onApproveTest} style={{ marginBottom: '10px' }}>Test Pay</button>
                </div>)}

            <div>

                <PayPalButtons         
                
                    style= {{
                    label: "",
                    color: 'white',
                    layout:  'vertical',

                }}

                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}>

                </PayPalButtons>

            </div>
          </div>
        )}
        </div>

        </div>


        {loadingPay && <Loader />}

        {loadingDeliver && <Loader />}
        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
          <div>
            <button type='button' onClick={deliverOrderHandler}>Mark As Delivered</button>
          </div>
        )}
      </div>
    </div>
    </>
  )
  
}

export default OrderScreen;
