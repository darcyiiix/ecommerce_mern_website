import React, { useState } from "react";
import AccountDetails from "../components/AccountDetails";
import MyAccount from "../components/MyAccount";
import MyOrders from "../components/MyOrders";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {

    const navigate = useNavigate();
    // State to track which component to display
    const [activeComponent, setActiveComponent] = useState("MyAccount");

    // Function to set the active component
    const handleComponentChange = (componentName) => {
        setActiveComponent(componentName);
    };

    // Render component based on activeComponent state
    const renderComponent = () => {
        switch (activeComponent) {
            case "AccountDetails":
                return <AccountDetails />;
            case "MyOrders":
                return <MyOrders />;
            case "MyWishlist":
                navigate('/wishlist')
            default:
                return <MyAccount />;
        }
    };

    return ( 
        <>
        <div className={`${activeComponent === "MyOrders" ? "flex-col" : "flex-row"} flex justify-start gap-4 py-8 px-14 max-md:flex-col max-md:px-4`}>
            <div className={`border-r-2 ${activeComponent === "MyOrders" ? "w-full" : "w-4/12"} max-md:w-full`}>
                <ul className={`text-md flex ${activeComponent === "MyOrders" ? "flex-row justify-start" : "flex-col justify-start" } max-md:flex-row gap-8`}>

                    <li className={`${activeComponent === "MyAccount" ? "underline" : " "} cursor-pointer mb-6 hover:text-primary_dark`} onClick={(e) => handleComponentChange("MyAccount")}>
                            My Account
                    </li>

                    <li className={`${activeComponent === "AccountDetails" ? "underline" : " "} cursor-pointer mb-6 hover:text-primary_dark`} onClick={(e) => handleComponentChange("AccountDetails")}>
                            Account Details
                    </li>

                    <li className={`${activeComponent === "MyOrders" ? "underline" : " "} cursor-pointer mb-6 hover:text-primary_dark`} onClick={(e) => handleComponentChange("MyOrders")}>
                            My Orders
                    </li>

                    <li className={`${activeComponent === "MyWishlist" ? "underline" : " "} cursor-pointer mb-6 hover:text-primary_dark`} onClick={(e) => handleComponentChange("MyWishlist")}>
                            My Wishlist
                    </li>

                </ul>
            </div>

            <div className="w-full text-2xl px-4">
                {renderComponent()} 
            </div>
        </div>
        </>
     );
};
 
export default ProfileScreen;
