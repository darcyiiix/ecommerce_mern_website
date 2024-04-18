import React from 'react';

const CheckoutScreen = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 w-full max-w-3xl">
        {/* Column 1 */}
        <div className="col-span-1 md:col-span-6">
          {/* Billing and Address Details */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
            {/* Your billing details form */}
            {/* Example: */}
            <p>First Name: John</p>
            <p>Last Name: Doe</p>
            {/* Add more fields as needed */}
          </div>
        </div>
        {/* Column 2 */}
        <div className="col-span-1 md:col-span-6">
          {/* Order Details */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            {/* Your order details display */}
            {/* Example: */}
            <p>Product 1 - $10</p>
            <p>Product 2 - $20</p>
            <p>Total: $30</p>
            {/* Add more details as needed */}
          </div>
          {/* Selected Payment Method */}
          <div className="bg-gray-100 p-4 rounded-lg mt-8">
            <h2 className="text-lg font-semibold mb-4">Selected Payment Method</h2>
            {/* Your selected payment method display */}
            {/* Example: */}
            <p>Payment Method: Credit Card</p>
            {/* Add more details as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
