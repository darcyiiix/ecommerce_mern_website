
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader';
import { useState, useEffect } from 'react';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const [register, { isLoading }] = useRegisterMutation();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
            <div className="py-6 px-4">
                <div className="w-5/12 mx-auto">

                    <form>
                        <h3 className="text-3xl mb-8">
                            Register
                        </h3>
                        <div className='mb-8'>
                            <input name="name" type="text" autoComplete="name" onChange={(e) => setName(e.target.value)} required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 focus:ring-0 focus:outline-none focus:border-black" placeholder="Your Name" />
                        </div>
                        <div className='mb-8'>
                            <input name="email" type="email" autoComplete="email" onChange={(e) => setEmail(e.target.value)} required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 focus:ring-0 focus:outline-none focus:border-black" placeholder="Email address" />
                        </div>
                        <div className='mb-8 '>
                            <input name="password" type="password" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 focus:ring-0 focus:outline-none focus:border-black  " placeholder="Password" />
                        </div>

                        <div>
                            <input name="confirmPassword" type="Password" autoComplete="new-password" onChange={(e) => setConfirmPassword(e.target.value)} required className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600 focus:ring-0 focus:outline-none focus:border-black" placeholder="Confirm Password" />
                        </div>
                        {/* <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <span className="text-blue-600 hover:text-blue-500">Terms of Service</span> & <span className="text-blue-600 hover:text-blue-500">Privacy Policy</span>
                            </div>
                        </div> */}
                        <div className="mt-10">
                            <button type="button" onClick={submitHandler} className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-primary hover:bg-primary_dark transition focus:outline-none">
                                Register
                            </button>

                            <p className="text-sm mt-1 text-center pt-5">Alread have an account <Link to={redirect ? `/login?=${redirect}` : '/login'}> <a class="text-primary font-semibold hover:underline ml-1">Login here</a> </Link> </p>
                            {isLoading && <Loader />}
                        </div>
                    </form>
                </div>
            </div>
    );
};

export default RegisterScreen;
