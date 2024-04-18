import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice'
import { useParams } from 'react-router-dom'

const ProductListScreen = () => {

    const { keyword }= useParams()
    const { data, isLoading, error, refetch } = useGetProductsQuery({keyword});
    console.log(data)
    
    const [ createProduct, {isLoading: loadingCreate} ] = useCreateProductMutation();

    const [deleteProduct, {isLoading: loadingDelete} ] = useDeleteProductMutation();

    const createProductHandler = async () => {
        if(window.confirm('Are you sure you want to add a product')){
            try {
                await createProduct();
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error); 
            }
        }
    }

    const deleteHandler = async (id) => {
        if(window.confirm('Are you sure?')){
            try {
                await deleteProduct(id);
                toast.success('Product deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        } 
    }
    console.log(data)
    return (

        <>
        <div className="flex flex-col">

            <button type="button" onClick={createProductHandler} class="focus:outline-none text-white bg-primary rounded-lg text-sm px-5 py-2.5 me-2 mb-4 text-center self-end"> <FaEdit className="inline-block"/> Create Product</button>
                
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}

            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (

                <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Brand
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                    {data.products.map((product) => (
                            <tr className="odd:bg-white even:bg-gray-50 border-b">
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{(product.price.toFixed(2))}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td className="px-6 py-4">
                                <a href={`/admin/product/${product._id}/edit`} className="font-medium text-blue-600 hover:underline"><FaEdit className="inline-block text-black size-4 mr-2" /></a>
                                <a href="#" onClick={() => {deleteHandler(product._id)}} className="font-medium text-blue-600 hover:underline"><FaTrash className="inline-block bg-red-500 text-white py-1 size-5 rounded" /> </a>
                            </td>
                        </tr>
                         ))}
                    </tbody>
                </table>
            </div>
                </>
            )}


        </div>

        </>
    );
}
 
export default ProductListScreen;
