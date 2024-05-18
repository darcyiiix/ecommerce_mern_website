import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

const EditProduct = () => {

    const [productImages, setProductImages] = useState([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

    const [dimensions, setDimensions] = useState([]);
    const [diameter, setDiameter] = useState('');
    const [height, setHeight] = useState('');
    const [dimPrice, setDimPrice] = useState('');



    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductImages([...productImages, ...files]);

        const urls = files.map(file => URL.createObjectURL(file));
        setImagePreviewUrls([...imagePreviewUrls, ...urls]);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Product Images:', productImages);
        console.log(numDim)

        // Reset form fields
        setProductImages([]);
        setImagePreviewUrls([]);

    };

    const handleAddDimension = () => {
        if (diameter.trim() !== '' && height.trim() !== '' && dimPrice.trim() !== '') {
            const newDimension = {
                diameter: parseInt(diameter.trim()),
                height: parseInt(height.trim()),
                price: parseInt(dimPrice.trim())
            };
            
            setDimensions([...dimensions, newDimension]);

            
            // Reset input fields
            setDiameter('');
            setHeight('');
            setDimPrice('');

        }
    };

    useEffect(() => {
        console.log(dimensions)
    }, [dimensions]);

    const handleRemoveDimension = (index) => {
        const newDimensions = [...dimensions];
        newDimensions.splice(index, 1);
        setDimensions(newDimensions);
    };

    return (
        <div>
            
            <form className="max-w-sm mx-auto" autoComplete="off" onSubmit={handleSubmit}>

                <div className="mb-5">
                    <label htmlFor="name" className="focus:outline-none outline-none block mb-2 text-sm text-gray-900">Name</label>
                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="price" className="block mb-2 text-sm text-gray-900">Price</label>
                    <input type="text" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
                </div>

                <div className="mb-5">
                    <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="productImages">Product Images</label>
                    <input
                        type="file"
                        className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none '
                        id="productImages"
                        multiple
                        onChange={handleImageChange}
                    />
                    <div className=''>
                        
                    {imagePreviewUrls.map((url, index) => (
                            
                        <img
                            className='inline-block mt-4 mr-4 size-[80px]'
                            key={index}
                            src={url}
                            alt={`Product Image ${index}`}
                        />
                    ))}
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="brand" className="block mb-2 text-sm text-gray-900">Brand</label>
                    <input type="text" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="CinS" className="block mb-2 text-sm text-gray-900">Count In Stock</label>
                    <input type="text" id="CinS" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="cat" className="block mb-2 text-sm text-gray-900">Category</label>
                    <input type="text" id="cat" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
                </div>

                <div className="mb-5">
                    <label htmlFor="desc" className="block mb-2 text-sm text-gray-900">Description</label>
                    <input type="text" id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
                </div>

                <div className="mb-5">
                    <label className='block mb-2 text-sm text-gray-900' htmlFor="diameter">Diameter:</label>
                    <input
                        type="number"
                        id="diameter"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                        value={diameter}
                        onChange={(e) => setDiameter(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className='block mb-2 text-sm text-gray-900' htmlFor="height">Height:</label>
                    <input
                        type="number"
                        id="height"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className='block mb-2 text-sm text-gray-900' htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                        value={dimPrice}
                        onChange={(e) => setDimPrice(e.target.value)}
                    />
                </div>

                <button type="button" className='mt-4 bg-primary text-white px-2 py-1' onClick={handleAddDimension}>Add Dimension</button>

                <div className="mb-5">
                    {/* <label>Dimensions:</label> */}
                    <ul>
                        {dimensions.map((dimension, index) => (
                            <li key={index} className='mt-4'>
                                Diameter: {dimension.diameter}, Height: {dimension.height}, Price: {dimension.price}
                                <button type="button" className='ml-2 bg-black text-white px-2 py-1' onClick={() => handleRemoveDimension(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>  
    
                <button type="submit" className="text-white bg-black focus:outline-none rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-8">Update</button>
 
            </form>
        </div>
    );
};

export default EditProduct;
