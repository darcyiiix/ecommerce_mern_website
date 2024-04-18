import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaHeart, FaUser, FaTruck, FaLightbulb } from 'react-icons/fa';
import { Badge, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearCartItems } from '../slices/cartSlice';


const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(clearCartItems())
            navigate('/login');
        } catch (err){
            console.log(err);
        }
    }
    return (
        
        <nav className="bg-primary_grey">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
                    <img src="../public/images/logo.png" className="h-16" alt="Logo" />
                </Link>

                <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none text-white bg-primary hover:bg-primary_dark" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto " id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-primary-grey md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                        <li>
                            <a href="#" className="block text-primary hover:text-primary_dark hover:text-primary_dark transition px-3 py-2" aria-current="page">Home</a>
                        </li>

                        <li>
                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-start w-full md:w-auto text-primary hover:text-primary_dark hover:text-primary_dark transition py-2 px-3">sign in <FaUser className="ml-1.5" />  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                                </svg>
                            </button>

                            {/* <!-- Dropdown menu --> */}
                            <div id="dropdownNavbar" className="z-50 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-2xl w-44">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-primary-grey">Dashboard</a>
                                    </li>

                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-primary-grey">Settings</a>
                                    </li>

                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-primary-grey">Earnings</a>
                                    </li>
                                </ul>

                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                </div>
                            </div>
                        </li>

                        <li>
                            <Link to='/wishlist' href="#" className="flex items-center text-primary hover:text-primary_dark hover:text-primary_dark transition py-2 px-3 " aria-current="page">wishlist  </Link>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-primary hover:text-primary_dark transition py-2 px-3 " aria-current="page"> cart <FaShoppingCart className="ml-1.5" /> </a>
                        </li>

                    </ul>
                </div>
            </div>

            <div className='bg-primary p-3 w-full flex flex-wrap items-center justify-around'>

                <p className='flex items-center inline text-white  max-md:hidden'> <FaLightbulb className='mr-1' /> Hassle-free returns </p>

                <div className="relative w-4/12  max-md:w-4/6">
                    <input
                        type="search"
                        className="w-full flex-auto rounded-full border border-1 border-solid border-white text-white bg-transparent bg-clip-padding pl-10 pr-1 py-[0.25rem] placeholder:text-white placeholder:opacity-50 focus:outline-none"
                        id="exampleSearch"
                        placeholder="Search"
                    />
                    <button className='absolute left-3 top-1/2 transform -translate-y-1/2'> <FaSearch className='text-white'/> </button>
                </div>      

                <p className='flex items-center inline text-white max-md:hidden'> <FaTruck className='mr-1'/> Free delivery for orders over $20</p>

            </div>
        </nav>
    );
};

export default Navbar;
