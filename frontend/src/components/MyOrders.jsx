import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Loader from "./Loader";
import Message from "./Message";
const MyOrders = () => {

    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    return ( 
        <>  
            
            { isLoading ? (<Loader />) : error ? (<Message variant='danger'> {error?.data?.message || error.error } </Message>) :(
            
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase border-b-2 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Order ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Paid
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Delivered
                        </th>

                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Details</span>
                        </th>

                    </tr>
                </thead>
                <tbody>
                { orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.orderItems[0].image[0]}</td>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? (order.paidAt?.substring(0, 10)) : (<FaTimes style={{color: 'red'}} />)}</td>
                            <td>{order.Delivered ? (order.deliveredAt?.substring(0, 10)) : (<FaTimes style={{color: 'red'}} />)}</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}><Button variant='light' className='btn-sm'>Details</Button></LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
            )}


        </>
     );
}
 
export default MyOrders;