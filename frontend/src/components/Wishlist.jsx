import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromWishlist } from '../slices/wishSlice';
// import { addToWishlist } from '../slices/wishSlice';
import {FaTrash} from 'react-icons/fa';


const Wishlist = ({ wishlistItems }) => {

    const { _id, image, title, price, category } = wishlistItems;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // remove wish item
    const removeWishlishHandler = (wishlistItems) => {
        dispatch(removeFromWishlist(wishlistItems));
    }

    return (

        <div className="py-6 px-2 relative h-full w-full max-w-sm rounded-lg flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition">

                        <button onClick={() => removeWishlishHandler(wishlistItems)} className='text-white bg-primary px-4 py-2'>
                            {/* <FaTrash className={` cursor-pointer text-white rounded-2xl  absolute top-8 right-4 z-10`}/> */}
                            Remove
                        </button>
        
            <Link className="relative border border-solid" to={`/product/${wishlistItems._id}`}>
                <img className="h-56 w-full transition duration-300 ease-in-out hover:scale-110" src={`${wishlistItems.image[0]}`} alt="" />
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
            </Link>

            <div className="p-2 flex-grow text-black">            
                    <p className="mb-[1px] text-sm tracking-tight uppercase">{wishlistItems.name}</p>
                    <p className="text-lg tracking-tight uppercase">USD {wishlistItems.price.toFixed(2)}</p>
            </div>

        </div>
        
    )
}

export default Wishlist
