import React from 'react'
import { useSelector } from 'react-redux';
import Wishlist from '../components/Wishlist';

const WishlistScreen = () => {


    const { wishlistItems } = useSelector((state) => state?.wishlist || {});

    // console.log(wishlistItems.length)


    return (        
        
        <div className='px-24 py-8 max-sm:px-8'>
            <p className={`text-xl font-light ${wishlistItems.length > 0 ? "block" : "hidden"}`}>Your wishlisted items </p>

            {
                wishlistItems.length > 0 ? 

                <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1"> 
                    { wishlistItems.map((product) => <div key={product._id}> <Wishlist wishlistItems={product}/> </div>) }
                </div> 
                
                : <h1 className='text-center text-2xl font-light'>Your wishlist is empty </h1>
            }
        </div>
        
    )
}

export default WishlistScreen;