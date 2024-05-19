import React, { useState, useEffect } from 'react';
import Logo from '../public/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaHeart, FaUser, FaTruck, FaList } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import SearchBar from './SearchBar';

const Navbar = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const { wishlistItems } = useSelector((state) => state?.wishlist);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const { data: productsData, isLoading, error } = useGetProductsQuery({});

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        console.log('useEffect triggered');
        if (productsData && productsData.products && Array.isArray(productsData.products)) {
            console.log('Products data:', productsData.products);
            const uniqueCategories = [...new Set(productsData.products.map(product => product.category))];
            setCategories(uniqueCategories);
            console.log('Categories set:', uniqueCategories);
        } else {
            console.log('Products data is not an array or is undefined');
        }
    }, [productsData]);

    const getTotalWishlistItems = () => {
        return wishlistItems.length;
    };

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) return <p>Loading...</p>; // or a loading spinner
    if (error) return <p>Error loading categories</p>;

    return (
        <nav className="bg-primary_grey sticky top-0 z-[1000]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
                    <img src={Logo} className="h-16" alt="Logo" />
                </Link>

                <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-md md:hidden focus:outline-none text-primary" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex flex-col items-center max-md:items-start font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-primary-grey md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
                        <li>
                            {userInfo && userInfo.isAdmin && (
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn py-2 px-3 shadow-none bg-transparent border-none text-primary hover:text-primary_dark hover:bg-transparent max-md:text-gray-400 max-md:hover:text-black">Admin Panel <FaUser className='ml-1.5 max-md:hidden' /></div>
                                    <ul tabIndex={0} className="z-[100] dropdown-content z-[1] menu p-2 shadow-2xl text-black rounded-box w-52 bg-white">
                                        <Link to='/admin/productlist'><li className='hover:bg-primary_grey hover:underline'><a>Products</a></li></Link>
                                        <Link to='/admin/userlist'><li className='hover:bg-primary_grey hover:underline'><a>Users</a></li></Link>
                                        <Link to='/admin/orderlist'><li className='hover:bg-primary_grey hover:underline'><a>Orders</a></li></Link>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li>
                            {userInfo ? (
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn py-2 px-3 shadow-none bg-transparent border-none text-primary hover:text-primary_dark hover:bg-transparent max-md:text-gray-400 max-md:hover:text-black">{userInfo.name} <FaUser className='ml-1.5 max-md:hidden' /></div>
                                    <ul tabIndex={0} className="z-[100] dropdown-content z-[1] menu p-2 shadow-2xl text-black rounded-box w-52 bg-white">
                                        <Link to='/profile'><li className='hover:bg-primary_grey hover:underline'><a>Profile</a></li></Link>
                                        <li className='hover:bg-primary_grey hover:underline'><a onClick={logoutHandler}>Logout</a></li>
                                    </ul>
                                </div>
                            ) : (
                                <LinkContainer to='/login'>
                                    <div tabIndex={0} role="button" className="btn py-2 px-3 shadow-none bg-transparent border-none text-primary hover:text-primary_dark hover:bg-transparent max-md:text-gray-400 max-md:hover:text-black">sign in <FaUser className='ml-1.5 max-md:hidden' /></div>
                                </LinkContainer>
                            )}
                        </li>
                        <li>
                            <Link to="/wishlist" className="flex items-center text-primary hover:text-primary_dark hover:text-primary_dark transition py-2 px-3 max-md:text-gray-400 max-md:hover:text-black" aria-current="page">wishlist ({wishlistItems.length})</Link>
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
                    <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none text-white hover:bg-primary_dark px-4"><FaList /> categories</div>
                    <ul tabIndex={0} className="z-[500] dropdown-content z-[1] menu p-2 shadow-2xl text-black rounded-md w-52 bg-white">
                        {categories.map(category => (
                            <li key={category} className='hover:bg-primary_grey hover:underline'>
                                <Link to={`/products/${category.toLowerCase()}`}>{category}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative w-4/12 max-md:w-4/6">
                    <SearchBar />
                </div>
                <p className='flex items-center inline text-white max-md:hidden'><FaTruck className='mr-1' /> Free delivery for orders over $20</p>
            </div>
        </nav>
    );
};

export default Navbar;
