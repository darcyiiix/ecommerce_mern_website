import { useSelector } from "react-redux";

const MyAccount = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return ( 
        <>

            <div className="text-sm">
                <h3 className="text-xl font-semibold mb-2">Account Details</h3>
                <span className="block"> <strong> Name: </strong> {userInfo.name}</span>
                <span className="block"> <strong> Email: </strong> {userInfo.email}</span>
                <span className="block"><strong> Address: </strong>  {"House no. 465, Safari Villas, Bahria Town Lahore"}</span>
            </div>

        
        </>
     );
}
 
export default MyAccount;