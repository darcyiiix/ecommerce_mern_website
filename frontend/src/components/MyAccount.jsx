import { useSelector } from "react-redux";

const MyAccount = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return ( 
        <>
        
            <div className="flex items-center gap-4 mb-8">
                <img className="size-24 rounded-full" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D" />
                <h2 className="text-3xl">Hello, {userInfo.name}</h2>
            </div>

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