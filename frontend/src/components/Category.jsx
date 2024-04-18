const Category = () => {

    return (
        <>

            <div className="container mx-auto pt-10 pb-24 max-sm:pb-10 px-24 max-lg:px-2 max-[980px]:pt-0 max-md:pt-2 max-[600px]:-mt-8 max-[420px]:-mt-16" >

                <h2 className="text-center text-2xl max-sm:text-lg uppercase mb-20 max-sm:mb-10">Explore our products</h2>
        
                <div className="-m-1 flex flex-wrap md:-m-2 max-sm:block text-2xl max-md:text-lg">
                    <div className="flex w-1/2 flex-wrap max-sm:w-full">
                    <div className="w-1/2 p-1 md:p-2">
                        <a href="#" className="relative">
                            <img
                            alt="gallery"
                            className="block h-full w-full object-cover object-center"
                            src="images/categories/cat_03.jpeg" />
                            <div className="absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                            <p className="absolute bottom-1 left-2 text-white">mirrors</p>
                        </a>
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                    <a href="#" className="relative">
                        <img
                        alt="gallery"
                        className="block h-full w-full object-cover object-center"
                        src="images/categories/cat_06.jpeg" />
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                        <p className="absolute bottom-1 left-2 text-white">pendant lights</p>

                    </a>
                    </div>
                    
                    <div className="w-full p-1 md:p-2">
                    <a href="#" className="relative">
                        <img
                        alt="gallery"
                        className="block h-full w-full object-cover object-center"
                        src="/images/categories/cat_01.jpeg" />
                        <div className="absolute bottom-0 left-0 right-0 top-0 w-full h-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                        <p className="absolute bottom-1 left-2 text-white">rechargeable table lamps</p>

                    </a>
                    </div>
                    </div>

                    <div className="flex w-1/2 flex-wrap max-sm:w-full max-sm:mt-8">
                    <div className="w-full p-1 md:p-2">
                    <a href="#" className="relative">
                        <img
                        alt="gallery"
                        className="block h-full w-full object-cover object-center"
                        src="images/categories/cat_04.jpeg" />
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                        <p className="absolute bottom-1 left-2 text-white">lamp shades</p>

                    </a>
                    </div>

                    <div className="w-1/2 p-1 md:p-2">
                    <a href="#" className="relative">
                        <img
                        alt="gallery"
                        className="block h-full w-full object-cover object-center"
                        src="images/categories/cat_02.jpeg" />
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                        <p className="absolute bottom-1 left-2 text-white">sockets and switches</p>

                    </a>
                    </div>

                    <div className="w-1/2 p-1 md:p-2">
                    <a href="#" className="relative">
                        <img
                        alt="gallery"
                        className="block h-full w-full object-cover object-center"
                        src="images/categories/cat_05.jpeg" />
                        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                        <p className="absolute bottom-1 left-2 text-white">outdoor lights</p>

                    </a>

                    </div>
                    </div>
                </div>
            </div>

        </>
      );
}
 
export default Category;