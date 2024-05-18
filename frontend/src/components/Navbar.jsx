import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaHeart, FaUser, FaTruck, FaLightbulb } from 'react-icons/fa';
import { Badge, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearCartItems } from '../slices/cartSlice';
import SearchBar from './SearchBar';

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
                <p> call us: 020 7351 3003</p>
                <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
                    <img src="../images/logo.png" className="h-20" alt="Logo" />
                </Link>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="bg-white font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-primary_grey dark:border-gray-700">
                        <li>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to='/profile'> 
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>

                                
                                    <NavDropdown.Item onClick={ logoutHandler }>
                                        Logout
                                    </NavDropdown.Item>

                            </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <a className="flex items-center text-primary hover:text-primary_dark border-b-2 border-transparent hover:text-primary_dark hover:border-b-2 hover:border-primary_dark transition pb-2" aria-current="page">sign in <FaUser className="ml-1.5" /> </a>
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </li>
                        <li>
                            <Link to='/wishlist' className="flex items-center text-primary hover:text-primary_dark border-b-2 border-transparent hover:text-primary_dark hover:border-b-2 hover:border-primary_dark transition pb-2" aria-current="page">wishlist </Link>
                        </li>
                        <li>
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                    <a className="flex items-center text-primary border-b-2 border-transparent hover:text-primary_dark hover:border-b-2 hover:border-primary_dark transition pb-2" aria-current="page"> cart <FaShoppingCart className="ml-1.5" />
                                        {cartItems.length > 0 && (
                                            <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                                            </Badge>
                                        )}
                                    </a>
                                </Nav.Link>
                            </LinkContainer>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='bg-primary p-3 w-full flex flex-wrap items-center justify-around'>
                <p className='flex items-center inline text-white'> <FaLightbulb className='mr-1' /> Hassle-free returns </p>
                <div className="relative w-4/12">
                    <SearchBar />
                </div>
                <p className='flex items-center inline text-white'> <FaTruck className='mr-1' /> Free delivery for orders over $200</p>
            </div>
        </nav>
    );
};

export default Navbar;

