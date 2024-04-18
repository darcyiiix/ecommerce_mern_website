import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';


const ProductEditScreen = () => {
  
    // const [updateProduct, { isLoading: loadingUpdate }] =
    //   useUpdateProductMutation();
  
    // const [uploadProductImage, { isLoading: loadingUpload }] =
    //   useUploadProductImageMutation();
  
  

    // const handleImageChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     setProductImages([...productImages, ...files]);

    //     const urls = files.map(file => URL.createObjectURL(file));
    //     setImagePreviewUrls([...imagePreviewUrls, ...urls]);
    // };

    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
  
    const {
      data: product,
      isLoading,
      refetch,
      error,
    } = useGetProductDetailsQuery(productId);
    
    const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        };

        const result = await updateProduct(updatedProduct);

        if(result.error){
            toast.error(result.error)
        } else{
            toast.success('Product updated');
            navigate('/admin/productlist')
        }
    }

    useEffect(() => {
        if (product) {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCategory(product.category);
          setCountInStock(product.countInStock);
          setDescription(product.description);
        }
      }, [product]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success(res.message);
          setImage(res.image);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
    return (
        <div>
            {loadingUpdate && <Loader />}

            { isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error.data.message}</Message>) : 
            
            (
                <form className="max-w-sm mx-auto" autoComplete="off" onSubmit={submitHandler}>

                <div className="mb-5">
                    <label htmlFor="name" className="focus:outline-none outline-none block mb-2 text-sm text-gray-900">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label htmlFor="price" className="block mb-2 text-sm text-gray-900">Price</label>
                    <input type="text" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="productImages">Product Images</label>
                    <input
                        type="file"
                        className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none '
                        id="productImages"
                        onChange={uploadFileHandler}
                    />
                    {loadingUpload && <Loader />}
                </div>

                <div className="mb-5">
                    <label htmlFor="brand" className="block mb-2 text-sm text-gray-900">Brand</label>
                    <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label htmlFor="CinS" className="block mb-2 text-sm text-gray-900">Count In Stock</label>
                    <input type="text" id="CinS" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label htmlFor="cat" className="block mb-2 text-sm text-gray-900">Category</label>
                    <input type="text" id="cat" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label htmlFor="desc" className="block mb-2 text-sm text-gray-900">Description</label>
                    <input type="text" id="desc" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                </div>

                <button type="submit" className="text-white bg-black focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
 
            </form>
            )}

        </div>
    );
};

export default ProductEditScreen;
