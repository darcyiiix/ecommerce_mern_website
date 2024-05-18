import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify';
import { saveShippingAddress } from '../slices/cartSlice';
import { savePaymentMethod } from '../slices/cartSlice'



const Checkout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart)
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  

  useEffect(() => {
      if(!shippingAddress){
          console.log('No address found')
      }   
  }, [shippingAddress, navigate]);


  const submitHandler = (e) => {
    e.preventDefault();
    try {
        dispatch(saveShippingAddress({ address, city, postalCode, country}));
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/details');
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
};


    return ( <>

<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">

  
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      {
        cart.cartItems.map((item, index) => (
          <div className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.image[0]} alt={item.name}/>
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold"><Link to={`/products/${item.product}`}>{item.name}</Link></span>
            <p className="text-lg font-bold">{item.qty} x {item.price} = {(item.qty * item.price).toFixed(2)}</p>

            {item.selectedDimension && <p className="text-lg font-semibold">{item.selectedDimension.diameter}cm x {item.selectedDimension.height}h</p> }
            {item.selectedColor && <p className="text-lg font-semibold">{item.selectedColor}</p> }
            
          </div>
        </div>
        ))}
    </div>

          {/* <!-- Total --> */}
          <div className="mt-6 border-t border-b py-2">
          <h2 className="text-sm font-medium text-gray-900 pb-3">Order Summary</h2>
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

      <button className="mt-4 mb-8 w-full rounded-md bg-primary px-6 py-3 font-medium text-white" onClick={ submitHandler }>Proceed To Payment</button>


  </div>

  
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">

    
    {/* <p className="text-xl font-medium">Payment Details</p>
    <p className="text-gray-400">Complete your order by providing your payment details.</p> */}
    <div className="">
      {/* <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div className="relative">
        <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>
      <label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
      <div className="relative">
        <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        </div>
      </div>
      <label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
      <div className="flex">
        <div className="relative w-7/12 flex-shrink-0">
          <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
            </svg>
          </div>
        </div>
        <input type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
        <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
      </div>  */}



      <p className="text-xl font-medium my-4">Shipping Details</p>
      {/* <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <input type="text" id="country" name="country" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Country" />
        </div>
        <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
          <option value="State">State</option>
        </select>
        <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
      </div> */}

{/* 
      <div className="relative mt-4">
        <input type="text" id="first-Name" name="fname" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="First Name *" />
      </div>

      <div className="relative mt-4">
        <input type="text" id="last-Name" name="lname" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Last Name *" />
      </div> */}

    <div className="relative mt-4">
      <input type="text" id="hs-address" name="hsaddress" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="House number and street name" />
    </div>

    <div className="relative mt-4">
      <input type="text" id="town-city" name="town-city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Town / City *" />
    </div>

    <div className="relative mt-4">
      <input type="text" id="app-suite-unit" name="appsuite" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Postcode *" />
    </div>

    <div className="relative mt-4">
      <input type="text" id="app-suite-unit" name="appsuite" value={country} onChange={(e) => setCountry(e.target.value)}className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Country *" />
    </div>



     {/* <select id="countries" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 mt-4" placeholder="Country">
        <option selected>Choose a country</option>

        {countries.map((country) => (
            <option value="country" onChange={(e) => setStateCountry(e.target.value)}>{country}</option>
        ))}
    </select> */}

  
      <div className="relative mt-4">
      <label htmlFor="notes" className="mt-4 mb-2 block text-sm font-medium">Order Notes</label>  
        <textarea id="notes" name="notes" rows="4" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Add custom requirments for your order (optional)" />
      </div>

    </div>

          <div>
        <FormContainer>
        <h1 className="text-3xl font-bold mb-4">Payment</h1>
        <form>
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
        </form>
    </FormContainer>
         </div>
  </div>
</div>
    </> );
}
 
export default Checkout;