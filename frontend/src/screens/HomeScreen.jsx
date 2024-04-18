import Products from "../components/Product";
import Category from "../components/Category";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from "react-router-dom";
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Carousel from "../components/Carousel";
const HomeScreen = () => {

    const { keyword } = useParams();
    const { data: products, isLoading, error } = useGetProductsQuery({ keyword });
    // const { wishlistItems } = useSelector((state) => state.wishlistItems);

    let slides = [
        "/images/c1.jpeg",
        "/images/c2.jpeg",
        "/images/c3.jpeg",

      ];

    console.log(products)
    return (
        <>

            {/* <img src='images/products/product3/prod3.jpeg' alt="temp image" /> */}
        
            { isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) 
            
            : (
                
            <>

            <Carousel slides={slides} />

            <Category />

            <div className="product_reccomendation px-24 py-14 max-sm:pb-10 max-md:p-2 max-[1100px]:px-8 max-[460px]:hidden">

                <h2 className="text-center text-2xl max-sm:text-lg uppercase mb-14 max-sm:mb-10">Recommendations</h2>

                <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2">
    
                    {
                        products.products.slice(0,4).map((product) =>
                        {
                            return (
                                <div key={product._id}> <Products product={product}/> </div>
                            )
                        })
                    }
                </div>   

                <div className="text-center mt-10">
                    <Link to="/categories/lampshades" className="border-b border-gray-500 py-1 inline-block">View all products</Link>
                </div>  

            </div>

            <div className="section_about pb-24 px-24 max-sm:p-0 max-[1000px]:px-2">

            <h2 className="text-center uppercase mb-14 max-sm:mb-10 text-2xl max-md:text-lg">Follow us on instagram</h2>

                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 text-center">
                        
                    <div className="max-md:mb-6">
                        <img className="w-full" src="images/about/pooky01.jpeg" />
                        <h2 className="my-3 font-bold w-full">What is Lorem Ipsum?</h2>
                        <p className="mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <a href="#" className="underline text-primary text-sm">read our story</a>
                    </div>

                    <div className="max-md:mb-6">
                        <img className="w-full" src="/images/about/pooky02.jpeg" />   
                        <h2 className="my-3 font-bold w-full">Why do we use it?</h2>
                        <p className="mb-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    </div>

                    <div className="max-md:mb-6">
                        <img className="w-full" src="images/about/pooky03.jpeg" />
                        <h2 className="my-3 font-bold w-full">Where does it come from?</h2>
                        <p className="mb-2">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                    </div>

                </div>

            </div>
                </>
            ) }
            
        </>
      );
}
 
export default HomeScreen;

