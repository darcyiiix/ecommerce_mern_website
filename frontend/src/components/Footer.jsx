import { Link } from "react-router-dom";

const Footer = () => {
    return (  
        <>

            <footer className="bg-secondary_grey border-t">
                <div className="container px-6 py-10 mx-auto w-11/12">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                        <div className="sm:col-span-2">
                            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl ">Subscribe our newsletter to get an update.</h1>

                            <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                                <input id="email" type="email" className="px-4 py-2 bg-white rounded-md focus:outline-none border-none" placeholder="Email Address" />
                                <button className="w-full text-sm font-medium tracking-wider text-primary_text transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none underline rounded-lg">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-800">About us</p>

                            <div className="text-primary_text flex flex-col items-start mt-5 space-y-2">
                                <Link to='/pages/contact-us'><a className="transition-colors duration-300 hover:cursor-pointer hover:text-primary_dark">contact us</a></Link>
                                <Link to='/pages/about-us'><a className="transition-colors duration-300 hover:cursor-pointer hover:text-primary_dark">about us</a></Link>
                                <Link to='/login'><a className="transition-colors duration-300 hover:cursor-pointer hover:text-primary_dark">sign in</a></Link>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-800">Let us help you</p>

                            <div className="flex flex-col items-start mt-5 space-y-2 text-primary_text">
                                <Link to='/pages/frequently-asked-que     .xxx  stions'><a className="transition-colors duration-300 hover:cursor-pointer hover:text-primary_dark">help & faqs</a></Link>
                                <p className="transition-colors duration-300 hover:cursor-pointer hover:text-primary_dark">terms and conditions</p>
                                <p className="transition-colors duration-300 hover:cursor-pointer hover:text-primary_dark">delivery and returns</p>
                            </div>
                        </div>
                    </div>
                    
                    <hr className="my-6 border-gray-200 md:my-8 h-2" />
                    
                    <div className="sm:flex sm:items-center sm:justify-end">
                        
                        <div className="flex gap-4 hover:cursor-pointer items-center">
                            <p className="text-md">follow us on</p>
                            <img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="30" height="30" alt="fb" />
                            <img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="30" height="30" alt="tw" />
                            <img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="inst" />

                        </div>
                    </div>
                    <p className="font-sans p-8 text-start md:text-center md:text-lg md:p-4">© 2023 Pookie Inc. All rights reserved.</p>
                </div>
            </footer>
        
        </>
    );
}
 
export default Footer;