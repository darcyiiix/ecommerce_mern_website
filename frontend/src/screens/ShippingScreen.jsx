import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutStepper from '../components/CheckoutStepper';

const ShippingScreen = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

 
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            dispatch(saveShippingAddress({ address, city, postalCode, country}));
            navigate('/payment');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (

        <>
        <CheckoutStepper step1 step2/>

        <div className="font-sans text-gray-900">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
                    <div className="max-md:text-center">
                        <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
                            Shipping Information
                        </h2>
                        <p className="text-sm mt-6">Please provide your shipping information.</p>
                    </div>
                    <form className="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full">
                        <div>
                            <input
                                name="address"
                                type="text"
                                autoComplete="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                                placeholder="Address"
                            />
                        </div>
                        <div>
                            <input
                                name="city"
                                type="text"
                                autoComplete="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                                placeholder="City"
                            />
                        </div>
                        <div>
                            <input
                                name="postalCode"
                                type="text"
                                autoComplete="postal-code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                                placeholder="Postal Code"
                            />
                        </div>
                        <div>
                            <input
                                name="country"
                                type="text"
                                autoComplete="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                                placeholder="Country"
                            />
                        </div>
                        <div className="mt-10">
                            <button
                                type="button"
                                onClick={submitHandler}
                                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default ShippingScreen;
