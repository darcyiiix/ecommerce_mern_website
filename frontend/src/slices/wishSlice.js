import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    wishlistItems: localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem("wishlistItems")) : [],
}



const wishSlice = createSlice({
    name: 'wishlist',
    initialState,
    
    reducers: {

        addToWishlist: (state, action) => {
            let eachWishproductIndex = state.wishlistItems.findIndex((item) => item?._id === action.payload?._id);

            if (eachWishproductIndex >= 0) {
                alert('You cannot add this to wishlists anymore it is married!');
            } else {
                let assembledItem;
                assembledItem = { ...action.payload }
                state.wishlistItems.push(assembledItem);
                localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
            }
        },

        removeFromWishlist: (state, action) => {
            const updatedWishlists = state.wishlistItems?.filter((item) => item?._id !== action.payload?._id)

            state.wishlistItems = updatedWishlists;

            localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));

        },

        clearWishlistItems: (state, action) => {
            state.wishlistItems = [];
            localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
        },
    }
})

export const { addToWishlist, removeFromWishlist, clearWishlists } = wishSlice.actions
export default wishSlice.reducer