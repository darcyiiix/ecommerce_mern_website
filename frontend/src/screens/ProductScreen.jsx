import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Ratings';
import { useNavigate, useParams } from "react-router-dom";
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Alert from '../components/Alert';

const ProductDetail = () => {

    const { id: productId } = useParams();

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const [ createReview, { isLoading: loadingProductReview, error: reviewError }] = useCreateReviewMutation();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [amount, setAmount] = useState(1);
    const [price, setPrice] = useState(0);
    const [activeImg, setActiveImage] = useState('');
    const [border, setBorder] = useState(true);
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedDimension, setSelectedDimension] = useState('');



    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if (product) {
            setPrice(product.price);
            if (product.image && product.image.length > 0) {
                setActiveImage(product.image[0]);
            }
            if (product.dimension && product.dimension.length > 0) {
                const firstDimension = product.dimension[0];
                setSelectedDimension(firstDimension);
                setPrice(firstDimension.price);
            }
            if (product.colors && product.colors.length > 0) {
                setSelectedColor(product.colors[0]);
            }
        }
    }, [product]);
    

    const handleImageChange = (image) => {
        setActiveImage(image);
    };

    const handleNextImage = () => {
        if (product && product.image && product.image.length > 0) {
            const index = product.image.findIndex(img => img === activeImg);
            if (index !== -1 && index < product.image.length - 1) {
                setActiveImage(product.image[index + 1]);
                setBorder(true);
            }
        }
    };

    const handlePrevImage = () => {
        if (product && product.image && product.image.length > 0) {
            const index = product.image.findIndex(img => img === activeImg);
            if (index !== -1 && index > 0) {
                setActiveImage(product.image[index - 1]);
                setBorder(true);
            }
        }
    };

    const addToCartHandler = async (selectedDimension) => {

        console.log(selectedDimension)
        dispatch(addToCart({...product, price, qty, selectedDimension, selectedColor}));
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success('Review Submitted');
            setRating(0);
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (
        <>
            { isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error }</Message>) 
            
            : (

            <>

            <div>
                {console.log(product)}
                {showAlert && <Alert mode="success" message={`${product.name} added to cart`} />}
            </div>

            <div className='flex justify-between lg:flex-row gap-16 lg:items-start pt-24 pb-16 px-2 max-[864px]:px-4 w-[970px] max-lg:w-[760px] mx-auto max-[864px]:flex-col max-[864px]:w-auto'>

                <div className='flex flex-col gap-6 lg:w-2/4 relative'>
                        <div className='relative'>
                            <img src={activeImg} alt="" className='w-full aspect-square object-fill' />

                        <div className="absolute top-1/2 -translate-y-1/2 left-2 w-12 h-12 bg-gray-200 opacity-50 flex justify-center items-center rounded-full cursor-pointer prevent-select" onClick={handlePrevImage}>
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </div>

                        <div className="absolute top-1/2 -translate-y-1/2 right-2 w-12 h-12 bg-gray-200 opacity-50 flex justify-center items-center rounded-full cursor-pointer prevent-select" onClick={handleNextImage}>
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                        
                        </div>
                        <div className='relative flex flex-row justify-start h-24 w-100 overflow-x-auto'>
            
                            {product && product.image && product.image.map((image, index) => (
                                
                                <img key={index} src={image} alt={`Product ${index + 1}`} className={`transition object-fill w-24 cursor-pointer mr-1 ${border && activeImg === image ? 'brightness-50' : ''}`} onClick={() => handleImageChange(image)} />
                                
                            ))}

                        </div>

                    </div>


                {/* ABOUT */}
                <div className='flex flex-col gap-4 lg:w-2/4 '>
                    {product && (
                        <div>
                            <span className=' text-primary font-semibold'>{product.category}</span>
                            <h1 className='text-3xl'>{product.name}</h1>
                        </div>
                    )}
                    {product && (
                        <p className='text-gray-700 text-justify'>{product.description}</p>
                    )}
                    {product && (
                        <h6 className='text-2xl'>${price || product.price.toFixed(2)}</h6>
                    )}


<form>
{(product.dimension && product.dimension.length > 0 ) && 
        <select 
            onChange={(e) => {
                const selectedDim = JSON.parse(e.target.value);
                setPrice(selectedDim.price);
                setSelectedDimension(selectedDim);
            }} 
            id="dimension" 
            className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none cursor-pointer block w-9/12 py-3 px-1 shadow-lg mb-4"
            value={JSON.stringify(selectedDimension)}
        >
            {product.dimension?.map((dim, index) => (
                <option key={index} value={JSON.stringify(dim)}>
                    {`${dim.diameter}cm x ${dim.height} h price: $${dim.price}`}
                </option>
            ))}
        </select>
    }


            {(product.colors && product.colors.length > 0) && 
                    <select 
                        onChange={(e) => setSelectedColor(e.target.value)} 
                        id="color" 
                        className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none cursor-pointer block w-9/12 py-3 px-1 shadow-lg mb-2"
                        value={selectedColor}
                    >
                        {product.colors.map((color, index) => 
                            <option key={index} value={color}>{color}</option>
                        )}
                    </select>
                }
</form>

                    <span className={`${product.countInStock > 0 ? 'text-primary' : 'text-red-400'} -mt-4`}>{ product.countInStock > 0 ? 'In stock' : 'Out of stock' }</span>

                    {product.countInStock > 0 && 

                                    <form>
                                    
                                        <span className='mb-4 block'>Select Quantity</span>
                                        {<select onChange={(e) => setQty(Number(e.target.value))} value={qty} id="dimension"className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none cursor-pointer block w-6/12 py-3 px-1 shadow-lg mb-2">
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={ x + 1 } value={ x + 1 }>
                                                {x + 1}
                                        </option> 
                                        ))}
                                        </select>}



                                    </form>
                    }

                    <div className='flex flex-row max-[385px]:flex-col items-center gap-12'>
                    
                        <button className='bg-primary max-lg:px-8 hover:bg-primary_dark transition text-white py-3 px-16 h-full max-[385px]:w-full' disabled={product.countInStock === 0} onClick={() => addToCartHandler(selectedDimension)}>Add to Cart</button>
                    </div>
                </div>


            </div>

            {/* Reviews */}

                <div className='py-8 px-24 max-md:px-8'>
                    <h2 className='text-2xl mb-2'>Reviews</h2>
                    <span className='border-b border-gray-300 pb-2 block'>Reviews for this item {product.reviews.length}</span>

                     <p className={`text-center mt-4 font-semibold ${product.reviews.length > 0 ? 'hidden' : 'block'}`}> No Reviews yet</p>

                    <ul className='text-md'>

                        {product.reviews.map(review => (
                            <li className='mt-6 border-b pb-12' key={review._id}>

                                <span className='rating-value inline-block mb-4'> <Rating value={review.rating} /> </span>
                                <p className='text-lg mb-4'>{review.comment}</p>

                                <div className='flex items-center gap-x-3'>
                                    <img className='h-6 w-7 rounded-3xl' src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D            ' />
                                    <span className='underline'>{review.name}</span>
                                    <p className='text-xs self-end'>{review.createdAt.substring(0, 10)}</p>
                                </div>
                            </li>
                        ))}

                        <li className=''>

                            {/* <p className='mb-4'>Review a product</p> */}

                            {loadingProductReview && <Loader />}

                            {userInfo && (
                                <form onSubmit={submitHandler}>
                                    <div className='mb-4 flex flex-row max-md:flex-col justify-start'>
                                        <label className="mr-2 max-md:mb-2" htmlFor='rating'>Select Product Rating</label>
                                        <select id='rating' className='px-2 rounded-md focus:ring-0 focus:outline-none outline-none max-md:w-1/2 max-sm:w-3/4' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                            {/* <option value=''>Stars..</option> */}
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </select>

                                    </div>

                                    <div className='flex flex-row max-md:flex-col items-center max-md:items-start '>
                                        <label htmlFor='comment' className='mr-2 max-md:mb-4'>Add Written Review</label>
                                        <textarea id='comment' className='w-1/2 max-sm:w-3/4' rows='3' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                    </div>

                                    <button className='bg-primary hover:bg-primary_dark transition mt-6 w-3/12 max-sm:w-3/6 py-1 text-center text-white' type='submit' disabled={loadingProductReview}>Submit</button>
                                   
                                </form>
                            ) 
                                
                            }

                        </li>

                    </ul>

            </div>



                </>
            ) }
        </>
    );
};

export default ProductDetail;


{/* <>
            { isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error }</Message>) 
            
            : (

                <>

                {console.log(product)}
          <div className='flex mx-auto flex-col justify-around w-3/5 lg:flex-row gap-16 ml-2 lg:items-start'>
            <div className='flex flex-col gap-6 lg:w-2/4 relative'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-fill rounded-xl' />
                <div className='flex flex-row justify-start h-24 w-100 overflow-x-scroll'>
                    {product && product.image && product.image.map((image, index) => (
                        <img key={index + 1 } src={image} alt={`Product ${index + 1}`} className={`w-24 rounded-md cursor-pointer mr-1 ${border && activeImg === image ? 'border border-2 border-primary' : ''}`} onClick={() => handleImageChange(image)} />
                    ))}
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-2 w-12 h-12 bg-gray-200 opacity-50 flex justify-center items-center rounded-full cursor-pointer prevent-select" onClick={handlePrevImage}>
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-2 w-12 h-12 bg-gray-200 opacity-50 flex justify-center items-center rounded-full cursor-pointer prevent-select" onClick={handleNextImage}>
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </div>


            <div className='flex flex-col gap-4 lg:w-2/4'>
                {product && (
                    <div>
                        <span className=' text-primary font-semibold'>{product.category}</span>
                        <h1 className='text-3xl font-bold'>{product.name}</h1>
                    </div>
                )}
                {product && (
                    <p className='text-gray-700'>{product.description}</p>
                )}
                {product && (
                    <h6 className='text-2xl font-semibold'>${price || product.price}</h6>
                )}


                <form>
                {(product.dimension && product.dimension.length > 0 ) && <select onChange={(e) => setPrice(e.target.value)} id="dimension" className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none cursor-pointer block w-9/12 py-3 px-1 shadow-lg mb-2">
                    <option value="N/A">Select a dimension</option>
                    {product.dimension?.map((dim, index) => <option key={index} value={dim.price}>{`${dim.diameter}cm x ${dim.height} h price: $${dim.price}`}</option>)}
                </select>}
                </form>

                <strong>{ product.countInStock > 0 ? 'In Stock' : 'Out of stock' }</strong>

                {product.countInStock > 0 && 
                                <form>
                                
                                <strong>Select Quantity</strong>
                                {<select onChange={(e) => setQty(Number(e.target.value))} value={qty} id="dimension"className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none cursor-pointer block w-6/12 py-3 px-1 shadow-lg mb-2">
                                   {[...Array(product.countInStock).keys()].map((x) => (
                                   <option key={ x + 1 } value={ x + 1 }>
                                        {x + 1}
                                   </option> 
                                   ))}
                                </select>}
                                </form>
                }

                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className='bg-gray-200 py-2 px-5 rounded-lg text-primary text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                        <span className='py-4 px-6 rounded-lg'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-primary text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>

                   
                    <button className='bg-primary text-white font-semibold py-3 px-16 rounded-xl h-full' disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </div>
        </div>
                <div className='my-3'>
                    <Row>
                    <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}                            
            <ListGroup variant='flush'>
                {product.reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}

                    <ListGroup.Item>
                        <h2>Write a customer review</h2>

                        {loadingProductReview && <Loader />}

                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating' className='my-2'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as='select' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                    <option value=''>Select...</option>
                                    <option value='1'>1 - Poor</option>
                                    <option value='2'>2 - Fair</option>
                                    <option value='3'>3 - Good</option>
                                    <option value='4'>4 - Very Good</option>
                                    <option value='5'>5 -Excellent</option>
                                </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='comment' className='my-2'>
                                    <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button variant='primary' type='submit' disabled={loadingProductReview}>Submit</Button>
                            </Form>
                        ) : (
                            <Message>
                                Please <Link to='/login'>sign in</Link> to write a review{' '}
                            </Message>
                        )}   
                    </ListGroup.Item>                                        
            </ListGroup>
        </Col>
                    </Row>
                </div>
                </>
            ) }
        </> 
    */}