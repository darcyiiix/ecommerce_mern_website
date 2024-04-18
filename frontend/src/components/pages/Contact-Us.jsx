import Image from '../../public/images/p6.jpeg'
import { useEffect } from 'react';
const ContactUS = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    },
    [])

    return ( 
        
    <div className="grid grid-cols-2 gap-8 p-8 max-md:grid-cols-1 max-md:p-4 max-sm:p-2">

        <div>
            <div className="px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-2xl text-black">Contact Us</h2>
                <p className="mb-8 lg:mb-16 text-black sm:text-sm">
                    If you’ve got any questions or if there’s something you’re just dying to tell us, we’d love to hear from you. Fill in the form below to send a note to our team and we’ll get straight back to you or if you have an image you want
                    to share with us you can email us directly on hello@pooky.com
                </p>
                <form action="#" className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="example@gmail.com" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-black">Subject</label>
                        <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">Your message</label>
                        <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <button type="submit" className="py-3 px-8 text-sm font-medium text-center text-white bg-primary sm:w-fit focus:outline-none">Send</button>
                </form>
            </div>
        </div>

        <div className="text-sm">
            <img className="mb-8 mt-8" src={Image} /> 
            <div className="w-4/6">
                <p className="mb-4"> give us bell 012 3456 7890</p>
                <p className="mb-4"> send us email hello@pooky.com</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde error inventore magni facere odio sit recusandae officia ea placeat asperiores voluptates.</p>
            </div>
        </div>

    </div>
        
     );
}
 
export default ContactUS;