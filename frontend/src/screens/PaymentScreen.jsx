import React from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice'


const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart;

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }   
    }, [shippingAddress, navigate]);

    const paymentHandler = async (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/checkout')
    }

  return (
<div className="flex justify-center items-center h-screen">
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1 className="text-3xl font-bold mb-4">Payment</h1>
        <form onSubmit={paymentHandler}>
            <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="paymentMethod">Select Method</label>
                <div className="col">
                    <input
                        type="radio"
                        className="mr-2"
                        id="paymentMethod"
                        name="paymentMethod"
                        value="PayPal"
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="paymentMethod" className="text-lg font-medium">PayPal or Credit Card</label>
                </div>
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Continue
            </button>
        </form>
    </FormContainer>
</div>

  )
}

export default PaymentScreen 