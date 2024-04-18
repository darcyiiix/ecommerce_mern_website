import Rating from "./Ratings";
import {FaRegHeart, FaHeart} from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { addToWishlist } from "../slices/wishSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

const Products = ({product}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const addToWishListHandler = (e) =>{
        dispatch(addToWishlist(product))   
        setWishlistedIcon(true)   
    }

const [wishlistedIcon, setWishlistedIcon] = useState(false);

    return ( 

        <div className="py-6 px-2 relative h-full w-full max-w-sm rounded-lg flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition">

            <a onClick={addToWishListHandler}> {wishlistedIcon? <FaHeart className={`text-red-400 cursor-pointer absolute top-8 right-4 z-10`} /> : <FaRegHeart className={`text-red-400 cursor-pointer absolute top-8 right-4 z-10`}/>} </a>

            <Link className="relative border border-solid" to={`/product/${product._id}`}>
                <img className="h-56 w-full transition duration-300 ease-in-out hover:scale-110" src={`${product.image[0]}`} alt="" />
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
            </Link>

            <div className="p-2 flex-grow text-black">            
                    <p className="mb-[1px] text-sm tracking-tight uppercase">{product.name}</p>
                    <p className="text-lg tracking-tight uppercase">USD {product.price.toFixed(2)}</p>
            </div>

        </div>

     );
}
 
export default Products;                                                                        

{/* <>

<div className="py-6 px-2 relative h-full w-full max-w-sm rounded-lg flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition">

<FaRegHeart className={`bg-white hover:shadow-2xl border-2 hover:border-none cursor-pointer text-primary rounded-2xl px-1.5 size-8 absolute top-8 right-4 z-10`}/>

    <Link className="relative border border-solid" to={`/product/${product._id}`}>
        <img className="h-56 w-full transition duration-300 ease-in-out hover:scale-110" src={`${product.image[0]}`} alt="" />
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
    </Link>

    <div className="p-2 flex-grow">            
            <p className="mb-2 text-md font-semibold tracking-tight text-black uppercase">{product.name}</p>
            <p className="mb-2 text-xl font-bold tracking-tight text-primary uppercase">${product.price}</p>
            {<Rating value = {product.rating} text={product.numReviews} />}
     
    </div>

    <div className="p-2">
        <a href="#" className="block w-full py-2 text-md bg-primary hover:bg-primary_dark transition text-center focus:outline-none">
        <span className="text-white">   
                Add to cart
        </span>

        </a>
    </div>
</div>
</> */}