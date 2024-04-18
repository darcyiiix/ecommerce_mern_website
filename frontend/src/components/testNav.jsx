import React, { useState } from 'react';
import Logo from '../public/images/logo.png';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaHeart, FaUser, FaTruck, FaList } from 'react-icons/fa';
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

    const { wishlistItems } = useSelector((state) => state?.wishlist);

    const getTotalWishlistItems = () => {
        return wishlistItems.length;
    };
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err){
            console.log(err);
        }
    }

    const check = () => {
        console.log('hello')
    }


    return (
        
        <nav className="bg-primary_grey sticky top-0 z-[1000]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
                    <img src={Logo} className="h-16" alt="Logo" />
                </Link>

                <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-md md:hidden focus:outline-none text-primary" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto " id="navbar-dropdown">
                    <ul className="flex flex-col items-center max-md:items-start font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-primary-grey md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                    
                        <ul className='text-black hidden max-md:block w-full'>
                            <li className='py-1 px-3 hover:bg-primary_grey hover:underline'>new</li>
                            <li className='py-1 px-3 hover:bg-primary_grey hover:underline'><Link to={'/categories/lampshades'}>lampshades</Link></li>
                            <div className='bg-primary border   mt-8 mb-2'></div>

                        </ul>

                        <li>
                        {userInfo && userInfo.isAdmin && (
                        
                        <>
                                            <div className="hidden w-full md:block md:w-auto " id="navbar-dropdown">
                    <ul className="flex flex-col items-center max-md:items-start font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-primary-grey md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                    
                        <ul className='text-black hidden max-md:block w-full'>
                            <li className='py-1 px-3 hover:bg-primary_grey hover:underline'>new</li>
                            <li className='py-1 px-3 hover:bg-primary_grey hover:underline'><Link to={'/categories/lampshades'}>lampshades</Link></li>
                            <div className='bg-primary border   mt-8 mb-2'></div>

                        </ul>


                        <li>
                            { userInfo ? (
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" onClick={(e) => check} className="btn py-2 px-3 shadow-none bg-transparent border-none text-primary hover:text-primary_dark hover:bg-transparent max-md:text-gray-400 max-md:hover:text-black">Admin Panel <FaUser className='ml-1.5 max-md:hidden'/></div>


                                            <ul tabIndex={0} className="z-[100] dropdown-content z-[1] menu p-2 shadow-2xl text-black rounded-box w-52 bg-white">
                                            <Link to='/admin/productlist'><li className='hover:bg-primary_grey hover:underline'><a >Products</a></li></Link>
                                            <Link to='/admin/userlist'><li className='hover:bg-primary_grey hover:underline'><a >Users</a></li></Link>
                                            <Link to='/admin/orderlist'><li className='hover:bg-primary_grey hover:underline'><a >Orders</a></li></Link>
                                            {/* <Link to='/profile'><li className='hover:bg-primary_grey hover:underline'><a >Profile</a></li></Link> */}
                                            </ul>
                                        
                                </div>
                            ) : (
                                <LinkContainer to='/login'>
                                    <div tabIndex={0} role="button" onClick={(e) => check} className="btn py-2 px-3 shadow-none bg-transparent border-none text-primary hover:text-primary_dark hover:bg-transparent max-md:text-gray-400 max-md:hover:text-black">sign in <FaUser className='ml-1.5 max-md:hidden'/></div>
                                </LinkContainer>
                                
                            ) }

                        </li>
                    </ul>
                </div>
                        </>
                            
                        )}
                        </li>



                        <li>
                            { userInfo ? (
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" onClick={(e) => check} className="btn py-2 px-3 shadow-none bg-transparent border-none text-primary hover:text-primary_dark hover:bg-transparent max-md:text-gray-400 max-md:hover:text-black">{userInfo.name} <FaUser className='ml-1.5 max-md:hidden'/></div>


                                            <ul tabIndex={0} className="z-[100] dropdown-content z-[1] menu p-2 shadow-2xl text-black rounded-box w-52 bg-white">
                                            <Link to='/profile'><li className='hover:bg-primary_grey hover:underline'><a >Profile</a></li></Link>
                                            <li className='hover:bg-primary_grey hover:underline'><a onClick={logoutHandler} >Logout</a></li>
                                            {/* <Link to='/profile'><li className='hover:bg-primary_grey hover:underline'><a >Profile</a></li></Link> */}
                                            </ul>
                                        
                                </div>
                            ) : (
                                <LinkContainer to='/login'>
                                    <div tabIndex={0} role="button" onClick={(e) => check} className="btn py-2 px-3 shadow-none bg-transparent border-none text-primary hover:text-primary_dark hover:bg-transparent max-md:text-gray-400 max-md:hover:text-black">sign in <FaUser className='ml-1.5 max-md:hidden'/></div>
                                </LinkContainer>
                                
                            ) }

                        </li>

                        <li>
                            <Link to="/wishlist" className="flex items-center text-primary hover:text-primary_dark hover:text-primary_dark transition py-2 px-3 max-md:text-gray-400 max-md:hover:text-black" aria-current="page">wishlist
                            ({wishlistItems.length})
                            </Link>
                        </li>

                        <li>
                            <Link to='/cart'>
                                <a className="flex items-center text-primary hover:text-primary_dark transition py-2 px-3 max-md:text-gray-400 max-md:hover:text-black" aria-current="page"> cart <FaShoppingCart className="ml-1.5 max-md:hidden" />
                                {cartItems.length > 0 && (
                                                <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                                    ({cartItems.reduce((a, c) => a + c.qty, 0)})
                                                </Badge>
                                )} 
                                </a>
                            </Link>
                        </li>


                    </ul>
                </div>
            </div>



            <div className='bg-primary p-2 w-full flex flex-wrap items-center justify-around'>

                <div className="dropdown max-md:hidden">

                    <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none text-white hover:bg-primary_dark px-4 "><FaList /> categories</div>
                    <ul tabIndex={0} className="z-[500] dropdown-content z-[1] menu p-2 shadow-2xl text-black rounded-md w-52 bg-white">
                        <li className='hover:bg-primary_grey hover:underline'><Link to={'/categories/lampshades'}>lampshades</Link></li>
                        </ul>

                </div>

                <div className="relative w-4/12  max-md:w-4/6">
                    <SearchBar />
                </div>      

                <p className='flex items-center inline text-white max-md:hidden'> <FaTruck className='mr-1'/> Free delivery for orders over $20</p>

            </div>
            
            {/* {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>
                                        Products
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>
                                        Users
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>
                                        Orders
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                            
                        )} */}
            
        </nav>
    );
};

export default Navbar;


{/* <nav className="bg-primary_grey">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <p> call us: 020 7351 3003</p>

                    <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
                        <img src="../public/images/logo.png" className="h-20" alt="Logo" />
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
                            <a href="#" className="flex items-center  text-primary hover:text-primary_dark border-b-2 border-transparent hover:text-primary_dark hover:border-b-2 hover:border-primary_dark transition pb-2" aria-current="page">sign in <FaUser className="ml-1.5" /> </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-primary hover:text-primary_dark border-b-2 border-transparent hover:text-primary_dark hover:border-b-2 hover:border-primary_dark transition pb-2" aria-current="page">wishlist <FaHeart className="ml-1.5" /> </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center text-primary border-b-2 border-transparent hover:text-primary_dark hover:border-b-2 hover:border-primary_dark transition pb-2" aria-current="page"> cart <FaShoppingCart className="ml-1.5" /> </a>
                        </li>
                     
                    </ul>
                </div>

            </div>

    <div className='bg-primary p-3 w-full flex flex-wrap items-center justify-around'>

        <p className='flex items-center inline text-white'> <FaLightbulb className='mr-1' /> Hassle-free returns </p>
        {/* <p className='flex inline'> Free delivery for orders over $20 <FaTruck/></p> */}

    //     <div className="relative w-4/12">
    //         <input
    //             type="search"
    //             className="w-full flex-auto rounded-full border border-1 border-solid border-white text-white bg-transparent bg-clip-padding pl-10 pr-1 py-[0.25rem] placeholder:text-white placeholder:opacity-50 focus:outline-none"
    //             id="exampleSearch"
    //             placeholder="Search"
    //         />
    //         <button className='absolute left-3 top-1/2 transform -translate-y-1/2'> <FaSearch className='text-white'/> </button>
    //     </div>      

    //     <p className='flex items-center inline text-white'> <FaTruck className='mr-1'/> Free delivery for orders over $20</p>

    // </div>

    // </nav> */}